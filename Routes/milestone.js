var express = require('express')
var router = express.Router();

// Add a binding to handle '/api/milestone
router.get('/', function(req, res){
    // render the '/api/milestone' view
    res.render('Pages/index', {message: 'Milestone'});
  })

module.exports = router;

var Connection = require('tedious').Connection;
    var config = {
        userName: 'wpd2@wpd2',
        password: 'YJO4t3eaTwpC',
        server: 'wpd2.database.windows.net',
        // If you are on Microsoft Azure, you need this:
        options: {encrypt: true, database: 'WPD2'}
    };
    var connection = new Connection(config);
    connection.on('connect', function(err) {
    // If no error, then good to proceed.
        console.log("Connected");
    });

    // Adds Milestone
function addMilestone(name, description, dateDue, dateCompleted, projectId){
  this.name = name;
  this.description = description;
  this.dateDue = dateDue;
  this.dateCompleted = dateCompleted;
  this.projectId = projectId;

  request = new Request("INSERT INTO milestone (Name, Description, DataDue, DateCompleted) VALUES ("+ name + ", ", description + ", ", userId + ", ", dateDue + ",", dateCompleted + ",",  projectId + ")", function(err){
    if (err){
      console.log(err);
    }
  });}

    //Removes Milestone
function removeMilestone(milestoneId){

}