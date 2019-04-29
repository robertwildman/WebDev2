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
			connection = new Connection(config);
			connection.on('connect', function(err) {
				if (err) {
          console.log(err);
			}
			// If no error, then good to proceed.
			request = new Request("INSERT Milestone (MilestoneName, MilestoneDesc, MilestoneDue, MilestoneComp, MilestoneProjectID) VALUES (@MilestoneName, @MilestoneDesc, @MilestoneDue, @MilestoneComp, @MilestoneProjectID);", function(err) {
			  if (err) {
             console.log(err);}
			});

			request.addParameter('MilestoneName', TYPES.NVarChar,MName);
			request.addParameter('MilestoneDesc', TYPES.NVarChar,MDesc);
			request.addParameter('MilestoneDue', TYPES.NVarChar,MDateDue);
			request.addParameter('MilestoneComp', TYPES.NVarChar,MDateComp);
			request.addParameter('MilestoneProjectID', TYPES.NVarChar,MProjectID);
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

// edit a milestone
router.get('/MEdit', function(req, res) {
		console.log("Incomming Request");
		var MName = req.query.MilestoneName,
			MDesc = req.query.MilestoneDesc,
			MDateDue = req.query.MilestoneDue,
			MDateComp = req.query.MilestoneComp,
			MProjectID = req.query.MilestoneProjectID,
      MiD = req.query.MilestoneID,
			connection = new Connection(config);
			connection.on('connect', function(err) {
				if (err) {
          console.log(err);
			}
			// If no error, then good to proceed.
			request = new Request("UPDATE Milestone SET MilestoneName=@MilestoneName, MilestoneDesc=@MilestoneDesc, MilestoneDue=@MilestoneDue, MilestoneComp=@MilestoneComp, MilestoneProjectID=@MilestoneProjectID WHERE MilestoneID=@MilestoneID;", function(err) {
			  if (err) {
             console.log(err);}
			});

			request.addParameter('MilestoneName', TYPES.NVarChar,MName);
			request.addParameter('MilestoneDesc', TYPES.NVarChar,MDesc);
			request.addParameter('MilestoneDue', TYPES.NVarChar,MDateDue);
			request.addParameter('MilestoneComp', TYPES.NVarChar,MDateComp);
			request.addParameter('MilestoneProjectID', TYPES.NVarChar,MProjectID);
      request.addParameter('MilestoneID', TYPES.NVarChar,MiD);
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

router.post('/MDelete', function(req, res){
  console.log("Incomming Request");
  var MilestoneID = req.query.MilestoneID;
  var connection = new Connection(config);
  connection.on('connect', function(err){
    if (err) {
      console.log(err);}
  })
  // if there is no conenction error, then proceed
  request = new Request("DELETE FROM Milestone WHERE MilestoneID='@MilestoneID'", function(err){
    if (err) {
      console.log(err);}
  });
  request.addParameter('MilestoneID', TYPES.NVarChar,MilestoneID);
  request.on('row', function(columns){
    if (column.value==null){
      console.log('NULL');
    } else {
      console.log("The milestone has now been deleted");
    }
  });
  connection.execSql(request);
  res.send("Done");
 });

module.exports = router;
