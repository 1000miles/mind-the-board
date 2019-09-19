const express = require('express');
const router = express.Router();
const Task = require('../models/Task')
const User = require('../models/User')

router.get('/', (req, res, next) => {
    if (!req.user) res.redirect('/auth/login')
    Task.find({ assignee: req.user }).then(tasks => {
        console.log(tasks)

        res.render('dashboard', { user: req.user, tasks: tasks });

    }).catch(err => console.log(err))

});

module.exports = router;