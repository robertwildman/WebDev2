var express = require('express')
var router = express.Router();
var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'wpd2@wpd2',  
        password: 'YJO4t3eaTwpC',  
        server: 'wpd2.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'WPD2'}  
    };  
    var connection = new Connection(config);  
    
// Add a binding to handle '/api/account
router.get('/', function(req, res){
    // render the '/api/account' view
    res.render('Pages/index', {message: 'Accounts'});
})
router.post('/create', function(req, res) {
  var Username = req.body.Username,
      Password = req.body.Password;
      var Request = require('tedious').Request  
      var TYPES = require('tedious').TYPES;  
      connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        request = new Request("INSERT Accounts (Username, Password) VALUES (@Username, @Password);", function(err) {  
          if (err) {  
             console.log(err);}  
         });  
         request.addParameter('Username', TYPES.NVarChar,Username);  
         request.addParameter('Password', TYPES.NVarChar,Password);    
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