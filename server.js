var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var fs = require('fs');//sets us the fs for the parsing functions

app.use(express.static(__dirname));
app.use(bodyParser.json());

var menuItems = []
var idNumber =1;

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
            menuItems.push({id:element.item_id,name:element.item_name,description:element.item_description,category:element.item_category,
                price:element.item_price });
            idNumber++;
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
    var newItemName = req.body.name_input;
    var newItemDescription = req.body.description_input;
    var newItemCategory = req.body.category_input;
    var newItemPrice = req.body.price_input;


        menuItems.push({
            name: newItemName,
            description: newItemDescription,
            category: newItemCategory,
            price: newItemPrice,
            id:idNumber

        });
        idNumber++;


    // fs.writeFile('./menu.json', JSON.stringify(menuItems, null, 2), err => {
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('File successfully written');
    //     }
    // })
    res.send('created');

});


app.put('/updateItems', function(req, res) {
    var id = req.params.id;
    var newName = req.body.name;

    var found = false;

    menuItems.forEach(function(item, index) {
        if (!found && item.item_id == id) {
            product.name = newName;
        }
    });

    res.send('Succesfully updated product!');
});


app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
