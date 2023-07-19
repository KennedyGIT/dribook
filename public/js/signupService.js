var userDetails = document.getElementById("userDetailsForm");

document.getElementById("signup").addEventListener("click", function(event)
{
    event.preventDefault();

    if(validateInputs())
    {
        var userDetailsData = new FormData(userDetails);
        var jsonData = {};
    
        for(var formuserDetailsKeyPair of userDetailsData.entries())
        {
            if(jsonData[formuserDetailsKeyPair[0]] === "rpassword"){continue;}
            jsonData[formuserDetailsKeyPair[0]] = formuserDetailsKeyPair[1];
        }
  
 
    fetch("/SignUp", {
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
        }
        else {
            // throw an error with the status text
            return response.json();
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
    document.getElementById("username").value = "";
    document.getElementById("emailAddress").value = "";
    document.getElementById("usertype").value = "";
    document.getElementById("usertype").value = "";
    document.getElementById("password").value = "";
    document.getElementById("rpassword").value = "";
}

function validateInputs() {

    const username = document.getElementById("username");
    const emailAddress = document.getElementById("emailAddress");
    const usertype = document.getElementById("usertype");
    const password = document.getElementById("password");
    const rpassword = document.getElementById("rpassword");
    
    console.log("The usertype : " + usertype.value);
    // get the values of the input fields
    const usernameValue = username.value;
    const emailAddressValue = emailAddress.value;
    const usertypeValue = usertype.value;
    const passwordValue = password.value;
    const rpasswordValue = rpassword.value;
    
    
  
    // define a variable to store the validation result
    let isValid = true;
  
    // check if the input values are not empty and meet some criteria
    if (usernameValue === '') {
      // set isValid to false if input1 is invalid
      isValid = false;
    }
  
    if (emailAddressValue === '') {
     
      isValid = false;
    }
  
    if (usertypeValue === '') {
      
      isValid = false;
    }
    if (passwordValue === '') {
      
      isValid = false;
    }
    if (rpasswordValue === '') {
      
      isValid = false;
    }
    if (passwordValue !== rpasswordValue) {
     
      alert("Passwords do not match");
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
    