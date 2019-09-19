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

/* GET home page */
router.get("/employees", loginCheck(), (req, res, next) => {
  // passport
  const user = req.session.passport.user;

  User.findOne({_id: user})
    .then( user => {
      if (user.role === "HR-Admin") {
        res.render("employees", { user });
      } else {
        res.redirect("dashboard", {
          message: `Permission denied. Please ask HR.`
        });
      }
    })
    .catch(err => console.log(`employees Page could not be loaded.`, err));


});

router.get('/employees/new', loginCheck(), (req, res, next) => {
  const user = req.session.passport.user;
  console.log(user);

  User.findOne( { _id: user })
    .then((user) => {
      if (user.role === "HR-Admin") {
        res.render('employeeForm');
      } else {
        res.redirect("dashboard", { message: `Permission denied. Please ask HR.`});
      }
    })
    .catch(err => console.log(`employeeForm could not be loaded.`, err));
});

// Create a new employee through the HR-form
router.post('/employees/new', (req, res) => {
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

module.exports = router;
