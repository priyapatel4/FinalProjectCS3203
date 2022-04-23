$(function() {
    // GET/READ
    $('#get-button').on('click', function () {//this sets up the function in response to clicking the button to get all tweets
        // $("#priceTable").remove(); // to clear the filtered table whenever you display the orginal table
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
            type:'GET',
            url: '/getinfo',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');



                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
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

    $('#input-box').on('submit', function (event) {
        event.preventDefault();

        var nameInput = $('#name');
        var descriptionInput = $('#description');
        var categoryInput = $('#category');
        var priceInput = $('#price');

        $.ajax({
            url: '/addNewItem',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name_input: nameInput.val(), price_input:priceInput.val(),
                description_input: descriptionInput.val(), category_input: categoryInput.val()}),
            success: function(response) {
                console.log(response);
                nameInput.val('');
                descriptionInput.val('');
                categoryInput.val('');
                priceInput.val('');
             // $('#get-button').click();

            }
        });

        alert("New item added!");


    });

    // UPDATE/PUT
    $('#namebody').on('click', '#update-button', function() {
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
            data: JSON.stringify({ name: newName, id: given_id,  description:newDescription, category: newCategory,
            price: newPrice}),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
        alert("item updated!");
    });





    $('#namebody').on('click', '#delete-button', function() {
        var rowEl = $(this).closest('tr');
        var given_id = rowEl.find('.id').text();

        $.ajax({
            url: '/deleteItems',
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({id: given_id}),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    $('#filter-button').on('click', function () {
        document.getElementById("displayTable").style.display = "none";
        document.getElementById("input-box").style.display = "none";
        document.getElementById("by-categories").style.display = "";
        document.getElementById("by-price").style.display = "";
        document.getElementById("by-alphabet").style.display = "";
    });

    $('#by-categories').on('click', function (event) {
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

    $('#appetizer').on('click', function (event) {
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
            type:'GET',
            url: '/getAppetizerFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');



                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    $('#entree').on('click', function (event) {
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
            type:'GET',
            url: '/getEntreeFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');



                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
                        </tr>\
                    ');
                });
            }
        });

    });

    $('#dessert').on('click', function (event) {
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
            type:'GET',
            url: '/getDessertFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');



                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    $('#drink').on('click', function (event) {
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
            type:'GET',
            url: '/getDrinkFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');



                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
                        </tr>\
                    ');
                });
            }
        });

    });

    $('#by-price').on('click', function (event) {
        $("#namebody").empty();
        document.getElementById("by-price").style.color = "white";
        document.getElementById("by-price").style.background = "#9d8a7f";
        document.getElementById("by-categories").style.color = "#9d8a7f";
        document.getElementById("by-categories").style.background = "white";
        document.getElementById("by-alphabet").style.color = "#9d8a7f";
        document.getElementById("by-alphabet").style.background = "white";
        document.getElementById("displayTable").style.display = "";
        document.getElementById("appetizer").style.display = "none";
        document.getElementById("entree").style.display = "none";
        document.getElementById("dessert").style.display = "none";
        document.getElementById("drink").style.display = "none";
        document.getElementById("lowtohigh").style.display = "";
        document.getElementById("hightolow").style.display = "";
        document.getElementById("atoz").style.display = "none";
        document.getElementById("ztoa").style.display = "none";

        $.ajax({
            type:'GET',
            url: '/getPriceFilter',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');



                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
                        </tr>\
                    ');
                });
            }
        });


    });

    $('#lowtohigh').on('click', function (event) {
        document.getElementById("lowtohigh").style.color = "white";
        document.getElementById("lowtohigh").style.background = "#9d8a7f";
        document.getElementById("hightolow").style.color = "#9d8a7f";
        document.getElementById("hightolow").style.background = "white";
        document.getElementById("displayTable").style.display = "";
    });

    $('#hightolow').on('click', function (event) {
        document.getElementById("hightolow").style.color = "white";
        document.getElementById("hightolow").style.background = "#9d8a7f";
        document.getElementById("lowtohigh").style.color = "#9d8a7f";
        document.getElementById("lowtohigh").style.background = "white";
        document.getElementById("displayTable").style.display = "";
    });


    $('#by-alphabet').on('click', function (event) {
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

    $('#atoz').on('click', function (event) {
        $("#namebody").empty();
        document.getElementById("atoz").style.color = "white";
        document.getElementById("atoz").style.background = "#9d8a7f";
        document.getElementById("ztoa").style.color = "#9d8a7f";
        document.getElementById("ztoa").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type:'GET',
            url: '/getAlphabeticalFilterAtoZ',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');



                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
                        </tr>\
                    ');
                });
            }
        });
    });

    $('#ztoa').on('click', function (event) {
        $("#namebody").empty();
        document.getElementById("ztoa").style.color = "white";
        document.getElementById("ztoa").style.background = "#9d8a7f";
        document.getElementById("atoz").style.color = "#9d8a7f";
        document.getElementById("atoz").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type:'GET',
            url: '/getAlphabeticalFilterZtoA',// sets up the pathway to the server
            contentType: 'application/json',
            success: function(response) {//gets the response form the pathway if successful

                console.log(response);
                let tbodyEl = $('#namebody');

                tbodyEl.html('');


                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + element.id + '</td>\
                            <td><input type="text" class="name" value="' + element.name +'"></td>\
                            <td><input type="text" class="description" value="' + element.description +'"></td>\
                             <td><input type="text" class="category" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="price" value="' + element.price +'"></td>\
                        </tr>\
                    ');
                });
            }
        });


    });
});