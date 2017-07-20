/*global module*/

var express = require('express');
var path = require('path');
var app = express();
app.disable('etag');

/*var profile = require('./profile');*/

var report = require('./report');

app.get('/api/sites', function(req, res){
    return res.send({'title':'Company Name'});
});
module.exports = app;

