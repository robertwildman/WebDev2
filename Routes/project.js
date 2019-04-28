var express = require('express')
var router = express.Router();
/* var Connection = require('tedious').Connection;
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

  var Request = require('tedious').Request;
  var TYPES = require('tedious').TYPES;

  function addProject(name, description, dateDue, dateCompleted, userId){
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.dataDue = dateDue;
    this.DateCompleted = dateCompleted;


    request = new Request("INSERT INTO projects (Name, Description, DataDue, DateCompleted) VALUES ("+ name + ", " + description +", " + userId + ", "+dataDue + ","+dateCompleted +")", function(err){
      if (err){
        console.log(err);
      }
    });
  }

  function deleteProject(id){

  }

  function loadProjects(){
    request = new Request("SELECT Projects.ProjectID, Projects.Name, Projects.Description, Projects.UserID, Projects.DataDue, Projects.DateCompleted ORDER BY Projects.Name ASC; ", function(err){
      if (err){
        console.log(err);
      }
    });
    //insert code that will display the projects of the user
  }


*/

// Add a binding to handle '/api/project
router.get('/', function(req, res){
    // render the '/api/project' view
    res.render('Pages/index', {message: 'Projects'});
  })

module.exports = router;
