// script.js
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('selectedDate');
  const timeSlotTableBody = document.querySelector('#timeSlotTable tbody');
  var personalDetails = document.getElementById("personalDetailsForm");
  var carDetails = document.getElementById("carForm");
  var update = document.getElementById("updatebooking");
  var selectedId = "";

  function populateTable(data) {
    // Clear existing table rows
    timeSlotTableBody.innerHTML = '';

    // Populate the table with data
    data.forEach((timeSlot) => {
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      const timeCell = document.createElement('td');
      const availabilityCell = document.createElement('td');


      row.setAttribute('id', `${timeSlot._id}`);
      dateCell.innerHTML = `<div class="table-content"><h3 class="title">${timeSlot.testDate}</h3></div>`;
      timeCell.textContent = timeSlot.testTime;
      availabilityCell.innerHTML = `<span  class="badge badge-${timeSlot.isTimeSlotAvailable ? 'success' : 'danger'} py-1 px-2">${timeSlot.isTimeSlotAvailable ? 'Available' : 'Not Available'}</span>`;

      row.appendChild(dateCell);
      row.appendChild(timeCell);
      row.appendChild(availabilityCell);
      timeSlotTableBody.appendChild(row);

      // Add class to highlight available rows
      if (timeSlot.isTimeSlotAvailable) {
        row.classList.add('available-row');
      }
    });
  }

  function fetchTimeSlots(selectedDate) {
    fetch(`/time-slots?date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        populateTable(data);
      })
      .catch((error) => alert('Error fetching time slots:', error));
  }

  dateInput.addEventListener('input', () => {
    const selectedDate = dateInput.value;
    console.log('Selected Date:', selectedDate);
    fetchTimeSlots(selectedDate);
  });

  // Add click event listener to the table rows to get the value of testTime and highlight the row
  timeSlotTableBody.addEventListener('click', (event) => {
    const clickedRow = event.target.closest('tr');
    if (clickedRow && clickedRow.classList.contains('available-row')) {
      const timeCell = clickedRow.querySelector('td:nth-child(2)');
      const testTime = timeCell.textContent;
      selectedId = clickedRow.getAttribute('id');

      // Highlight the clicked row and remove highlight from other rows
      const allRows = document.querySelectorAll('tbody tr');
      allRows.forEach((row) => {
        if (row === clickedRow) {
          row.classList.add('selected-row');
        } else {
          row.classList.remove('selected-row');
        }
      });
    }
  });

  update.addEventListener("click", function()
  {
      updateBooking();
  });
  
  
  
  function updateBooking()
  {
    event.preventDefault();
  
      if(validateRegisterInputs())
      {
          var personalDetailsData = new FormData(personalDetails);
          var carDetailsData = new FormData(carDetails);
          var jsonData = {};
          jsonData['appointmentId'] = selectedId;
      
          for(var formpersonalDetailsKeyPair of personalDetailsData.entries())
          {
              jsonData[formpersonalDetailsKeyPair[0]] = formpersonalDetailsKeyPair[1];
          }
  
          jsonData.car_details = {};
  
          for(var formDetailKeyPair of carDetailsData.entries())
          {   
              jsonData.car_details[formDetailKeyPair[0]] = formDetailKeyPair[1];
          }
  
    
   
      fetch("/UpdateUserByLicense", {
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
        clearG2Form();
        window.location.href = "/";
      }) 
      .catch((error) => 
      { 
        alert(error.message); 
      });
      }
  }
  

  function clearG2Form()
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
  
  function validateRegisterInputs() {
  
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

      if(selectedId === '')
      {
        isValid = false;

        alert("Please select a time slot to continue");
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

