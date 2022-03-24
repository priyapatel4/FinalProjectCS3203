var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
const fs = require('fs');//sets us the fs for the parsing functions



app.use(express.static(__dirname));
app.use(bodyParser.json());

//This function is the Get Function to be used to get the information when requested. (never got this working)
app.get('/getinfo', function(req, res) {});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});