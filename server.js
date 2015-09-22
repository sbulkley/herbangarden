var express = require("express");
var app     = express();

app.use(express.static(__dirname + '/pages'));

app.use(express.static(__dirname + '/scripts'));

app.get('/',function(req,res){
  res.sendFile('index.html');
});

app.listen(8000);

console.log("+1: cookin' on 8000");
