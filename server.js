var express = require('express');//ensures Express server is used
var app = express();//ensures Express server is used
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var fs = require('fs');//sets us the fs for the parsing functions

app.use(express.static(__dirname));
app.use(bodyParser.json());

var menuItems = [];
var idNumber = 1;

// reads in data if there is any data to read in from the json file keeping track of all the items
fs.readFile('menu.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log("not reading file in or no file to read in");
    } else {
        let menuData = JSON.parse(data)
        menuData.forEach(function (element) {
            menuItems.push({
                id: element.id, name: element.name, description: element.description, category: element.category,
                price: element.price
            });
            idNumber++;
        });
        console.log(menuItems);
    }
});


//This function is used to display menu items currently being stored
app.get('/getMenuItems', function (req, res) {
    res.send({items: menuItems});
});


// adds a new item to the menu
app.post('/addNewItem', function (req, res) {
    // variable assignment to the data that the user entered in
    var newItemName = req.body.name_input;
    var newItemDescription = req.body.description_input;
    var newItemCategory = req.body.category_input;
    var newItemPrice = req.body.price_input;

    // add the item that the user entered in to the array
    menuItems.push({
        name: newItemName,
        description: newItemDescription,
        category: newItemCategory,
        price: newItemPrice,
        id: idNumber

    });
    idNumber++;

    // add the item that the user entered in to the json file
    fs.writeFile('./menu.json', JSON.stringify(menuItems, null, 2), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('File successfully written');
        }
    })
    res.send('created');

});

// update a menu item
app.put('/updateItems', function (req, res) {

    // variable assignment to the new data that the user entered in for an existing item
    var id = req.body.id;
    var newName = req.body.name;
    var newDescription = req.body.description;
    var newCategory = req.body.category;
    var newPrice = req.body.price;

    var found = false;

    // updates the item in the array
    menuItems.forEach(function (element) {
        if (!found && element.id == id) {
            element.name = newName;
            element.description = newDescription;
            element.category = newCategory;
            element.price = newPrice;
            found = true;

        }
    });

    // updates the item in the json file
    fs.writeFile('./menu.json', JSON.stringify(menuItems, null, 2), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('File successfully written');
        }
    })

    res.send('Succesfully updated product!');
});

// deletes a menu item
app.delete('/deleteItems', function (req, res) {

    // store a variable for the id of the item being deleted
    var id = req.body.id;

    // delete item from the array with that given id
    menuItems.forEach(function (element, index) {
        if (element.id == id) {
            menuItems.splice(index, 1);
        }

    });

    // update json file to reflect the item deleted from the menu
    fs.writeFile('./menu.json', JSON.stringify(menuItems, null, 2), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('File successfully written');
        }
    })

    res.send('Successfully deleted product');

});

// filters the menu so that the items are sorted from lowest to highest price
app.get('/getPriceFilterLowToHigh', function (req, res) {
    var sortedItems = [];
    var numItems = 0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
     * not be reflected in the original array, this way the original array will remain unchanged
     * by this task
     */
    menuItems.forEach(function (element) {
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })
    var outer, inner;
    for (outer = 0; outer < numItems - 1; outer++) {
        for (inner = 0; inner < numItems - outer - 1; inner++) {

            if (parseInt(sortedItems[inner].price) > parseInt(sortedItems[inner + 1].price)) {
                var temp = sortedItems[inner];
                sortedItems[inner] = sortedItems[inner + 1];
                sortedItems[inner + 1] = temp;
            }
        }

    }

    console.log(sortedItems);
    res.send({items: sortedItems});
});

// filters the menu so that the items are sorted from highest to lowest price
app.get('/getPriceFilterHighToLow', function (req, res) {
    var sortedItems = [];
    var numItems = 0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    // not be reflected in the original array, this way the orginial array will remain unchanged
    // by this task
     */
    menuItems.forEach(function (element) {
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })
    var outer, inner;
    for (outer = 0; outer < numItems - 1; outer++) {
        for (inner = 0; inner < numItems - outer - 1; inner++) {

            if (parseInt(sortedItems[inner].price) < parseInt(sortedItems[inner + 1].price)) {
                var temp = sortedItems[inner];
                sortedItems[inner] = sortedItems[inner + 1];
                sortedItems[inner + 1] = temp;
            }
        }

    }

    console.log(sortedItems);
    res.send({items: sortedItems});
});

// filters the menu so that the items are sorted in ascending alphabetical order according the item name
app.get('/getAlphabeticalFilterAtoZ', function (req, res) {
    var sortedItems = [];
    var numItems = 0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
    menuItems.forEach(function (element) {
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })

    var outer, inner;
    for (outer = 0; outer < numItems - 1; outer++) {
        for (inner = 0; inner < numItems - outer - 1; inner++) {

            if (sortedItems[inner].name > sortedItems[inner + 1].name) {
                var temp = sortedItems[inner];
                sortedItems[inner] = sortedItems[inner + 1];
                sortedItems[inner + 1] = temp;

            }
        }

    }

    console.log(sortedItems);
    res.send({items: sortedItems});
});

// filters the menu so that the items are sorted in descending alphabetical order according the item name
app.get('/getAlphabeticalFilterZtoA', function (req, res) {
    var sortedItems = [];
    var numItems = 0;

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
    menuItems.forEach(function (element) {
        let copiedItem = JSON.parse(JSON.stringify(element));
        sortedItems.push(copiedItem);
        numItems++;
    })

    var outer, inner;
    for (outer = 0; outer < numItems - 1; outer++) {
        for (inner = 0; inner < numItems - outer - 1; inner++) {

            if (sortedItems[inner].name < sortedItems[inner + 1].name) {
                var temp = sortedItems[inner];
                sortedItems[inner] = sortedItems[inner + 1];
                sortedItems[inner + 1] = temp;

            }
        }

    }

    console.log(sortedItems);
    res.send({items: sortedItems});
});

// filters the menu so that only the items that are categorized as appetizers are displayed
app.get('/getAppetizerFilter', function (req, res) {
    var sortedItems = [];
    menuItems.forEach(function (element) {
        if (element.category == "appetizer") {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});

// filters the menu so that only the items that are categorized as drinks are displayed
app.get('/getDrinkFilter', function (req, res) {
    var sortedItems = [];

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
    menuItems.forEach(function (element) {
        if (element.category == "drink") {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});

// filters the menu so that only the items that are categorized as entrees are displayed
app.get('/getEntreeFilter', function (req, res) {
    var sortedItems = [];

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
    menuItems.forEach(function (element) {
        if (element.category == "entree") {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});

// filters the menu so that only the items that are categorized as desserts are displayed
app.get('/getDessertFilter', function (req, res) {
    var sortedItems = [];

    /* creates a deep copy of the array of objects so that changes from our sorted menu will
    * not be reflected in the original array, this way the original array will remain unchanged
    * by this task
    */
    menuItems.forEach(function (element) {
        if (element.category == "dessert") {
            let copiedItem = JSON.parse(JSON.stringify(element));
            sortedItems.push(copiedItem);
        }
    })
    console.log(sortedItems);
    res.send({items: sortedItems});
});

app.listen(PORT, function () {
    console.log('Server listening on ' + PORT);
});
