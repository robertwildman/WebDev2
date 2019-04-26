var express = require('express')
var router = express.Router();

// Add a binding to handle '/api/project
router.get('/', function(req, res){
    // render the '/api/project' view
    res.send('Projects');
  })

module.exports = router;