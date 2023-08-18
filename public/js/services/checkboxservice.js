const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const userListContainer = document.getElementById('userListContainer');

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



userListContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-text')) {
      event.preventDefault();
  
      const userCard = event.target.closest('.card-item');
      const username = userCard.querySelector('.price__num').textContent;
      const license = userCard.querySelector('.price__license').textContent;

  
      // Populate the modal with user information
      const modalUsername = document.getElementById('username');
      const modallicenseNo = document.getElementById('licenseno');
      modalUsername.value = username;
      modallicenseNo.value = license.replace('License Number : ','');


    }
  });
  


