var express = require('express')
var router = express.Router();

// Add a binding to handle '/api/milestone
router.get('/', function(req, res){
    // render the '/api/milestone' view
    res.render('Pages/index', {message: 'Milestone'});
  })

module.exports = router;