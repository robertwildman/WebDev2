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
    res.render('Pages/index', {message: 'Milestone'});
  })

router.get('/MCreate', function(req, res) {
		console.log("Incomming Request");
		var MName = req.query.MilestoneName,
			MDesc = req.query.MilestoneDesc,
			MDateDue = req.query.MilestoneDue,
			MDateComp = req.query.MilestoneComp,
			MProjectID = req.query.MilestoneProjectID, 
			
			var connection = new Connection(config);
			connection.on('connect', function(err) {
				if (err) {  
          console.log(err); 
			}
			// If no error, then good to proceed.
			request = new Request("INSERT Milestone (MilestoneName, MilestoneDesc, MilestoneDue, MilestoneComp, MilestoneProjectID) VALUES (@MilestoneName, @MilestoneDesc, @MilestoneDue, @MilestoneComp, @MilestoneProjectID);", function(err) { 
			  if (err) {  
             console.log(err);}
			});  
			
			request.addParameter('MilestoneName', TYPES.NVarChar,MilestoneName); 
			request.addParameter('MilestoneDesc', TYPES.NVarChar,MilestoneDesc);
			request.addParameter('MilestoneDue', TYPES.NVarChar,MilestoneDue);
			request.addParameter('MilestoneComp', TYPES.NVarChar,MilestoneComp);
			request.addParameter('MilestoneProjectID', TYPES.NVarChar,MilestoneProjectID);
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

