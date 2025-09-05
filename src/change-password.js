// Password toggle functionality for settings-password.html
document.addEventListener('DOMContentLoaded', function() {
    // Define the password field mappings with correct IDs from HTML
    const passwordToggles = [
        {
            toggleButtonId: 'toggle-password',
            passwordFieldId: 'password-field'
        },
        {
            toggleButtonId: 'toggle-restore-password',
            passwordFieldId: 'password-restore'
        },
        {
            toggleButtonId: 'toggle-repeat-password',
            passwordFieldId: 'password-repeat'
        }
    ];

    passwordToggles.forEach(function(item) {
        const toggleButton = document.getElementById(item.toggleButtonId);
        const passwordField = document.getElementById(item.passwordFieldId);

        if (toggleButton && passwordField) {
            toggleButton.addEventListener('click', function() {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    toggleButton.src = '/images/eye-icon.svg';
                } else {
                    passwordField.type = 'password';
                    toggleButton.src = '/images/eye.svg';
                }
            });
        } else {
            console.log('Element not found:', item.toggleButtonId, item.passwordFieldId);
        }
    });
});
