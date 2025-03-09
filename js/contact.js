document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission
        // Display the confirmation message
        document.getElementById('submissionMessage').style.display = 'block';
        // Optionally reset the form fields
        contactForm.reset();
    });
});

// contact.js

// Handle the contact form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get and trim form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
  
    // Simple validation: ensure all fields are filled
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Display confirmation message
    document.getElementById('submissionMessage').style.display = 'block';
  
    // Optionally, log the form data to the console (for demonstration)
    console.log("Contact Form Submitted:", { name, email, subject, message });
  
    // (Do not send any real communication; this is a demo.)
    
    // Optionally clear the form:
    // document.getElementById('contactForm').reset();
  });
  