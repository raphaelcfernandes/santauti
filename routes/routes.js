/**
 * Created by raphael on 1/9/17.
 */
var express = require('express');
module.exports = {
    configure: function(app){
        app.get('/',function (req,res) {
            res.sendFile('index.html');
        })
    }
}
