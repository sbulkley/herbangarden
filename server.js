var express = require("express");
var app     = express();
var path    = require("path");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/pages'));
app.use(express.static(__dirname + '/scripts'));

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.get('/info',function(req,res){
  res.sendFile(path.join(__dirname, '/info', 'info.json'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
