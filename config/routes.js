var express = require('express')
var router = express.Router()
var Task = require('../models/Task')

// Helper function responsible for fetching all Tasks
function getAllTasks(req, res){
  Task.find({}, function (err, tasks) {
    if (err) {
        console.error(`Error: ${error}`)
        res.send(`Error: ${error}`)
    } else {
        console.log(tasks)
        res.send(tasks)
        console.log ("db is trying to update data")
    }
  })
}

function addTask(req, res){
  Task.create(req.body, function (err, tasks) {
    if (err) {
        console.error(`Error: ${error}`)
        res.send(`Error: ${error}`)
    } else {
        console.log(tasks)
        res.send(tasks)
        console.log ("db is trying to save data")
    }
  })
}

function updateTask(req, res){
  console.log("req.params.id is", req.params._id, "req.body is", req.body)
  Task.update({ _id: req.params._id }, req.body, function (err,tasks) {
    if (err) {
        // console.error(`Error: ${error}`)
        // console.log(err)
        // res.send(`Error: ${error}`)
        res.send(err)
    } else {
        console.log(tasks)
        res.send(tasks)
        console.log ("db is trying to update data", tasks)
    }
  })
}
function deleteTask(req, res){
  console.log("req.body._id is", req.body._id)
  Task.remove({ _id: req.body._id }, function (err,tasks) {
    if (err) {
        console.error(`Error: ${error}`)
        res.send(`Error: ${error}`)
    } else {
        res.send(tasks)
        console.log ("db is trying to delete data", tasks)
    }
  })
}

router.route('/tasks')
  .post(function (req, res) {
  /** 
  * Respond with all tasks stored on database if 'GET' request to route 
  * '/tasks'; the only time we send an error back to the client
  */
    console.log ("server is trying to save data")
    addTask(req, res)
})
router.route('/tasks/update/:_id')
  .post(function (req, res) {
  /** 
  * Respond with all tasks stored on database if 'GET' request to route 
  * '/tasks'; the only time we send an error back to the client
  */
    console.log ("server is trying to update data")
    updateTask(req, res)
})
router.route('/tasks/delete')
  .post(function (req, res) {
  /** 
  * Respond with all tasks stored on database if 'GET' request to route 
  * '/tasks'; the only time we send an error back to the client
  */
    
    deleteTask(req, res)
    console.log ("server is trying to delete data")
})
router.route('/tasks')
  .get(function (req, res) {
  /** 
  * Respond with all tasks stored on database if 'GET' request to route 
  * '/tasks'; the only time we send an error back to the client
  */
    console.log ("server is trying to get data")
    getAllTasks(req, res)
  })
module.exports = router