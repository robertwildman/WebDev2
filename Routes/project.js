var express = require('express')
var router = express.Router();
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
var Connection = require('tedious').Connection;  
// Create connection to database
var config =
{
    authentication: {
        options: {
            userName: 'wpd2@wpd2', 
            password: 'YJO4t3eaTwpC' 
        },
        type: 'default'
    },
    server: 'wpd2.database.windows.net',
    options:
    {
        database: 'WPD2',
        encrypt: true
    }
}
// Add a binding to handle '/api/milestone
router.get('/', function(req, res){
    // render the '/api/milestone' view
    res.render('Pages/index', {message: 'Project'});
  })
  
  
  router.get('/PCreate', function(req, res) {
		console.log("Incomming Request");
		var PName = req.query.ProjectName,
			PDesc = req.query.ProjectDesc,
			PDateDue = req.query.ProjectDue,
			PDateComp = req.query.ProjectComp,
			PUserID = req.query.ProjectUserID;
			var connection = new Connection(config);
			connection.on('connect', function(err) {
				if (err) {  
          console.log(err); 
			}
			// If no error, then good to proceed.
			request = new Request("INSERT Project (ProjectName, ProjectDesc, ProjectDue, ProjectComp, ProjectUserID) VALUES (@ProjectDesc, @ProjectDue, @ProjectComp, @ProjectUserID);", function(err) { 
			  if (err) {  
             console.log(err);}
			});  
			
			request.addParameter('ProjectName', TYPES.NVarChar,PName); 
			request.addParameter('ProjectDesc', TYPES.NVarChar,PDesc);
			request.addParameter('ProjectDue', TYPES.NVarChar,PDateDue);
			request.addParameter('ProjectComp', TYPES.NVarChar,PDateComp);
			request.addParameter('ProjectUserID', TYPES.NVarChar,PUserID);
			request.on('row', function(columns) {  
             columns.forEach(function(column) {  
               if (column.value === null) {  
                 console.log('NULL');  
               } else {  
                 console.log("Product id of inserted item is " + column.value);  
               }  
             });  
         });       
         connection.execSql(request);
       res.send("Done");
        }); 
			
});

module.exports = router;

