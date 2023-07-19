var userDetails = document.getElementById("loginForm");

document.getElementById("login").addEventListener("click", function(event)
{
    event.preventDefault();

    if(validateInputs())
    {
        var userDetailsData = new FormData(userDetails);
        var jsonData = {};
    
        for(var formuserDetailsKeyPair of userDetailsData.entries())
        {
            jsonData[formuserDetailsKeyPair[0]] = formuserDetailsKeyPair[1];
        }
  
 
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              // check if the response is a redirect
              if (response.ok) {
                // get the redirect URL from the response
                const redirectUrl = "/";
                // navigate to the new page
                window.location.href = redirectUrl;
              } else {
                alert("Login not successul");
                window.location.href ="/login";
              }
            })
            .catch((error) => {
              // handle any errors
              console.error(error);
              // display an error message
              alert(error.message);
              clearForm();
            });
        }

});


function clearForm()
{
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  
}

function validateInputs() {

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    
    
    console.log("The usertype : " + usertype.value);
    // get the values of the input fields
    const usernameValue = username.value;
    const passwordValue = password.value;
    
    
  
    // define a variable to store the validation result
    let isValid = true;
  
    // check if the input values are not empty and meet some criteria
    if (usernameValue === '') {
      // set isValid to false if input1 is invalid
      isValid = false;
    }
  
    if (passwordValue === '') {
      
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
    