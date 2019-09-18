const express = require('express');
const router = express.Router();
const Task = require('../models/Task')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/create-task', (req, res) => {
  console.log('ROUTE CREATE TASK')
  const { title, description, owner, assignee, createdat, duedate } = req.body
  Task.create({
    title,
    description,
    owner: req.user,
    assignee,
    created_at: createdat,
    dueDate: duedate,
    confirmedDone: false
  }).then(newTask => {
    console.log(newTask)
    res.redirect('/dashboard')
  }).catch(err => console.log(err))
})



module.exports = router;
