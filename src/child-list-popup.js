document.addEventListener('DOMContentLoaded', function() {
    // Get all child list items with the filter-button class
    const childListItems = document.querySelectorAll('.edit-remove-childcare');

    // Get the list-of-children popup
    const childrenPopup = document.getElementById('list-of-children-popup');

    if (childListItems.length > 0 && childrenPopup) {
        childListItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Only open the popup if clicking on the item itself or its child elements
                // (not when clicking on the dropdown menu items)
                if (!e.target.closest('.filter-dropdown')) {
                    // Get the child's name from the clicked item
                    const childName = item.querySelector('p').textContent;

                    // Update the popup title with the child's name
                    const popupTitle = childrenPopup.querySelector('h2');
                    if (popupTitle) {
                        popupTitle.textContent = childName;
                    }

                    // Show the popup with animation
                    childrenPopup.classList.remove('hidden');

                    // Force browser reflow to ensure animations work properly
                    void childrenPopup.offsetWidth;

                    // Animate in
                    childrenPopup.classList.add('opacity-100');
                    const popupContent = childrenPopup.querySelector('.popup-content');
                    if (popupContent) {
                        popupContent.classList.remove('opacity-0', 'translate-y-4');
                    }

                    // Prevent body scrolling
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Add close functionality to the popup close button
        const closeButton = childrenPopup.querySelector('button');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                // Hide with animation
                childrenPopup.classList.remove('opacity-100');
                const popupContent = childrenPopup.querySelector('.popup-content');
                if (popupContent) {
                    popupContent.classList.add('opacity-0', 'translate-y-4');
                }

                // After animation completes, hide the popup
                setTimeout(() => {
                    childrenPopup.classList.add('hidden');
                    // Restore body scrolling
                    document.body.style.overflow = '';
                }, 300);
            });
        }
    }
});
