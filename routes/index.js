/**
 * Created by raphael on 1/9/17.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});
module.exports = router;