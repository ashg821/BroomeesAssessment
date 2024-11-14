const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
const passwordError = document.getElementById('password-error');
confirmPasswordInput.addEventListener('input',
    function () {
        if (confirmPasswordInput.value !== passwordInput.value) { passwordError.style.display = 'block'; }
        else { passwordError.style.display = 'none'; }
    });



document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.style.display = 'block';
        showNotification('Passwords do not match. Please try again.', 'error');
        return;
    }

    const formData = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value
    };

    try {
        const response = await fetch('http://localhost:8082/api/user/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.status === 201) {
            const data = await response.json();
            event.target.reset();
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

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.className = 'notification ' + type + ' show';
    setTimeout(() => { notification.classList.remove('show'); }, 5000);
}
