// get grocery items from databse, and sorts them in shlpping list or pantry
$.get("/api/getgroceries").then(function (data) {
  for (var i = 0; i < data.length; i++) {
    //put in shopping list
    if (!data[i].ownedItem) {
      $("#groceriesToGet").append(`${data[i].foodProduct} <button class="addToPantry" data-id=${data[i].id} 
      data-name=${data[i].foodProduct} data-quantity=${data[i].quantity} data-quantityUnit = ${data[i].quantityUnit}>
       Add To Pantry </button>
      <button class="deleteItem" data-id=${data[i].id}>delete </button> <br>`);
    }
    else {
      var today = moment().format();
      //put in expired list
      if (today >= data[i].expirationDate) {
        $("#groceriesExpired").append(`${data[i].foodProduct}<button class="deleteItem" data-id=${data[i].id}>delete </button> <br>`);
      }
      // put in expiring soon list 
      else if (today >= data[i].expirationNotification) {
        $("#groceriesExpiringSoon").append(`${data[i].foodProduct} <button class="deleteItem" data-id=${data[i].id}>delete </button><br>`);
      }
      // put in pantry list
      else {
        $("#groceriesOwned").append(`${data[i].foodProduct}<button class="deleteItem" data-id=${data[i].id}>delete </button> <br>`);
      }
    }
  }
});


// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function (data) {
  $(".member-name").text(data.email);
});

$(document).on('click', '.addToPantry', function () {
  $("#updateModal").modal();
  $("#itemId").val($(this).data("id"));
  $(".hide2").css("display", "none");
})

$("#updateButton").on("click", function (event) {
  // event.preventDefault();
  // console.log( $("#updateExpiration").val(), $("#updateNotification").val() );
  $.ajax("/api/updategroceries2", {
    type: "PUT",
    data: { id: $("#itemId").val(),
            updatedExpiration: $("#updateExpiration").val(),
            updatedNotification: $("#updateNotification").val()  
  }
  }).then(function(){

  })
})


// // this will update an item to be in the pantry and update DOM
// $(document).on('click', '.addToPantry', function () {
//   $.ajax("/api/updategroceries", {
//     type: "PUT",
//     data: { id: $(this).data("id") }
//   }).then(
//     function () {
//       $.get("/api/getgroceries").then(function (data) {
//         $("#groceriesToGet").empty();
//         $("#groceriesOwned").empty();
//         for (var i = 0; i < data.length; i++) {
//           //put in shopping list
//           if (!data[i].ownedItem) {
//             $("#groceriesToGet").append(`${data[i].foodProduct} <button class="addToPantry" data-id=${data[i].id}> Add To Pantry </button>
//             <button class="deleteItem" data-id=${data[i].id}>delete </button> <br>`);
//           }
//           else {
//             var today = moment().format();
//             //put in expired list
//             if (today >= data[i].expirationDate) {
//               $("#groceriesExpired").append(`${data[i].foodProduct} <button class="deleteItem" data-id=${data[i].id}>delete </button> <br>`);
//             }
//             // put in expiring soon list 
//             else if (today >= data[i].expirationNotification) {
//               $("#groceriesExpiringSoon").append(`${data[i].foodProduct} <button class="deleteItem" data-id=${data[i].id}>delete </button><br>`);
//             }
//             // put in pantry list
//             else {
//               $("#groceriesOwned").append(`${data[i].foodProduct}<button class="deleteItem" data-id=${data[i].id}>delete </button> <br>`);
//             }
//           }
//         }
//       });
//     });
// });


// deletes item from drocery list
$(document).on('click', '.deleteItem', function () {
  $.ajax("/api/delete_item", {
    type: "POST",
    data: { id: $(this).data("id") }
  }).then(
    function () {
      location.reload();
    })
});


// changes the modal based on if pantry or shopping list is selected
$("#owned").change(function (event) {
  console.log($(this).val())
  if ($(this).val() === "true") {
    $(".hide").css("display", "inline-block");
  } else {
    $(".hide").css("display", "none");
  }

});




