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

    
    
// Add a binding to handle '/api/account
router.get('/', function(req, res){
    // render the '/api/account' view
    res.render('Pages/index', {message: 'Accounts'});
})
router.post('/create', function(req, res) {
  console.log("Incomming Request");
  var UserN = req.query.Username,
      PassW = req.query.Password;
      console.log("Username: " + UserN);
      var connection = new Connection(config); 
      
      connection.on('connect', function(err) {  
        if (err) {  
          console.log(err); 
        }
        // If no error, then good to proceed.  
        request = new Request("INSERT Accounts (Username, Password) VALUES (@Username, @Password);", function(err) {  
          if (err) {  
             console.log(err);}
         });  
		 
         request.addParameter('Username', TYPES.NVarChar,UserN);  
         request.addParameter('Password', TYPES.NVarChar,PassW);
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