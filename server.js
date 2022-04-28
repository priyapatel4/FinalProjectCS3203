var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var fs = require('fs');//sets us the fs for the parsing functions

app.use(express.static(__dirname));
app.use(bodyParser.json());

var menuItems = [];
var idNumber =1;

// reads in data if there is any data to read in from the json file keeping track of all the items
fs.readFile('menu.json', 'utf8', function readFileCallback(err,data ){
    if(err){
        console.log("not reading file in or no file to read in");
    }
    else{
        let menuData = JSON.parse(data)
        menuData.forEach(function(element) {
            menuItems.push({id:element.id,name:element.name,description:element.description,category:element.category,
                price:element.price });
            idNumber++;
        });
        console.log(menuItems);
    }
});




//This function is used to display menu items currently being stored
app.get('/getinfo', function(req, res) {
 res.send({items: menuItems});
});


//adds new item entered in by the user to both the array and json file
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


    fs.writeFile('./menu.json', JSON.stringify(menuItems, null, 2), err => {
        if(err){
            console.log(err);
        }else{
            console.log('File successfully written');
        }
    })
    res.send('created');

});


app.put('/updateItems', function(req, res) {
    var id = req.body.id;
    var newName = req.body.name;
    var newDescription = req.body.description;
    var newCategory = req.body.category;
    var newPrice = req.body.price;


    var found = false;

    menuItems.forEach(function(element) {
        if (!found && element.id == id) {
           element.name = newName;
            element.description = newDescription;
            element.category = newCategory;
            element.price = newPrice;
            found = true;

        }
    });
    fs.writeFile('./menu.json', JSON.stringify(menuItems, null, 2), err => {
        if(err){
            console.log(err);
        }else{
            console.log('File successfully written');
        }
    })

    res.send('Succesfully updated product!');
});


app.delete('/deleteItems', function(req, res) {
    var id = req.body.id;
   // console.log(id);

    menuItems.forEach(function(element, index){
        if ( element.id == id) {
            menuItems.splice(index, 1);
        }

    });
    res.send('Successfully deleted product');
    fs.writeFile('./menu.json', JSON.stringify(menuItems, null, 2), err => {
        if(err){
            console.log(err);
        }else{
            console.log('File successfully written');
        }
    })

});

app.get('/getPriceFilterLowToHigh', function(req, res) {
    var sortedItems = [];
    var numItems = 0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
     * not be reflected in the original array, this way the original array will remain unchanged
     * by this task
     */
    menuItems.forEach(function(element){
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })
    var i, j;
    for (i = 0; i < numItems-1; i++)
    {
        for (j = 0; j < numItems-i-1; j++)
        {

            if (parseInt(sortedItems[j].price) > parseInt(sortedItems[j+1].price))
            {
                var temp = sortedItems[j];
                sortedItems[j] = sortedItems[j + 1];
                sortedItems[j + 1] = temp;
            }
        }

    }

    console.log(sortedItems);
    res.send({items: sortedItems});
});

app.get('/getPriceFilterHighToLow', function(req, res) {
    var sortedItems = [];
    var numItems = 0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    // not be reflected in the original array, this way the orginial array will remain unchanged
    // by this task
     */
    menuItems.forEach(function(element){
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })
    var i, j;
    for (i = 0; i < numItems-1; i++)
    {
        for (j = 0; j < numItems-i-1; j++)
        {

            if (parseInt(sortedItems[j].price) < parseInt(sortedItems[j+1].price))
            {
                var temp = sortedItems[j];
                sortedItems[j] = sortedItems[j + 1];
                sortedItems[j + 1] = temp;
            }
        }

    }

    console.log(sortedItems);
    res.send({items: sortedItems});
});





app.get('/getAlphabeticalFilterAtoZ', function(req, res) {
    var sortedItems = [];
    var numItems =0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
    menuItems.forEach(function(element){
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })

    var i, j;
    for (i = 0; i < numItems-1; i++)
    {
        for (j = 0; j < numItems-i-1; j++)
        {

            if (sortedItems[j].name > sortedItems[j+1].name)
            {
                var temp = sortedItems[j];
                sortedItems[j] = sortedItems[j + 1];
                sortedItems[j + 1] = temp;

            }
        }

    }

    console.log(sortedItems);
    res.send({items: sortedItems});
});

app.get('/getAlphabeticalFilterZtoA', function(req, res) {
    var sortedItems = [];
    var numItems =0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
    menuItems.forEach(function(element){
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })

    var i, j;
    for (i = 0; i < numItems-1; i++)
    {
        for (j = 0; j < numItems-i-1; j++)
        {

            if (sortedItems[j].name < sortedItems[j+1].name)
            {
                var temp = sortedItems[j];
                sortedItems[j] = sortedItems[j + 1];
                sortedItems[j + 1] = temp;

            }
        }

    }


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

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
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

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
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

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
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
