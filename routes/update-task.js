const express = require('express');
const router = express.Router();
const Task = require('../models/Task')
const User = require('../models/User')

router.get('/:taskId', (req, res, next) => {
    let taskId = req.params.taskId
    let user = req.user
    Task.findById(taskId)
        .then(foundTask => {
            let currTask = foundTask
            User.find()
                .then(allUsers => {
                    res.render('update-task', { currTask, users: allUsers, user });
                })
        })
        .catch(err => console.log("error while trying to get task", err))
});

router.post('/:taskId', (req, res, next) => {
    let taskId = req.params.taskId
    const { title, description, assignee, dueDate } = req.body
    Task.findByIdAndUpdate(taskId, {
        title, description, assignee, dueDate
    })
        .then(updatedTask => {
            console.log('----', updatedTask)
            res.redirect("/dashboard")
        }
        )
        .catch(err => console.log("error while updating task", err))
});

module.exports = router;