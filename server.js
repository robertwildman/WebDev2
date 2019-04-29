const express = require('express');
const session = require('express-session');
const app = express();
var path = require('path');
var milestoneRoute = require('./Routes/milestone');
var accountRoute = require('./Routes/accounts');
var projectRoute = require('./Routes/project');
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

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.set('trust proxy', 1);
app.use(express.static(__dirname + '/Public'));
app.use(session({secret: 'This is a secret',
resave: false,
saveUninitialized: true,
cookie: { secure: true }}));

// Import my test routes into the path '/test'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Site'));
app.get('/', (req, res) => {
  var user = 
  {
    name: "Robertwildman",
    AccountID: 2, 
    Projects: [{Name:"Name",Desc:"Desc",DateDue: "Data due",Datecomp:"Never",milestones:[{Name:"Name",Desc:"Desc",DateDue: "Data due",Datecomp:"Never"},{Name:"Name1",Desc:"Desc1",DateDue: "Data due",Datecomp:"Never"}]}]
  }
  var message,userid;
  if(req.query.user_id)
  {
    message = req.query.message;
    userid = req.query.user_id;
    //Create a user object with All Projects and All Milestones. 
    filluser(1,res,message);
  }
  filluser(1,res,message);
});
app.get('/create', (req, res) => {
  var message;
  if(req.query)
  {
   message = req.query.message;
  }
  res.render('Pages/create', {message: message});
});
app.use('/api/milestone', milestoneRoute);
app.use('/api/account', accountRoute);
app.use('/api/project', projectRoute);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

function filluser(userid,res,message)
{
  var user = {};
  var connection = new Connection(config); 
  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
    }
  var request = new Request("SELECT * FROM Accounts  WHERE AccountID="+userid+";",function(err) {  
    if (err) {  
      console.log(err);
    }
   });
  request.on('row', function(columns) {
          user.AccountID = columns[0].value;
          user.Username = columns[1].value;
          //Another reuest to get project data 
          var request1 = new Request("SELECT * FROM Projects  WHERE ProjectUserID="+userid+";",function(err) {  
            if (err) {  
              console.log(err);
            }
           });
          user.Projects = [];
          request1.on('row', function(columns) {
                  var project = {};
                  project.ProjectID = columns[0].value;
                  project.ProjectName = columns[1].value;
                  project.ProjectDesc = columns[2].value;
                  project.ProjectDue = columns[3].value;
                  project.ProjectComp = columns[4].value;
                  project.ProjectUserID = columns[5].value;
                  project.Milestone = [];
                  user.Projects.push(project);
          });
          request1.on('doneProc', function (rowCount, more, rows) {
            user.Projects.forEach(function(project) {
              project.Milestone.push(getmilestone(project.ProjectID));
            });
            
            
            console.log(user);  res.render('Pages/index', {message: message,user: user});
          
          
          })
          var connection1 = new Connection(config); 
          connection1.on('connect', function(err) {
            if (err) {
              console.log(err);
            }
            connection1.execSql(request1);
          });
          
  });
  connection.execSql(request);
  });
  
}

function getmilestone(id)
{
  var Milestone = [];
  var request2 = new Request("SELECT * FROM Milestone WHERE MilestoneProjectID="+id+";",function(err) {  console.log("Request senmtr");
                    if (err) {  
                      console.log(err);
                    }
                   });
                   request2.on('row', function(columns) {
                      var milestone = {};
                      milestone.MilestoneID = columns[0].value;
                      milestone.MilestoneName = columns[1].value;
                      milestone.MilestoneDesc = columns[2].value;
                      milestone.MilestoneDue = columns[3].value;
                      milestone.MilestoneComp = columns[4].value;
                      milestone.MilestoneProjectID = columns[5].value;
                      Milestone.push(milestone);
                   });
                   request2.on('doneProc', function (rowCount, more, rows) {return Milestone;})
                   var connection2 = new Connection(config); 
                   connection2.on('connect', function(err) {
                     if (err) {
                       console.log(err);
                     }
                     connection2.execSql(request2);
                     
                   });
}

