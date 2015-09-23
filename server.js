var express = require("express");
var app     = express();
var path    = require("path");
var url     = require('url');
var fs      = require('fs');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://herban.sambulkley.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/pages'));
app.use(express.static(__dirname + '/scripts'));
app.use(allowCrossDomain);

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.get('/listen', function(req,res,next){
  res.sendFile(path.join(__dirname, '/info', 'info.json'));
  //next();
});

app.get('/talk',function(req,res){
  var uri = url.parse(req.url, true);
  var query = uri.query;
  if(query.key === process.env.KEY) {
    var obj = {};

    obj.temperature_one = query.t1  || 0;
    obj.temperature_two = query.t2  || 0;
    obj.moisture        = query.mst || 0;
    obj.water           = query.wtr || 0;
    obj.time            = query.tme || 0;

    fs.writeFile(path.join(__dirname, '/info', 'info.json'), JSON.stringify(obj), function(err) {
      if(err) {
        res.sendStatus(417);
        return console.log(err);
      }
      res.sendStatus(200);
      console.log("+HG: it is written.");
    });
  } else {
    res.sendStatus(403);
  } 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
