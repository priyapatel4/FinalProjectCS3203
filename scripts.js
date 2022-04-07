$(function() {
    // GET/READ
     $('#get-button').on('click', function() {//this sets up the function in response to clicking the button to get all tweets
         $.ajax({
             type:'GET',
             url: '/getinfo',// sets up the pathway to the server
             contentType: 'application/json',
             success: function(response) {//gets the response form the pathway if successful

                 console.log(response);
                  var tbodyEl = $('tbody');

                 tbodyEl.html('');

               // let _dat = JSON.parse(response)
              //  console.log(_dat)
              //    response.items.forEach(function(element){
              //        tbodyEl.append('\
              //           <tr>\
              //           <td class="id">' + element.item_name + '</td>\
                 //<td><class="description">' + element.item_description + '</td>\
              //           <td><input type="text" class="name form-control" value="' + element.item_description +'"></td>\
                 //<td class="category">' + element.item_category + '</td>\
              //           <td><input type="text" class="name form-control" value="' + element.item_category +'"></td>\
                 // <td><class="price">' + element.item_price + '</td>\
              //           \<td><input type="text" class="name form-control" value="' + element.item_price +'"></td>\
              //           <td>\
              //           </td>\
              //           </tr>\
              //           ');
              //    });

                // console.log(_dat[1])
                response.items.forEach(function(element) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
                    tbodyEl.append('\
                        <tr>\
                            <td class="name">' + element.item_name + '</td>\
                            <td><input type="text" class="name form-control" value="' + element.item_description +'"></td>\
                             <td><input type="text" class="name form-control" value="' + element.item_category +'"></td>\
                            \<td><input type="text" class="name form-control" value="' + element.item_price +'"></td>\
                            <td>\
                                <button class="update-button">UPDATE</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
             }
         });

     });
    });

