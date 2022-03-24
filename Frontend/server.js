var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var obj;
const fs = require('fs');//sets us the fs for the parsing functions






app.listen(3000);// sends the application to the web port 3000
console.log("server running on port 3000");// lets the user know on the console that the server is running.