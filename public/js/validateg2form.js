"use strict";

$(document).ready( () => {
    // Code a statement that moves the focus to the first Name text box
    $("#firstName").focus();
     
}); // end ready

 // Get the forms and the button by their ids
 var form1 = document.getElementById("carForm");
 var form2 = document.getElementById("personalDetailsForm");
 var submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function() 
{
    // Check if both forms are valid
    if (form1.checkValidity() && form2.checkValidity()) {
      // Submit both forms
      // TO DO : Implement Post
    } else {
      // Display an error message
      event.preventDefault();
      alert("Please fill out both forms correctly");
    }
  });








