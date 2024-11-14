// Select the password and confirm password input fields and error message element
const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
const passwordError = document.getElementById('password-error');

// Add an event listener to the confirm password input field
confirmPasswordInput.addEventListener('input', function () {
    // Show the error message if passwords do not match, hide it otherwise
    if (confirmPasswordInput.value !== passwordInput.value) {
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
    }
});

// Add an event listener to the signup form submission
document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Show error message if passwords do not match
    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.style.display = 'block';
        showNotification('Passwords do not match. Please try again.', 'error');
        return;
    }

    // Collect form data
    const formData = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value
    };

    try {
        // Send form data to the server
        const response = await fetch('http://localhost:8082/api/user/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Handle the server response
        if (response.status === 201) {
            const data = await response.json();
            event.target.reset(); // Reset the form
            showNotification('User created successfully!', 'success');
        } else {
            console.error('Error:', `Status code: ${response.status}`);
            showNotification(`${response.status === 409 ? 'User already exists with the same username or email' : 'Failed to create user'}. Status code: ${response.status}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to create user', 'error');
    }
});

// Function to show notifications
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message; // Set the notification message
    notification.style.display = 'block'; // Ensure the notification is visible
    notification.className = 'notification ' + type + ' show'; // Set the notification type and display class
    setTimeout(() => {
        notification.classList.remove('show');
        notification.style.display = 'none'; // Hide the notification after 5 seconds
    }, 5000);
}
