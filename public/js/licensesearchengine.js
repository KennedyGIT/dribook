var searchUser  = document.getElementById("searchbtn");
var updateUser = document.getElementById("submitbtn");

searchUser.addEventListener("click", function(event)
{
    event.preventDefault();

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("license").value = "";
    document.getElementById("age").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("make").value = "";
    document.getElementById("model").value = "";
    document.getElementById("carYear").value = "";
    document.getElementById("platNumber").value = "";

    var licenseInput  = document.getElementById("licenseNo");

    var endpoint = "/GetUserByLicense/"+licenseInput.value

    if(licenseInput.value === "")
    {
        alert("Please enter a license Number");
    }
    else
    {
        fetch(endpoint)
        .then(response => {
            // check if the response is ok
            if (response.ok) {
                // parse the response as JSON
                return response.json();
            } else {
                // throw an error with the status text
                throw new Error("User does not exist");
            }
            })
        .then(user =>
            {
                console.log(user);
                document.getElementById("firstName").value = user.firstName;
                document.getElementById("lastName").value = user.lastName;
                document.getElementById("license").value = user.licenseNo;
                document.getElementById("age").value = user.age;
                document.getElementById("dob").value = formatDate(user.dob);
                document.getElementById("make").value = user.car_details.make;
                document.getElementById("model").value = user.car_details.model;
                document.getElementById("carYear").value = user.car_details.year;
                document.getElementById("platNumber").value = user.car_details.platNo;
                document.getElementById("make").focus();
                // Do something with the user object
                
            })
        .catch(error => 
        {
            // Handle the error
             alert(error)
        });
}


})

updateUser.addEventListener("click", function(event)
{
    event.preventDefault();

    if(validateInputs())
    {
       // Get the license number and the new data from the user input
    let license = document.getElementById('license').value;
    let newData = {   
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        license : document.getElementById("license").value,
        age : document.getElementById("age").value,
        dob : document.getElementById("dob").value
        // and so on
        };
        newData.car_details = 
        {
            make : document.getElementById("make").value,
            model : document.getElementById("model").value,
            year : document.getElementById("carYear").value,
            platNo : document.getElementById("platNumber").value
        };

// Call the endpoint with the license number and the new data
fetch('/UpdateUserByLicense', {
  method: 'PUT', // specify the HTTP method
  headers: {
    'Content-Type': 'application/json' // specify the content type
  },
  body: JSON.stringify(newData) // stringify the data object
})
  .then(response => {
    // Check if the response is ok
    if (response.ok) {
      // Display a success message
      alert('User updated successfully');
      clearForm();
    } else {
      // Throw an error
      throw new Error('User not found or no changes made');
    }
  })
  .catch(error => {
    // Handle the error
    alert(error)
  });

    }
})

function formatDate(dateString)
{   // Parse the string date as a Date object
    let date = new Date(dateString);

    // Get the year, month and day components
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth returns 0-11, so add 1
    let day = date.getDate();

    // Format the date as yyyy-mm-dd
    let formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    return formattedDate
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
    document.getElementById("licenseNo").value = "";
}