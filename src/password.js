document.addEventListener('DOMContentLoaded', function() {
    // Function to set up password toggle functionality
    function setupPasswordToggle(toggleId, passwordId) {
        const togglePassword = document.getElementById(toggleId);
        const passwordField = document.getElementById(passwordId);

        if (!togglePassword || !passwordField) return; // Skip if elements don't exist

        togglePassword.addEventListener('click', function() {
            // Toggle password field type between password and text
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);

            // Toggle between eye.svg and eye-icon.svg based on password visibility
            if (type === 'text') {
                // Password is visible, show eye-icon.svg
                togglePassword.setAttribute('src', '/images/eye-icon.svg');
                togglePassword.setAttribute('alt', 'Hide Password');
            } else {
                // Password is hidden, show eye.svg
                togglePassword.setAttribute('src', '/images/eye.svg');
                togglePassword.setAttribute('alt', 'Show Password');
            }
        });
    }

    // Set up toggle functionality for all password fields
    setupPasswordToggle('toggle-password', 'password-field'); // For single password field pages
    setupPasswordToggle('toggle-password-1', 'password-field-1'); // For first password field
    setupPasswordToggle('toggle-password-2', 'password-field-2'); // For second password field
});
