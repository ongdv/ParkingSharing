var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var mysql = require("mysql");


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));


var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "package.json",
  database : "foreignHelp"
});

con.connect(function(err){
  if(err) throw err;
  console.log("Database Connect");
});

app.listen(3333, () => {
  console.log("Example app listening on port 3333!");
});


var mail = require('./router/main')(app, con);
var register = require('./router/register')(app, con);
var login = require('./router/login')(app, con);
var match = require('./router/match')(app, con);
var list = require('./router/list')(app, con);
