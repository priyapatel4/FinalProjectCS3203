$(function() {
     GET/READ
     $('#showButton').on('click', function() {//this sets up the function in response to clicking the button to get all tweets
         $.ajax({
             type:'GET',
     //        url: 'getinfo',// sets up the pathway to the server
      //       contentType: 'application/json',
    //         success: function(response) {//gets the response form the pathway if successful
    //npm
    //             //console.log(response);
    //             var tbodyEl = $('tbody');
    //
    //             tbodyEl.html('');
    //
    //             let _dat = JSON.parse(response)
    //             console.log(_dat)
    //
    //             //console.log(_dat[1])
    //             _dat.forEach(function(obj) {// would output the id, time created, name of the person tweeting and the tweet. also adds an update and delete button to delete or update the tweet
    //                 tbodyEl.append('\
    //                     <tr>\
    //                         <td class="id">' + obj.id + '</td>\
    //                         <td><class="name">' + obj.user.name + '</td>\
    //                         <td class="time">' + obj.created_at + '</td>\
    //                         <td><class="tweet">' + obj.text + '</td>\
    //                         <td>\
    //                             <button class="update-button">UPDATE</button>\
    //                             <button class="delete-button">DELETE</button>\
    //                         </td>\
    //                     </tr>\
    //                 ');
    //             });
              }
          });
        
    });















