var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
const fs = require('fs');//sets us the fs for the parsing functions



app.use(express.static(__dirname));
app.use(bodyParser.json());


app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
console.log("server running on port 3000");// lets the user know on the console that the server is running.