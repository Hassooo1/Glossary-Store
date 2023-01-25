// // Search function
// const searchForm = document.querySelector('#hero form');
// searchForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const searchTerm = document.querySelector('#hero form input[type="text"]').value;
//   // Send search term to the server and retrieve results
//   fetch('/search', {
//     method: 'POST',
//     body: JSON.stringify({searchTerm}),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Handle search results here
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     alert('Error searching');
//   });
// });

// // Dropdown menu for categories
// const categorySelect = document.querySelector('#featured-terms select');
// categorySelect.addEventListener('change', (e) => {
//   const selectedCategory = e.target.value;
//   // Send selected category to the server and retrieve terms
//   fetch('/terms-by-category', {
//     method: 'POST',
//     body: JSON.stringify({selectedCategory}),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Handle returned terms here
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//     alert('Error retrieving terms');
//   });
// });

 
// --------------------------------------------------
// Contact form validation

const contactForm = document.querySelector('#contact form');
const nameInput = document.querySelector('#contact form input[type="text"]');
const emailInput = document.querySelector('#contact form input[type="email"]');
const messageInput = document.querySelector('#contact form textarea');
const sendBtn = document.querySelector('#send-btn');
sendBtn.addEventListener('click', sendFormData);

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


function sendFormData() {
  // Check if input fields are filled
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    alert('Please fill all the fields');
    return;
  }

  // Check if email is valid
  if (!isValidEmail(emailInput.value)) {
    alert('Please enter a valid email');
    return;
  }

  // Prepare form data
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
  };

  // Send form data to the server
  fetch('/submit-form', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Form submitted successfully');
      const successMessage = document.querySelector('#success-message');
      successMessage.classList.add('visible');
      clearFormFields();

    } else {
      alert('Error submitting form');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error submitting form');
  });

}
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendFormData();
});

// Clear form fields
function clearFormFields() {
  nameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';
}