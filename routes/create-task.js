const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/', (req, res, next) => {
    User.find().then(allUsers => {
        res.render('create-task', { users: allUsers });
    })
});

module.exports = router;