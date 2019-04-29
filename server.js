const express = require('express');
const session = require('express-session');
const app = express();
var path = require('path');
var milestoneRoute = require('./Routes/milestone');
var accountRoute = require('./Routes/accounts');
var projectRoute = require('./Routes/project');


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
  var message,userid;
  if(req.query)
  {
    message = req.query.message;
    userid = req.query.user_id;
  }
  res.render('Pages/index', {message: message,user_id: userid});
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

 //SELECT all the projects
   router.post('/Pload', function(req, res){
     console.log("Incomming Request");
     var ProjectID = req.query.ProjectUserID;
     var connection = new Connection(config);
     connection.on('connect', function(err){
       if (err) {
         console.log(err);}
     })

     connection.on('connect', function(err) {
       if (err) {
         console.log(err);
       }
     // if there is no connection error, then proceed
     request = new Request("SELECT * FROM Projects WHERE UserID='"+UserID+"';",
	 function(err){
       if (err) {
         console.log(err);}
     });
     connection.execSql(request);
     res.send("Done");
    });
  });



