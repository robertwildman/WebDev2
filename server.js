const express = require('express');
const app = express();
var path = require('path');
var milestoneRoute = require('./Routes/milestone');
var accountRoute = require('./Routes/accounts');
var projectRoute = require('./Routes/project');


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
// Import my test routes into the path '/test'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Site'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/milestone', milestoneRoute);
app.use('/api/account', accountRoute);
app.use('/api/project', projectRoute);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

