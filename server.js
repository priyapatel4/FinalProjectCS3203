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
    var id = req.body.id;
    var newName = req.body.name;
    var newDescription = req.body.description;
    var newCategory = req.body.category;
    var newPrice = req.body.price;


  //  var found = false;

   console.log(newName);
   console.log(id);

    menuItems.forEach(function(element) {
        if (element.id == id) {
           element.name = newName;
            element.description = newDescription;
            element.category = newCategory;
            element.price = newPrice;
           // console.log(item.item_id);

        }
    });

    res.send('Succesfully updated product!');
});


app.delete('/deleteItems', function(req, res) {
    var id = req.body.id;
    console.log(id);

    menuItems.forEach(function(element, index){
        if ( element.id == id) {
            menuItems.splice(index, 1);
        }

    });
    res.send('Successfully deleted product');

});

app.get('/getPriceFilter', function(req, res) {
    var sortedItems = [];
    var numItems = 0;
    menuItems.forEach(function(element){
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })
    var indexOuter, indexInner;
    for (indexOuter = 0; indexOuter < numItems-1; indexOuter++)
    {
        for (indexInner = 0; indexInner < numItems-indexInner-1; indexInner++)
        {

            if (sortedItems[indexOuter].price > sortedItems[indexInner+1].price)
            {
                var temp = sortedItems[indexInner].price;
                sortedItems[indexInner].price = sortedItems[indexInner + 1].price;
                sortedItems[indexInner + 1].price = temp;

            }
        }

    }

    // sortedItems.forEach(function(element){
    //     element.price = 5;
    // })
    console.log(sortedItems);
    res.send({items: sortedItems});
});




app.get('/getAlphabeticalFilter', function(req, res) {
    var sortedItems = [];
    menuItems.forEach(function(element){
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
    })

    sortedItems.forEach(function(element){
        element.name = "yogurt";
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});

app.get('/getAppetizerFilter', function(req, res) {
    var sortedItems = [];
    menuItems.forEach(function(element){
        if (element.category == "appetizer")
        {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});
app.get('/getDrinkFilter', function(req, res) {
    var sortedItems = [];
    menuItems.forEach(function(element){
        if (element.category == "drink")
        {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});
app.get('/getEntreeFilter', function(req, res) {
    var sortedItems = [];
    menuItems.forEach(function(element){
        if (element.category == "entree")
        {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});
app.get('/getDessertFilter', function(req, res) {
    var sortedItems = [];
    menuItems.forEach(function(element){
        if (element.category == "dessert")
        {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
