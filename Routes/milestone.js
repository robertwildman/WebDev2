var express = require('express')
var router = express.Router();

// Add a binding to handle '/api/milestone
router.get('/', function(req, res){
    // render the '/api/milestone' view
    res.send('Milestone');
  })

module.exports = router;