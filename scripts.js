$(function () {
    // GET all the menu items
    $('#get-button').on('click', function () {
        //this sets up the function in response to clicking the button show menu
        document.getElementById("input-box").style.display = "none";
        document.getElementById("displayTable").style.display = "";
        document.getElementById("by-categories").style.display = "none";
        document.getElementById("by-price").style.display = "none";
        document.getElementById("by-alphabet").style.display = "none";
        document.getElementById("appetizer").style.display = "none";
        document.getElementById("entree").style.display = "none";
        document.getElementById("dessert").style.display = "none";
        document.getElementById("drink").style.display = "none";
        document.getElementById("lowtohigh").style.display = "none";
        document.getElementById("hightolow").style.display = "none";
        document.getElementById("atoz").style.display = "none";
        document.getElementById("ztoa").style.display = "none";
        $.ajax({
            type: 'GET',
            url: '/getMenuItems',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) { //gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                            <td>\
                                <button class = "button" id ="update-button">UPDATE</button>\
                                <button class = "button" id ="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });

    });

    $('#addButton').on('click', function () {
        //this sets up the function in response to clicking the button add new item
        // the input boxes to enter a new item are displayed
        document.getElementById("displayTable").style.display = "none";
        document.getElementById("input-box").style.display = "";
        document.getElementById("by-categories").style.display = "none";
        document.getElementById("by-price").style.display = "none";
        document.getElementById("by-alphabet").style.display = "none";
        document.getElementById("appetizer").style.display = "none";
        document.getElementById("entree").style.display = "none";
        document.getElementById("dessert").style.display = "none";
        document.getElementById("drink").style.display = "none";
        document.getElementById("lowtohigh").style.display = "none";
        document.getElementById("hightolow").style.display = "none";
        document.getElementById("atoz").style.display = "none";
        document.getElementById("ztoa").style.display = "none";
    });

    //POST (add item)
    $('#input-box').on('submit', function (event) {
        event.preventDefault();

        //this sets up the function in response to clicking the button save (for adding a new item)

        var nameInput = $('#name');
        var descriptionInput = $('#description');
        var categoryInput = $('#category');
        var priceInput = $('#price');

        $.ajax({
            url: '/addNewItem',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name_input: nameInput.val(), price_input: priceInput.val(),
                description_input: descriptionInput.val(), category_input: categoryInput.val()
            }),
            success: function (response) {
                console.log(response);
                // to clear out all the input boxes at the end so another item can be entered
                nameInput.val('');
                descriptionInput.val('');
                categoryInput.val('');
                priceInput.val('');
            }
        });

        alert("New item added!");


    });

    // UPDATE/PUT menu item
    $('#namebody').on('click', '#update-button', function () {
        event.preventDefault();

        //this sets up the function in response to clicking the update button

        var rowEl = $(this).closest('tr');
        var given_id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        var newDescription = rowEl.find('.description').val();
        var newCategory = rowEl.find('.category').val();
        var newPrice = rowEl.find('.price').val();


        $.ajax({
            url: '/updateItems',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                name: newName, id: given_id, description: newDescription, category: newCategory,
                price: newPrice
            }),
            success: function (response) {
                console.log(response);
                $('#get-button').click();
            }
        });
        alert("item updated!");
    });


    //DELETE a menu item
    $('#namebody').on('click', '#delete-button', function () {
        event.preventDefault();

        //this sets up the function in response to clicking the delete button
        var rowEl = $(this).closest('tr');
        var given_id = rowEl.find('.id').text();

        $.ajax({
            url: '/deleteItems',
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({id: given_id}),
            success: function (response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });


    $('#filter-button').on('click', function () {
        // this sets up the function in response to clicking the filter menu button
        // buttons on how the user wants to filter the menu are displayed
        document.getElementById("displayTable").style.display = "none";
        document.getElementById("input-box").style.display = "none";
        document.getElementById("by-categories").style.display = "";
        document.getElementById("by-price").style.display = "";
        document.getElementById("by-alphabet").style.display = "";
    });

    $('#by-categories').on('click', function (event) {
        //this sets up the function in response to clicking the filter by categories button
        // displays buttons for the four categories that the user can filter
        document.getElementById("by-categories").style.color = "white";
        document.getElementById("by-categories").style.background = "#9d8a7f";
        document.getElementById("by-price").style.color = "#9d8a7f";
        document.getElementById("by-price").style.background = "white";
        document.getElementById("by-alphabet").style.color = "#9d8a7f";
        document.getElementById("by-alphabet").style.background = "white";
        document.getElementById("appetizer").style.display = "";
        document.getElementById("entree").style.display = "";
        document.getElementById("dessert").style.display = "";
        document.getElementById("drink").style.display = "";
        document.getElementById("lowtohigh").style.display = "none";
        document.getElementById("hightolow").style.display = "none";
        document.getElementById("atoz").style.display = "none";
        document.getElementById("ztoa").style.display = "none";
    });

    // GET the items that are categorized as appetizers
    $('#appetizer').on('click', function (event) {
        //this sets up the function in response to clicking the appetizer button
        $("#namebody").empty();
        document.getElementById("appetizer").style.color = "white";
        document.getElementById("appetizer").style.background = "#9d8a7f";
        document.getElementById("entree").style.color = "#9d8a7f";
        document.getElementById("entree").style.background = "white";
        document.getElementById("dessert").style.color = "#9d8a7f";
        document.getElementById("dessert").style.background = "white";
        document.getElementById("drink").style.color = "#9d8a7f";
        document.getElementById("drink").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type: 'GET',
            url: '/getAppetizerFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // GET the items that are categorized as entrees
    $('#entree').on('click', function (event) {
        //this sets up the function in response to clicking the entree button
        $("#namebody").empty();
        document.getElementById("entree").style.color = "white";
        document.getElementById("entree").style.background = "#9d8a7f";
        document.getElementById("appetizer").style.color = "#9d8a7f";
        document.getElementById("appetizer").style.background = "white";
        document.getElementById("dessert").style.color = "#9d8a7f";
        document.getElementById("dessert").style.background = "white";
        document.getElementById("drink").style.color = "#9d8a7f";
        document.getElementById("drink").style.background = "white";
        document.getElementById("displayTable").style.display = "";


        $.ajax({
            type: 'GET',
            url: '/getEntreeFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });

    });

    // GET the items that are categorized as desserts
    $('#dessert').on('click', function (event) {
        //this sets up the function in response to clicking the dessert button
        $("#namebody").empty();
        document.getElementById("dessert").style.color = "white";
        document.getElementById("dessert").style.background = "#9d8a7f";
        document.getElementById("entree").style.color = "#9d8a7f";
        document.getElementById("entree").style.background = "white";
        document.getElementById("appetizer").style.color = "#9d8a7f";
        document.getElementById("appetizer").style.background = "white";
        document.getElementById("drink").style.color = "#9d8a7f";
        document.getElementById("drink").style.background = "white";
        document.getElementById("displayTable").style.display = "";


        $.ajax({
            type: 'GET',
            url: '/getDessertFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // GET the items that are categorized as drinks
    $('#drink').on('click', function (event) {
        //this sets up the function in response to clicking the drink button
        $("#namebody").empty();
        document.getElementById("drink").style.color = "white";
        document.getElementById("drink").style.background = "#9d8a7f";
        document.getElementById("entree").style.color = "#9d8a7f";
        document.getElementById("entree").style.background = "white";
        document.getElementById("dessert").style.color = "#9d8a7f";
        document.getElementById("dessert").style.background = "white";
        document.getElementById("appetizer").style.color = "#9d8a7f";
        document.getElementById("appetizer").style.background = "white";
        document.getElementById("displayTable").style.display = "";


        $.ajax({
            type: 'GET',
            url: '/getDrinkFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });

    });

    $('#by-price').on('click', function (event) {
        // this sets up the function in response to clicking the filter by price button
        // displays the low to high and high to low buttons
        document.getElementById("by-price").style.color = "white";
        document.getElementById("by-price").style.background = "#9d8a7f";
        document.getElementById("by-categories").style.color = "#9d8a7f";
        document.getElementById("by-categories").style.background = "white";
        document.getElementById("by-alphabet").style.color = "#9d8a7f";
        document.getElementById("by-alphabet").style.background = "white";
        document.getElementById("appetizer").style.display = "none";
        document.getElementById("entree").style.display = "none";
        document.getElementById("dessert").style.display = "none";
        document.getElementById("drink").style.display = "none";
        document.getElementById("lowtohigh").style.display = "";
        document.getElementById("hightolow").style.display = "";
        document.getElementById("atoz").style.display = "none";
        document.getElementById("ztoa").style.display = "none";

    });

    // GET the menu items sorted from lowest to highest price
    $('#lowtohigh').on('click', function (event) {
        //this sets up the function in response to clicking the low to high button

        $("#namebody").empty();
        document.getElementById("lowtohigh").style.color = "white";
        document.getElementById("lowtohigh").style.background = "#9d8a7f";
        document.getElementById("hightolow").style.color = "#9d8a7f";
        document.getElementById("hightolow").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type: 'GET',
            url: '/getPriceFilterLowToHigh',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });

    });

    // GET the menu items sorted from highest to lowest price
    $('#hightolow').on('click', function (event) {
        //this sets up the function in response to clicking the high to low button

        $("#namebody").empty();
        document.getElementById("hightolow").style.color = "white";
        document.getElementById("hightolow").style.background = "#9d8a7f";
        document.getElementById("lowtohigh").style.color = "#9d8a7f";
        document.getElementById("lowtohigh").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type: 'GET',
            url: '/getPriceFilterHighToLow',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });

    });


    $('#by-alphabet').on('click', function (event) {
        //this sets up the function in response to clicking the filter by alphabetical order button
        // diplayes the A to Z and Z to A buttons
        document.getElementById("by-alphabet").style.color = "white";
        document.getElementById("by-alphabet").style.background = "#9d8a7f";
        document.getElementById("by-price").style.color = "#9d8a7f";
        document.getElementById("by-price").style.background = "white";
        document.getElementById("by-categories").style.color = "#9d8a7f";
        document.getElementById("by-categories").style.background = "white";
        document.getElementById("appetizer").style.display = "none";
        document.getElementById("entree").style.display = "none";
        document.getElementById("dessert").style.display = "none";
        document.getElementById("drink").style.display = "none";
        document.getElementById("lowtohigh").style.display = "none";
        document.getElementById("hightolow").style.display = "none";
        document.getElementById("atoz").style.display = "";
        document.getElementById("ztoa").style.display = "";

    });

    // GET the menu items in ascending alphabetical order
    $('#atoz').on('click', function (event) {
        //this sets up the function in response to clicking the A to Z button
        $("#namebody").empty();
        document.getElementById("atoz").style.color = "white";
        document.getElementById("atoz").style.background = "#9d8a7f";
        document.getElementById("ztoa").style.color = "#9d8a7f";
        document.getElementById("ztoa").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type: 'GET',
            url: '/getAlphabeticalFilterAtoZ',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) { //gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    // GET the menu items in descending alphabetical order
    $('#ztoa').on('click', function (event) {
        //this sets up the function in response to clicking the Z to A button

        $("#namebody").empty();
        document.getElementById("ztoa").style.color = "white";
        document.getElementById("ztoa").style.background = "#9d8a7f";
        document.getElementById("atoz").style.color = "#9d8a7f";
        document.getElementById("atoz").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type: 'GET',
            url: '/getAlphabeticalFilterZtoA',// sets up the pathway to the server
            contentType: 'application/json',
            success: function (response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function (element) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name + '"></td>\
                            <td><input type="text" class="description" value="' + element.description + '"></td>\
                             <td><input type="text" class="category" value="' + element.category + '"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price + '"></td>\
                        </tr>\
                    ');
                });
            }
        });


    });
});