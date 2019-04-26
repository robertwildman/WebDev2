const express = require('express');
const app = express();

var milestoneRoute = require('./Routes/milestone');
var accountRoute = require('./Routes/accounts');
var projectRoute = require('./Routes/project');

// Import my test routes into the path '/test'


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/milestone', milestoneRoute);
app.use('/api/account', accountRoute);
app.use('/api/project', projectRoute);
app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});