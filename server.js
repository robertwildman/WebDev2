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
  var user = 
  {
    name: "Robertwildman",
    AccountID: 2, 
    Projects: [{Name:"Name",Desc:"Desc",DateDue: "Data due",Datecomp:"Never",milestones:[{Name:"Name",Desc:"Desc",DateDue: "Data due",Datecomp:"Never"},{Name:"Name1",Desc:"Desc1",DateDue: "Data due",Datecomp:"Never"}]}]
  }
  var message,userid;
  if(req.query)
  {
    message = req.query.message;
    userid = req.query.user_id;
    console.log(userid);
    //Create a user object with All Projects and All Milestones. 
  }
  res.render('Pages/index', {message: message,user: user});
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

