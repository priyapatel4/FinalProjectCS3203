var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
const fs = require('fs');//sets us the fs for the parsing functions

var menuItems = []

fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
    if(err){
      //  throw err;
        // writing new file when we want to add but no json file to add to
        // fs.writeFile(file, JSON.stringify([obj]), error => console.error(error));
    }
    else{
        let menuData = JSON.parse(data)
        menuData.forEach(function(element) {
            menuInfo.push({name:element.item_name,description:item_description,category:element.item_category,
                price:element.item_price });
        });
    }
});

app.use(express.static(__dirname));
app.use(bodyParser.json());

//This function is the Get Function to be used to get the information when requested. (never got this working)
app.get('/getinfo', function(req, res) {
    fs.readFile('menu.json', (err, data) => {
        if (err) {
           // throw err;
        }
        else
        {
            let menuData = JSON.parse(data);
            res.send(menuData)
        }

    });
});


app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
