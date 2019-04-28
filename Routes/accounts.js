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
            userName: 'wpd2@wpd2', // update me
            password: 'YJO4t3eaTwpC' // update me
        },
        type: 'default'
    },
    server: 'wpd2.database.windows.net', // update me
    options:
    {
        database: 'WPD2', //update me
        encrypt: true
    }
}
var connection = new Connection(config); 
connection.on('connect', function(err) {  
  if (err) {  
    console.log(err); 
  }
});   
    
// Add a binding to handle '/api/account
router.get('/', function(req, res){
    // render the '/api/account' view
    res.render('Pages/index', {message: 'Accounts'});
})
//Get account with a ID
router.get('/:id', function(req, res){
  // render the '/api/account' view
  var id = req.params.id;
  var request = new Request(
    "SELECT * FROM Accounts  WHERE AccountID="+id+";",
    function(err, rowCount, rows)
    {
        console.log(rowCount + ' row(s) returned');
    }
  );
  request.on('row', function(columns) {
          var account = {
              AccountID: columns[0].value,
              Username: columns[1].value,
              Password: columns[2].value
          };
          console.log(account);
  });
  connection.execSql(request);
  res.send(id);
});
//Create an account
router.post('/create', function(req, res) {
  console.log("Incomming Request");
  var bb = req.query.Username,
      cc = req.query.Password;
      console.log(req.query);
        // If no error, then good to proceed.  
        request = new Request("INSERT Accounts (Username, Password) VALUES (@Username, @Password);", function(err) {  
          if (err) {  
             console.log(err);}  
         });  
         request.addParameter('Username', TYPES.NVarChar,bb);  
         request.addParameter('Password', TYPES.NVarChar,cc);    
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
//Login to an account
router.post('/login', function(req, res){
  // render the '/api/account' view
  var username = req.query.username;
  var password = req.query.password;
  console.log(username);
  var request = new Request(
    "SELECT * FROM Accounts  WHERE Username='"+username+"';",
    function(err, rowCount, rows)
    {
        if(rowCount == 0)
        {
          res.render('Pages/index', {message: 'Login Failed'});
        }
    }
  );
  request.on('row', function(columns) {
           if(password == columns[2].value)
           {
              return res.render('Pages/index', {message: 'Login Successfull'});
           }else
           {
             return res.render('Pages/index', {message: 'Login Failed'});
           }
  });
  connection.execSql(request);
});

module.exports = router;