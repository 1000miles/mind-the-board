const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Employee = require('../models/Employee');

// create a middleware that checks if a user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    // if (req.user)
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
      console.log(`REQ USER`, req.user);
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/auth/login");
    }
  };
};

/* GET employees page */
router.get("/", loginCheck(), (req, res, next) => {
  // const user = req.session.passport.user;
  const user = req.user;

  // Redirect to dashboard if user is not HR-Admin
  if (user.role !== "HR-Admin") res.redirect("/dashboard");

  console.log(user);

  Employee.find().then(employee => {
    console.log(employee);
    res.render("employees/all", {
      employeesList: employee
    });
  });
});

// GET new employees page
router.get('/new', loginCheck(), (req, res, next) => {
  const user = req.user;

  // console.log(user);
  if (user.role !== "HR-Admin") res.redirect("/dashboard");
  res.render("employees/new", { user });
});

// Create a new employee through the HR-form
router.post('/new', (req, res) => {
  console.log('CREATE A NEW TEAM MEMBER');
  const {
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    department,
    startingDate,
    leavingDate,
    confirmed,
    contract_signed,
    address1,
    address2,
    zip,
    city,
    country,
    user
  } = req.body;

  Employee.create({
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    department,
    startingDate,
    leavingDate,
    confirmed: false,
    contract_signed: false,
    address: {
      address1,
      address2,
      zip,
      city,
      country
    },
    user: req.user
  }).then(newEmployee => {
    console.log(newEmployee);
    res.redirect('/employees');
  }).catch(err => console.log(err));
});

router.get('/:id/update', (req, res, next) => {
  let employeeId = req.params.id;

  // console.log(employeeId);

  Employee.findById(employeeId)
  .then(employee => {
    res.render("employees/edit", { employee });
  })
  .catch(err => console.log("error while trying to get employee", err));
});

router.post('/:id/update', (req, res, next) => {
  let employeeId = req.params.id;

  // console.log(employeeId);

    const {
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      department,
      startingDate,
      leavingDate,
      confirmed,
      contract_signed,
      address: {
        address1,
        address2,
        zip,
        city,
        country
      }
    } = req.body;

    Employee.findByIdAndUpdate(employeeId)
    .then(employee => {
      res.render("employees/update", {
        employee
      });
    })
    .catch(err => console.log("error while trying to get employee", err));
});

module.exports = router;
