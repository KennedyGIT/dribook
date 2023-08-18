// script.js
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('selectedDate');
  const timeSlotTableBody = document.querySelector('#timeSlotTable tbody');
  var personalDetails = document.getElementById("userDetailsForm");
  var carDetails = document.getElementById("carForm");
  var update = document.getElementById("updateUserdetails");


  

 

  update.addEventListener("click", function()
  {
    updateDriverDetails()
  });
  
  
  
  function updateDriverDetails()
  {
    event.preventDefault();
  
      if(validateRegisterInputs())
      {
          var personalDetailsData = new FormData(personalDetails);
          var jsonData = {};
      
          for(var formpersonalDetailsKeyPair of personalDetailsData.entries())
          {
              jsonData[formpersonalDetailsKeyPair[0]] = formpersonalDetailsKeyPair[1];
          }

          jsonData.resultOptions = document.getElementById("resultOptions").value
          jsonData.licenseNo = document.getElementById("licenseno").value

      fetch("/UpdateDriverBooking", {
          method: "PUT",
          body: JSON.stringify(jsonData),
          headers: {
          "Content-Type": "application/json"
          }
      })
      .then((response) => { 
        // Handle success 
        if(response.ok)
        {
          return response.json();
        }
        else
        {
          return response.json();
        }
      })
      .then((data) => 
      {
        alert(data.message); 
        userdetailsForm();
      }) 
      .catch((error) => 
      { 
        alert(error.message); 
      });
      }
  }
  
  function userdetailsForm()
  {
      document.getElementById("username").value = "";
      document.getElementById("licenseno").value = "";
      document.getElementById("resultOptions").value = "";
      document.getElementById("comment").value = "";
  }
  
  function validateRegisterInputs() {
  
      const driverName = document.getElementById("username");
      const licenseNo = document.getElementById("licenseno")
      const resultOption = document.getElementById("resultOptions");
      const comment = document.getElementById("comment");
      
      // get the values of the input fields
      const driverNameValue = driverName.value;
      const licenseNoValue = licenseNo.value;
      const resultOptionValue = resultOption.value;
      const commentValue = comment.value;
     
      
    
      // define a variable to store the validation result
      let isValid = true;
    
      // check if the input values are not empty and meet some criteria
      if (driverNameValue === '') {
        // set isValid to false if input1 is invalid
        isValid = false;
      }
    
      if (licenseNoValue === '') {
       
        isValid = false;
      }
    
      if (resultOptionValue === '') {
        
        isValid = false;
      }
      if (commentValue === '') {
        
        isValid = false;
      }
      
    
      // enable or disable the submit button based on the validation result
      if (isValid) {
        // remove the disabled attribute from the submit button
        return true
      } else {
        // add the disabled attribute to the submit button
        alert("Please check your inputs and try again");
        return false
      }
  }
});

