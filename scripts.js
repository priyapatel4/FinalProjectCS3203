$(function() {
    // GET/READ
    $('#get-button').on('click', function () {//this sets up the function in response to clicking the button to get all tweets
        document.getElementById("input").style.display = "none";
        document.getElementById("saveButton").style.display = "none";
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
                            \<td><input type="text" class="name form-control" value="' + element.price +'"></td>\
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
        document.getElementById("input").style.display = "";
        document.getElementById("saveButton").style.display = "";




    });

    $('#saveButton').on('click', function () {

    });
});