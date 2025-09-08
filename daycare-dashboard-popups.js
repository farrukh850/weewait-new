// Daycare Dashboard Popups - manages popup functionality for the daycare dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Function to show popup
    function showPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (!popup) return;

        // Show the overlay
        popup.classList.remove('hidden');

        // Animate in
        setTimeout(() => {
            popup.classList.add('opacity-100');
            const popupContent = popup.querySelector('.popup-content');
            if (popupContent) {
                popupContent.classList.remove('opacity-0', 'translate-y-4');
            }
        }, 10);
    }

    // Function to hide popup
    function hidePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (!popup) return;

        // Animate out
        popup.classList.remove('opacity-100');
        const popupContent = popup.querySelector('.popup-content');
        if (popupContent) {
            popupContent.classList.add('opacity-0', 'translate-y-4');
        }

        // Hide the overlay after animation completes
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 300);
    }

    // Function to show toast notification
    function showToast(toastClass, duration = 5000) {
        const toast = document.querySelector(`.${toastClass}`);
        if (!toast) return;

        // Show the toast
        toast.classList.remove('hidden');

        // Hide the toast after specified duration
        setTimeout(() => {
            toast.classList.add('hidden');
        }, duration);
    }

    // Add click event for Details li elements
    document.querySelectorAll('.daycare-details-popup-button').forEach(li => {
        li.addEventListener('click', function() {
            showPopup('daycare-row-details');
        });
    });

    // Add click event for Remove Response button
    document.querySelectorAll('.remove-response-button').forEach(li => {
        li.addEventListener('click', function() {
            showPopup('daycare-remove-response');
        });
    });

    // Add click event for Accept Response button
    document.querySelectorAll('.accept-response-button').forEach(li => {
        li.addEventListener('click', function() {
            // Show accept response toast notification
            showToast('accept-response-toast-block');

            // Close any open dropdowns
            document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.maxHeight = '0px';
                dropdown.style.pointerEvents = 'none';
            });
        });
    });

    // Add click event for Close buttons
    document.getElementById('close-popup-mobile-daycare-details')?.addEventListener('click', function() {
        hidePopup('daycare-row-details');
    });

    document.getElementById('close-popup-mobile-remove-response')?.addEventListener('click', function() {
        hidePopup('daycare-remove-response');
    });

    // Add click event for Remove Response confirmation button to hide the popup
    const removeResponseButton = document.querySelector('#daycare-remove-response .apply-now-button');
    if (removeResponseButton) {
        removeResponseButton.addEventListener('click', function() {
            hidePopup('daycare-remove-response');
            // Show the toast notification for response removal
            showToast('toast-block');
        });
    }

    // Add click event for closing toast notifications
    document.querySelectorAll('.toast-block button, .accept-response-toast-block button').forEach(button => {
        button.addEventListener('click', function() {
            const toast = this.closest('.toast-block, .accept-response-toast-block');
            if (toast) {
                toast.classList.add('hidden');
            }
        });
    });

    // Tab functionality for switching between content tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tabs-content');

    // Hide all tab contents except the first one on initial load
    if (tabContents.length > 1) {
        for (let i = 1; i < tabContents.length; i++) {
            tabContents[i].classList.add('hidden');
        }
    }

    // Add click event for tab buttons
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove active styling from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('bg-accent');
                btn.classList.remove('font-semibold');
                btn.classList.add('text-primary_black/70');
            });

            // Add active styling to clicked button
            this.classList.add('bg-accent');
            this.classList.add('font-semibold');
            this.classList.remove('text-primary_black/70');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected tab content
            if (tabContents[index]) {
                tabContents[index].classList.remove('hidden');
            }
        });
    });
});


