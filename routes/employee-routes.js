const express = require('express');
const router = express.Router();
const User = require('../models/User');

// create a middleware that checks if a user is logged in

const loginCheck = () => {
  return (req, res, next) => {
    // if (req.user)
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
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
  const user = req.user;
  console.log("req.user: ", user);
  res.render("employees");
});

router.get('/employees/new', (req, res, next) => {
  console.log(req.user);

  User.find()
    .then(() => {
      res.render('employeeForm');
    })
    .catch(err => console.log(`employeeForm could not be loaded.`, err));
});

module.exports = router;