'use strict';

// $("#addToCart").click(function(){
//     let prodToAdd = $('#singleProd').val();
//     console.log("prodToAdd? in mainjs", prodToAdd);
//     let prodObj = {
//        prodToAdd,
//        order_id //where to get this value?
//     };
//     console.log("prodObj in main js", prodObj)
//       $.ajax({
//           type: "PUT",
//           url: `http://localhost:4000/order/${prodObj.order_id}`,
//           data: prodObj
//         })
//         .then( (data) => {
//         });
//   });

// $("#addToCart").click(function(){
//     $("#addToCart").addClass("hidden");
//     alert("Product Added to Cart.")
//   });

$('#viewEvent').on('show.bs.modal', function (event) {
    var link = $(event.relatedTarget)
    var recipient = link.data('id') 
    var modal = $(this)
    $(".event-"+recipient).removeClass("isHidden")
  })
  
  $('#viewEvent').on('hidden.bs.modal', function (e) {
    $(".modalEvent").addClass("isHidden")
  })

  $('#viewVol').on('show.bs.modal', function (volunteer) {
    var link = $(volunteer.relatedTarget)
    var recipient = link.data('id') 
    var modal = $(this)
    $(".event-"+recipient).removeClass("isHidden")
  })
  
  $('#viewVol').on('hidden.bs.modal', function (e) {
    $(".modalEvent").addClass("isHidden")
  })