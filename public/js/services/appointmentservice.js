document.addEventListener("DOMContentLoaded", function() 
{
    var bookAppointment = document.getElementById("submit-booking-date-btn");

bookAppointment.addEventListener("click", function()
{
    event.preventDefault();

    createAppointment();
});

window.onload = function()
{
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // Get the selected checkboxes
      const selectedCheckboxes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
  
      // Construct the URL with selected checkboxes as query parameters
      const apiUrl = `/filteredExamination?testTypes=${selectedCheckboxes.join(',')}`;
  
      // Make the GET request to the API
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          userListContainer.innerHTML = '';
          data.forEach(user => 
              {
                  var userInnerHTML = `<div class="card-item car-card card-item-list">
                            <div class="card-body">
                              <div class="card-rating">
                                <span class="badge text-white">Result</span>
                                <span class="review__text">${user.examStatus || 'Unknown or Pending'}</span> 
                              <div class="card-price d-flex align-items-center justify-content-between">
                                <p>
                                  <span class="price__num">${user.firstName} ${user.lastName}</span>
                                  <span class="price__text"><strong>Exam Type : </strong>${user.examType }</span>
                                  <span class="price__license"><strong>License Number : </strong>${user.licenseNo }</span>
                                </p>
                                <a href="/" class="btn-text" data-toggle="modal" data-target="#userdetailsform">See details<i class="la la-angle-right"></i></a>
                              </div>
                            </div>
                          </div><!-- end card-item -->`;
  
                          userListContainer.innerHTML += userInnerHTML;
              });
      
      })
      .catch(error => {
      alert('Error fetching filtered users:', error.message);
      });
  
    });
  });
}



function clearAppointmentForm()
{
    var bookingJson = {};

    document.getElementById("bookdate").value = "";
    document.getElementById("testTime").value = "";
   
}

function createAppointment()
{
  event.preventDefault();

    if(validateAppointmentInputs())
    {
       var bookingJson = {};

       bookingJson.testDate = document.getElementById("bookdate").value;
       bookingJson.testTime = document.getElementById("testTime").value;
       bookingJson.isTimeSlotAvailable = true;

  
 
    fetch("/SetBookingDate", {
        method: "POST",
        body: JSON.stringify(bookingJson),
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
      clearAppointmentForm();
    }) 
    .catch((error) => 
    { 
      alert(error.message); 
    });
    }
}

function validateAppointmentInputs() {

    const testDate = document.getElementById("bookdate");
    const testTime = document.getElementById("testTime");
   
    // get the values of the input fields
    const testDateValue = testDate.value;
    const testTimeValue = testTime.value;

    if(isValidDate(testDateValue) || isValidTime(testTimeValue))
    {
        return true;
    }
    else
    {
        return false
    }  
}

function isValidDate (input) {
    // Split the input by "/"
    var parts = input.split ("-");
    // Check if there are exactly 3 parts
    if (parts.length !== 3) {
        alert("Invalid date");
      return false;
    }
    // Parse the parts as integers
    var month = parseInt (parts[1], 10);
    var day = parseInt (parts[2], 10);
    var year = parseInt (parts[0], 10);
    // Check if the parts are valid numbers
    if (isNaN (month) || isNaN (day) || isNaN (year)) {
        alert("Invalid date");
      return false;
    }
    // Create a new Date object with the input values
    var date = new Date (year, month - 1, day);
    // Check if the date object matches the input values
    if (date.getFullYear () !== year || date.getMonth () + 1 !== month || date.getDate () !== day) {
        alert("Invalid date");
      return false;
    }
    // Get the current date
    var today = new Date ();
    // Check if the input date is not in the future
    if (date < today) {
        alert("Invalid date selected");
      return false;
    }
    // If all checks pass, return true
    return true;
}

function isValidTime (input) {
    // Parse the input as hours and minutes
    var parts = input.split (":");
    var hours = parseInt (parts[0], 10);
    var minutes = parseInt (parts[1], 10);
    // Check if the parts are valid numbers
    if (isNaN (hours) || isNaN (minutes)) {
        alert("Invalid time");
      return false;
    }
    // Create a new Date object with the input values
    var time = new Date ();
    time.setHours (hours, minutes, 0, 0);
    // Get the current time
    var now = new Date ();
    // Check if the input time is not in the future
    if (time < now) {
        alert("Invalid time Selected");
      return false;
    }
    // If all checks pass, return true
    return true;
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const userListContainer = document.getElementById('userListContainer');







});



  
  