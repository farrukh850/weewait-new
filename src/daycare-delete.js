// Daycare delete functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Daycare delete script loaded');

    // Get all delete buttons and popup elements
    const deleteButtons = document.querySelectorAll('.terms-link');
    const popupOverlay = document.getElementById('terms-popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const closePopupBtn = document.getElementById('close-popup');
    const cancelBtn = document.querySelector('.popup-content button.flex-1');
    const removeDaycareBtn = document.querySelector('.popup-content button:not(.flex-1)');
    const daycareNameElement = document.querySelector('.terms-content h3');

    console.log('Delete buttons found:', deleteButtons.length);

    // Function to open popup
    const openDeletePopup = (row) => {
        if (row) {
            const childName = row.querySelector('td:first-child').textContent.trim();
            const daycareName = row.querySelector('td:nth-child(3)').textContent.trim();

            // Update the popup content with the relevant info
            if (daycareNameElement) {
                daycareNameElement.textContent = `Are you sure you want to remove ${childName} from ${daycareName}'s waitlist?`;
            }
        }

        // Show the popup with fade-in animation
        popupOverlay.classList.remove('hidden');
        setTimeout(() => {
            popupOverlay.classList.add('opacity-100');
            popupContent.classList.remove('opacity-0', 'translate-y-4');
        }, 10);
    };

    // Function to close popup
    const closeDeletePopup = () => {
        // Hide the popup with fade-out animation
        popupOverlay.classList.remove('opacity-100');
        popupContent.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
            popupOverlay.classList.add('hidden');
        }, 300);
    };

    // Add click event listeners to all delete buttons
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                console.log('Delete button clicked');
                e.preventDefault();
                e.stopPropagation(); // Prevent event from bubbling up to parent elements

                // Get the parent row
                const row = this.closest('tr');
                openDeletePopup(row);
            });
        });
    }

    // Close popup when close button is clicked
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closeDeletePopup);
    }

    // Close popup when cancel button is clicked
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeDeletePopup);
    }

    // Handle remove daycare action
    if (removeDaycareBtn) {
        removeDaycareBtn.addEventListener('click', function() {
            console.log('Remove daycare button clicked');

            // Get the row that was clicked (this needs to be stored when opening the popup)
            const currentRow = document.querySelector('.table-rounded tbody tr.pending-delete');
            if (currentRow) {
                // Remove the row from the table
                currentRow.remove();
                console.log('Daycare removed from waitlist');
            }

            // Close the popup
            closeDeletePopup();
        });
    }

    // Close popup when clicking outside the content
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closeDeletePopup();
            }
        });
    }
});
