var personalDetails = document.getElementById("personalDetailsForm");
var carDetails = document.getElementById("carForm");
var submit  = document.getElementById("submit-btn");


submit.addEventListener("click", function(event)
{
    event.preventDefault();

    if(validateInputs())
    {
        var personalDetailsData = new FormData(personalDetails);
        var carDetailsData = new FormData(carDetails);
        var jsonData = {};
    
        for(var formpersonalDetailsKeyPair of personalDetailsData.entries())
        {
            jsonData[formpersonalDetailsKeyPair[0]] = formpersonalDetailsKeyPair[1];
        }

        jsonData.car_details = {};

        for(var formDetailKeyPair of carDetailsData.entries())
        {   
            jsonData.car_details[formDetailKeyPair[0]] = formDetailKeyPair[1];
        }

  
 
    fetch("/SubmitBooking", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
        "Content-Type": "application/json"
        }
    })
        .then(response => {
        // check if the response is ok
        if (response.ok) {
            // parse the response as JSON
            return response.json();
        } else {
            // throw an error with the status text
            throw new Error("License No. already exists");
        }
        })
        .then(data => {
        // handle the data from the server
        console.log(data);
        // display a success message
        alert(data.message);
        clearForm();
        })
        .catch(error => {
        // handle any errors
        console.error(error);
        // display an error message
        alert(error.message);
        clearForm();
        });
    }
})




function clearForm()
{
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("license").value = "";
    document.getElementById("age").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("make").value = "";
    document.getElementById("model").value = "";
    document.getElementById("carYear").value = "";
    document.getElementById("platNumber").value = "";
}

function validateInputs() {

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const license = document.getElementById("license");
    const age = document.getElementById("age");
    const dob = document.getElementById("dob");
    const make = document.getElementById("make");
    const model = document.getElementById("model");
    const carYear = document.getElementById("carYear");
    const platNumber = document.getElementById("platNumber");
    // get the values of the input fields
    const firstNameValue = firstName.value;
    const lastNameValue = lastName.value;
    const licenseValue = license.value;
    const ageValue = age.value;
    const dobValue = dob.value;
    const makeValue = make.value;
    const modelValue = model.value;
    const carYearValue = carYear.value;
    const platNumberValue = platNumber.value;
    
  
    // define a variable to store the validation result
    let isValid = true;
  
    // check if the input values are not empty and meet some criteria
    if (firstNameValue === '') {
      // set isValid to false if input1 is invalid
      isValid = false;
    }
  
    if (lastNameValue === '') {
     
      isValid = false;
    }
  
    if (licenseValue === '') {
      
      isValid = false;
    }
    if (ageValue === '' || isNaN(ageValue)) {
     
      isValid = false;
    }
    if (dobValue === '') {
      
      isValid = false;
    }
    if (makeValue === '') {
      
      isValid = false;
    }
    if (modelValue === '') {
     
      isValid = false;
    }
    if (carYearValue === '') {
      
      isValid = false;
    }
    if (platNumberValue === '') {
      
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
    