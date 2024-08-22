document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let valid = true;

    // Clear previous errors
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    // Basic input validation
    if (username.trim() === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        document.getElementById('usernameError').style.display = 'block';
        valid = false;
    }

    if (password.trim() === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    }

    if (valid) {
        // Hash the password using SHA-256
        hashPassword(password).then(hashedPassword => {
            console.log('Username:', username);
            console.log('Hashed Password:', hashedPassword);
            alert('Login successful!');
        });
    }
});

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hexString(hash);
}

function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');
}
