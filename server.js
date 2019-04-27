const express = require('express');
const app = express();
var path = require('path');
var milestoneRoute = require('./Routes/milestone');
var accountRoute = require('./Routes/accounts');
var projectRoute = require('./Routes/project');

var Connection = require('tedious').Connection;  
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

