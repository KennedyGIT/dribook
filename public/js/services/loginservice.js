document.addEventListener("DOMContentLoaded", function() 
{
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
              if(response.ok)
              {
                return response.json();
              }
              else
              {
                window.location.href = "/"
              }     
            })
            .then((data)=> 
            {
              if(data.success)
              {
                window.location.href = data.redirectUrl;
              }else
              {
                window.location.href = data.redirectUrl;
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
    const usertype = document.getElementById("loginusertype");
    
    
    console.log("The usertype : " + usertype.value);
    // get the values of the input fields
    const usernameValue = username.value;
    const passwordValue = password.value;
    const usertypeValue = usertype.value;
    
    
  
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

    if((usertypeValue === '') || usertypeValue === 'Select User Type')
    {
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
})


    