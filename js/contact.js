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