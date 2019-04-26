var express = require('express')
var router = express.Router();

// Add a binding to handle '/api/account
router.get('/', function(req, res){
    // render the '/api/account' view
    res.send('Accounts');
  })

module.exports = router;