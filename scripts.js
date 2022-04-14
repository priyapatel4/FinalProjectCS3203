
$(function() {
    // GET/READ
    $('#get-button').on('click', function () {//this sets up the function in response to clicking the button to get all tweets
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


                var number = 0;
                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    number = number +1;
                    tbodyEl.append('\
                        <tr>\
                            <td class="name">' + (number) + '</td>\
                            <td><input type="text" class="name form-control" value="' + element.name +'"></td>\
                            <td><input type="text" class="name form-control" value="' + element.description +'"></td>\
                             <td><input type="text" class="name form-control" value="' + element.category +'"></td>\
                            \<td><span>$</span><input type="text" class="name form-control" value="' + element.price +'"></td>\
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
     //   var category = $('#category');;
        var priceInput = $('#price');

        $.ajax({
            url: '/addNewItem',
            method: 'POST',

            //If error, possibly look at this later on to change to contentType
            contentType: 'application/json',
            data: JSON.stringify({ name_input: nameInput }),
            data: JSON.stringify({ description_input: descriptionInput }),
        //    data: JSON.stringify({ category_input: category.val() }),
            data: JSON.stringify({ price_input: priceInput.val() }),
            success: function(response) {
                console.log(response);
               // nameInput('');
              //  descriptionInput('');
              //  category('');
                priceInput.val('');
               // $('#get-button').click();

            }
        });

        alert("New item added!");


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
    });

    $('#by-price').on('click', function (event) {
        document.getElementById("by-price").style.color = "white";
        document.getElementById("by-price").style.background = "#9d8a7f";
        document.getElementById("by-categories").style.color = "#9d8a7f";
        document.getElementById("by-categories").style.background = "white";
        document.getElementById("by-alphabet").style.color = "#9d8a7f";
        document.getElementById("by-alphabet").style.background = "white";
    });

    $('#by-alphabet').on('click', function (event) {
        document.getElementById("by-alphabet").style.color = "white";
        document.getElementById("by-alphabet").style.background = "#9d8a7f";
        document.getElementById("by-price").style.color = "#9d8a7f";
        document.getElementById("by-price").style.background = "white";
        document.getElementById("by-categories").style.color = "#9d8a7f";
        document.getElementById("by-categories").style.background = "white";
    });

    
});