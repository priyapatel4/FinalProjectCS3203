var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
const fs = require('fs');//sets us the fs for the parsing functions

app.use(express.static(__dirname));
app.use(bodyParser.json());

var menuItems = []

fs.readFile('menu.json', 'utf8', function readFileCallback(err,data ){
    if(err){
        console.log("not reading file in");
      //  throw err;
        // writing new file when we want to add but no json file to add to
        // fs.writeFile(file, JSON.stringify([obj]), error => console.error(error));
    }
    else{
        let menuData = JSON.parse(data)
        menuData.forEach(function(element) {
            menuItems.push({name:element.item_name,description:element.item_description,category:element.item_category,
                price:element.item_price });
        });
        console.log(menuItems);
    }
});




//This function is the Get Function to be used to get the information when requested. (never got this working)
app.get('/getinfo', function(req, res) {
 res.send({items: menuItems});
});

//Posts created tweets
app.post('/addNewItem', function(req, res) {
    const newItemName = req.body.name;
    const newItemDescription = req.body.description;
    const newItemCategory = req.body.category;
    const newItemPrice = req.body.price;

    var obj = { name: item_name, description: item_description, category: item_category , price: item_price}


    menuItems.push(obj);

    res.send('created');

});


app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
