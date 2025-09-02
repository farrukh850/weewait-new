// Terms, Privacy & Cookies popup functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Terms popup script loaded');
    // Get the terms link and create popup
    const termsLink = document.querySelector('.terms-link');
    const popupOverlay = document.getElementById('terms-popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const closePopupBtn = document.getElementById('close-popup');
    const continueBtn = document.getElementById('continue-btn');
    const closeBtn = document.querySelector('.popup-content button.flex-1');
    const termsContainer = document.querySelector('.bg-terms_popup');

    console.log('Terms link:', termsLink);
    console.log('Popup overlay:', popupOverlay);
    console.log('Popup content:', popupContent);
    console.log('Close button:', closePopupBtn);
    console.log('Continue button:', continueBtn);

    // Disable the continue button initially
    if (continueBtn) {
        continueBtn.disabled = true;
        continueBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    // Function to check if user has scrolled to the bottom
    const checkScroll = () => {
        if (termsContainer) {
            // Check if scrolled to bottom (with a small tolerance)
            const isAtBottom = termsContainer.scrollHeight - termsContainer.scrollTop <= termsContainer.clientHeight + 5;

            if (isAtBottom && continueBtn) {
                // Enable the button
                continueBtn.disabled = false;
                continueBtn.classList.remove('opacity-50', 'cursor-not-allowed');

                // Remove the scroll event listener once scrolled to bottom
                termsContainer.removeEventListener('scroll', checkScroll);
            }
        }
    };

    // Add scroll event listener to the terms container
    if (termsContainer) {
        termsContainer.addEventListener('scroll', checkScroll);
    }

    // Open popup when terms link is clicked
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            console.log('Terms link clicked');
            e.preventDefault();
            // Show the popup first (remove hidden)
            popupOverlay.classList.remove('hidden');

            // Trigger fade in effect after a small delay to allow for transition
            setTimeout(() => {
                popupOverlay.classList.add('opacity-100');
                popupContent.classList.add('opacity-100', 'translate-y-0');
            }, 10);

            document.body.classList.add('overflow-hidden');
        });
    } else {
        console.error('Terms link not found!');
    }

    // Close popup function
    const closePopup = () => {
        console.log('Closing popup');
        // Start fade out animation
        popupOverlay.classList.remove('opacity-100');
        if (popupContent) {
            popupContent.classList.remove('opacity-100', 'translate-y-0');
        } else {
            console.error('Popup content element not found');
        }

        // Wait for animation to complete before hiding completely
        setTimeout(() => {
            popupOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    };

    // Close popup when close button is clicked
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function(e) {
            console.log('Close button clicked');
            e.preventDefault();
            closePopup();
        });
    } else {
        console.error('Close button not found!');
    }

    // Close popup when "Close" button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            console.log('Close button clicked');
            e.preventDefault();
            closePopup();
        });
    }

    // Continue button click handler
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            console.log('Continue button clicked');
            e.preventDefault();
            if (!this.disabled) {
                closePopup();
                // Additional action when agreeing to terms can be added here
            }
        });
    } else {
        console.error('Continue button not found!');
    }

    // Close popup when clicking outside the popup content
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            // Only close if the click was directly on the overlay, not on its children
            if (e.target === popupOverlay) {
                console.log('Clicked outside popup');
                closePopup();
            }
        });
    } else {
        console.error('Popup overlay not found!');
    }
});
