
$(function() {
    // GET/READ
    $('#get-button').on('click', function () {//this sets up the function in response to clicking the button to get all tweets
        document.getElementById("input-box").style.display = "none";
        document.getElementById("displayTable").style.display = "";
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
});