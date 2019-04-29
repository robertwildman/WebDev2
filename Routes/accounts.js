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
router.get('/id/:id', function(req, res){
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
router.get('/create', function(req, res) {
  console.log("Incoming Request");
  var UserN = req.query.username,
      PassW = req.query.password;
      console.log("Username: " + UserN);
      var connection = new Connection(config); 
      connection.on('connect', function(err) {  
        if (err) {  
          console.log(err); 
        }
        // If no error, then good to proceed.  
        request = new Request("INSERT Accounts (Username, Password) VALUES (@Username, @Password);", function(err) {  
          if (err) {  
            res.redirect('/create?message=Error Creating Account');
          }else{
            res.redirect('/?message=Account Created');
          }
         });  
         request.addParameter('Username', TYPES.NVarChar,UserN);  
         request.addParameter('Password', TYPES.NVarChar,PassW);     
         connection.execSql(request);
        });   
});
//Login to an account
router.get('/login', function(req, res){
  // render the '/api/account' view
  var username = req.query.username;
  var password = req.query.password;
  console.log("Username" + username);
  var request = new Request(
    "SELECT * FROM Accounts  WHERE Username='"+username+"';",
    function(err, rowCount, rows)
    {
        if(rowCount == 0)
        {
          res.redirect('/?message=Login Failed');
        }
    }
  );
  request.on('row', function(columns) {
           if(password == columns[2].value)
           {
            res.redirect('/?message=Login Successfull&user_id=columns[0].value');
           }else
           {
            res.redirect('/?message=Login Successfull');
           }
  });
  connection.execSql(request);
}); 


module.exports = router;