/**
 * Parent Dashboard Tabs - Handles tab switching for the mobile view of parent dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and tab content
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to switch tabs
    function switchTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Remove active class from all tabs
        tabButtons.forEach(btn => {
            btn.classList.remove('border-b', 'border-accent');
        });

        // Show the selected tab content
        const selectedTab = document.getElementById(`${tabId}-tab`);
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
        }

        // Add active class to the clicked tab
        const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.add('border-b', 'border-accent');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Initialize the first tab as active (waitlists tab)
    const firstTabId = tabButtons[0]?.getAttribute('data-tab');
    if (firstTabId) {
        switchTab(firstTabId);
    }

    // Mobile popup functionality for three-dots buttons
    const mobilePopup = document.getElementById('remove-daycare-mobile-popup');
    const mobileActionButtons = document.querySelectorAll('.remove-childcare-mobile-button');
    const mobileCloseButtons = mobilePopup?.querySelectorAll('#close-popup-mobile');

    // Add click event listeners to mobile three-dots buttons
    mobileActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (mobilePopup) {
                // Show popup
                mobilePopup.classList.remove('hidden');
                mobilePopup.style.opacity = '1';

                // Add fade-in animation
                setTimeout(() => {
                    const popupContent = mobilePopup.querySelector('.popup-content');
                    if (popupContent) {
                        popupContent.classList.remove('opacity-0', 'translate-y-4');
                    }
                }, 10);
            }
        });
    });

    // Add click event listeners to close buttons
    mobileCloseButtons?.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            closeMobilePopup();
        });
    });

    // Close popup when clicking outside
    mobilePopup?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeMobilePopup();
        }
    });

    // Function to close mobile popup with animation
    function closeMobilePopup() {
        if (mobilePopup) {
            const popupContent = mobilePopup.querySelector('.popup-content');
            if (popupContent) {
                popupContent.classList.add('opacity-0', 'translate-y-4');
            }

            setTimeout(() => {
                mobilePopup.style.opacity = '0';
                setTimeout(() => {
                    mobilePopup.classList.add('hidden');
                }, 300);
            }, 100);
        }
    }

    // Filter popup functionality
    const filterPopup = document.getElementById('parent-dashboard-filter-popup');
    const filterButton = document.querySelector('.parent-dashboard-mobile-filter');
    const filterCloseButton = document.getElementById('close-filter-popup');

    // Add click event listener to filter button
    if (filterButton) {
        filterButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (filterPopup) {
                // Show filter popup
                filterPopup.classList.remove('hidden');
                filterPopup.style.opacity = '1';

                // Add fade-in animation
                setTimeout(() => {
                    const popupContent = filterPopup.querySelector('.popup-content');
                    if (popupContent) {
                        popupContent.classList.remove('opacity-0', 'translate-y-4');
                    }
                }, 10);
            }
        });
    }

    // Add click event listener to filter close button
    if (filterCloseButton) {
        filterCloseButton.addEventListener('click', function() {
            closeFilterPopup();
        });
    }

    // Close filter popup when clicking outside
    filterPopup?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeFilterPopup();
        }
    });

    // Function to close filter popup with animation
    function closeFilterPopup() {
        if (filterPopup) {
            const popupContent = filterPopup.querySelector('.popup-content');
            if (popupContent) {
                popupContent.classList.add('opacity-0', 'translate-y-4');
            }

            setTimeout(() => {
                filterPopup.style.opacity = '0';
                setTimeout(() => {
                    filterPopup.classList.add('hidden');
                }, 300);
            }, 100);
        }
    }
});
