const express = require('express');
const app = express();
var path = require('path');
var milestoneRoute = require('./Routes/milestone');
var accountRoute = require('./Routes/accounts');
var projectRoute = require('./Routes/project');


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use(express.static(__dirname + '/Public'));
// Import my test routes into the path '/test'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Site'));
app.get('/', (req, res) => {
  var message;
  if(req.session != null)
  {
   message = req.session.message;
  }
  res.render('Pages/index', {message: message});
});
app.get('/create', (req, res) => {
  var message = req.session.message;
  res.render('Pages/create', {message: message});
});
app.use('/api/milestone', milestoneRoute);
app.use('/api/account', accountRoute);
app.use('/api/project', projectRoute);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

