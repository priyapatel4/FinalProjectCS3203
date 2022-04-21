$(function() {
    // GET/READ
    $('#get-button').on('click', function () {//this sets up the function in response to clicking the button to get all tweets
        // $("#priceTable").remove(); // to clear the filtered table whenever you display the orginal table
        document.getElementById("input-box").style.display = "none";
        document.getElementById("displayTable").style.display = "";
        document.getElementById("by-categories").style.display = "none";
        document.getElementById("by-price").style.display = "none";
        document.getElementById("by-alphabet").style.display = "none";
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
    });

    $('#by-price').on('click', function (event) {
        document.getElementById("by-price").style.color = "white";
        document.getElementById("by-price").style.background = "#9d8a7f";
        document.getElementById("by-categories").style.color = "#9d8a7f";
        document.getElementById("by-categories").style.background = "white";
        document.getElementById("by-alphabet").style.color = "#9d8a7f";
        document.getElementById("by-alphabet").style.background = "white";
        document.getElementById("displayTable").style.display = "";



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

    $('#by-alphabet').on('click', function (event) {
        $("#namebody").empty();
        document.getElementById("by-alphabet").style.color = "white";
        document.getElementById("by-alphabet").style.background = "#9d8a7f";
        document.getElementById("by-price").style.color = "#9d8a7f";
        document.getElementById("by-price").style.background = "white";
        document.getElementById("by-categories").style.color = "#9d8a7f";
        document.getElementById("by-categories").style.background = "white";
        document.getElementById("displayTable").style.display = "";

        $.ajax({
            type:'GET',
            url: '/getAlphabeticalFilter',// sets up the pathway to the server
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