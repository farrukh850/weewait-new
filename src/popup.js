// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize popup functionality
  initPopup();

  // Initialize toast functionality for Apply Now buttons
  initToastForApplyButtons();

  // Initialize mobile popups
  initMobilePopups();

  // Initialize range slider
  initRangeSlider();
});

function initPopup() {
  // Find ALL popup-button elements that will trigger the popup
  const popupButtons = document.querySelectorAll('.popup-button');

  if (popupButtons.length > 0) {
    // Add click event listener to ALL popup buttons
    popupButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        openPopup('filter-popup');
      });
    });
  }

  // Close popup when clicking the close button or overlay
  const closeButtons = document.querySelectorAll('.popup-close, .popup-overlay');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Only close if clicking the overlay itself or the close button
      if (e.target === this || e.target.closest('.popup-close')) {
        const popupId = e.target.closest('.popup-overlay').id;
        closePopup(popupId);
      }
    });
  });

  // Handle the Apply button click in the popup
  const applyButton = document.querySelector('.apply-now-button');
  if (applyButton) {
    applyButton.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default form submission

      // Close the popup
      const popupId = e.target.closest('.popup-overlay').id;
      closePopup(popupId);

      // Show toast notification
      showToast();

      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function initToastForApplyButtons() {
  // Get all Apply Now buttons
  const applyButtons = document.querySelectorAll('.apply-now-button');
  const toastBlock = document.querySelector('.toast-block');

  if (applyButtons.length > 0 && toastBlock) {
    applyButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        showToast(toastBlock);
      });
    });

    // Add event listener to close toast when clicking the close button
    const toastCloseButton = toastBlock.querySelector('button');
    if (toastCloseButton) {
      toastCloseButton.addEventListener('click', function() {
        hideToast(toastBlock);
      });
    }

    // Auto-hide the toast after 5 seconds
    let toastTimeout;
    function showToast(toast) {
      // First clear any existing timeout
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }

      // Position the toast at the bottom of the viewport
      toast.style.display = 'block';
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.3s ease';

      // Trigger reflow
      void toast.offsetWidth;

      // Show toast with animation
      toast.style.opacity = '1';

      // Set timeout to hide the toast
      toastTimeout = setTimeout(() => {
        hideToast(toast);
      }, 5000);

      // Start progress bar animation
      const progressBar = toast.querySelector('em');
      if (progressBar) {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '0';
      }
    }

    function hideToast(toast) {
      toast.style.opacity = '0';

      // Reset progress bar
      const progressBar = toast.querySelector('em');
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '50%';
      }
    }
  }
}

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Global variable to store timeout ID
let toastTimeout;

function showToast() {
  const toast = document.querySelector('.toast-block');
  if (!toast) return;

  // First clear any existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // Make the toast visible
  toast.classList.remove('hidden');
  toast.style.display = 'block';
  toast.style.opacity = '1';

  // Reset and start the progress bar animation
  const progressBar = toast.querySelector('em');
  if (progressBar) {
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';

    // Force reflow to make sure the transition starts from the beginning
    void progressBar.offsetWidth;

    progressBar.style.transition = 'width 5s linear';
    progressBar.style.width = '0';
  }

  // Auto-hide the toast after 5 seconds
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  const toast = document.querySelector('.toast-block');
  if (!toast) return;

  toast.style.opacity = '0';

  // Hide the toast after the transition
  setTimeout(() => {
    toast.style.display = 'none';
    toast.classList.add('hidden');

    // Reset progress bar
    const progressBar = toast.querySelector('em');
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '100%';
    }
  }, 300);
}

// Function to initialize all mobile popups
function initMobilePopups() {
  initMobilePopup('filter-mobile-btn', 'filter-popup-mobile');
  initMobilePopup('sort-mobile-btn', 'sort-popup-mobile');
  initMobilePopup('search-mobile-btn', 'search-popup-mobile');

  // Initialize scroll fade effect for all mobile popups
  initScrollFadeEffect();
}

// Enhanced function to initialize mobile popups with better touch handling
function initMobilePopup(buttonId, popupId) {
  const button = document.getElementById(buttonId);
  const popup = document.getElementById(popupId);

  if (!button || !popup) return;

  // Add touchstart and click events for better mobile responsiveness
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    togglePopup(popup);
  });

  // Use touchstart for faster response on mobile
  button.addEventListener('touchstart', function(e) {
    e.preventDefault();
    togglePopup(popup);
  }, { passive: false });

  // Close buttons inside the popup
  const closeButtons = popup.querySelectorAll('.popup-close');
  closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closePopupMobile(popup);
    });

    closeBtn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      closePopupMobile(popup);
    }, { passive: false });
  });

  // Close when clicking outside popup content
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      closePopupMobile(popup);
    }
  });

  // Handle apply buttons inside mobile popups
  const applyButtons = popup.querySelectorAll('.apply-now-button');
  applyButtons.forEach(applyBtn => {
    applyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closePopupMobile(popup);
      // Show toast notification if needed
      showToast();
    });
  });
}

// Toggle mobile popup visibility
function togglePopup(popup) {
  if (popup.classList.contains('active')) {
    closePopupMobile(popup);
  } else {
    openPopupMobile(popup);
  }
}

// Open mobile popup with enhanced animation
function openPopupMobile(popup) {
  // Close any other open popups first
  document.querySelectorAll('.popup-overlay.active').forEach(openPopup => {
    if (openPopup !== popup) {
      closePopupMobile(openPopup);
    }
  });

  // Add active class to show the popup
  popup.classList.add('active');

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';

  // Force browser reflow to ensure animations work properly
  void popup.offsetWidth;
}

// Close mobile popup with enhanced animation
function closePopupMobile(popup) {
  popup.classList.remove('active');
  document.body.style.overflow = '';
}

// Initialize scroll fade effect for scrollable containers
function initScrollFadeEffect() {
  const scrollableContainers = document.querySelectorAll('.overflow-y-auto');

  scrollableContainers.forEach(container => {
    // Check if a fade element exists, if not create one
    let fadeElement = container.querySelector('#scroll-fade');

    if (!fadeElement) {
      fadeElement = document.createElement('div');
      fadeElement.id = 'scroll-fade';
      container.appendChild(fadeElement);
    }

    // Initial check
    checkScrollPosition(container, fadeElement);

    // Check on scroll
    container.addEventListener('scroll', function() {
      checkScrollPosition(container, fadeElement);
    });

    // Check on window resize
    window.addEventListener('resize', function() {
      checkScrollPosition(container, fadeElement);
    });
  });
}

function checkScrollPosition(container, fadeElement) {
  // Check if user has scrolled to the bottom
  const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5; // 5px tolerance

  // Toggle fade visibility
  if (isAtBottom) {
    fadeElement.style.opacity = '0';
  } else {
    fadeElement.style.opacity = '1';
  }

  // Position the fade element at the bottom of the container
  fadeElement.style.bottom = '0';
  fadeElement.style.position = 'absolute';
}

// Range Slider functionality
function initRangeSlider() {
  const rangeSliders = document.querySelectorAll('.range-slider-min, .range-slider-max');

  if (rangeSliders.length === 0) return;

  let isDragging = false;
  let activeHandle = null;
  let startX, startLeft;
  const sliderColors = ['#FFA9CF']; // Different blue shades

  // Initialize the slider positions and fill elements
  const sliderContainers = document.querySelectorAll('.range-slider-min');
  sliderContainers.forEach(minHandle => {
    const container = minHandle.closest('span');
    const maxHandle = container.querySelector('.range-slider-max');
    const fillElement = container.querySelector('.range-slider-fill');

    if (fillElement) {
      // Set initial fill position between the two handles
      const minPos = minHandle.offsetLeft + (minHandle.offsetWidth / 2);
      const maxPos = maxHandle.offsetLeft;
      fillElement.style.left = `${minPos}px`;
      fillElement.style.width = `${maxPos - minPos}px`;
      fillElement.style.backgroundColor = sliderColors[0]; // Set color
    }
  });

  // Prevent filter dropdown from closing when interacting with the slider
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    const dropdown = button.querySelector('.filter-dropdown');
    if (dropdown) {
      dropdown.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
      });
    }
  });

  rangeSliders.forEach(handle => {
    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: false });
  });

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);

  function startDrag(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent the dropdown from closing
    isDragging = true;
    activeHandle = this;

    const slider = activeHandle.closest('span');
    const rect = slider.getBoundingClientRect();

    // Get starting position
    if (e.type === 'touchstart') {
      startX = e.touches[0].clientX;
    } else {
      startX = e.clientX;
    }
    startLeft = activeHandle.offsetLeft;
  }

  function drag(e) {
    if (!isDragging || !activeHandle) return;

    e.preventDefault();

    // Calculate the new position
    let clientX;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    let deltaX = clientX - startX;
    let newLeft = startLeft + deltaX;

    const slider = activeHandle.closest('span');
    const sliderRect = slider.getBoundingClientRect();
    const minHandle = slider.querySelector('.range-slider-min');
    const maxHandle = slider.querySelector('.range-slider-max');
    const fillElement = slider.querySelector('.range-slider-fill');

    // Calculate boundaries
    const minPosition = 0;
    const maxPosition = slider.offsetWidth - activeHandle.offsetWidth;

    // Constrain to slider bounds
    newLeft = Math.max(minPosition, Math.min(newLeft, maxPosition));

    // Additional constraints based on which handle is being dragged
    if (activeHandle.classList.contains('range-slider-min')) {
      // Min handle should not go beyond max handle - small gap
      const maxHandlePos = maxHandle.offsetLeft;
      newLeft = Math.min(newLeft, maxHandlePos - 10);
    } else {
      // Max handle should not go below min handle + small gap
      const minHandlePos = minHandle.offsetLeft;
      newLeft = Math.max(newLeft, minHandlePos + 10);
    }

    // Update handle position
    activeHandle.style.left = `${newLeft}px`;

    // Update fill element
    if (fillElement) {
      const minHandlePos = minHandle.offsetLeft + (minHandle.offsetWidth / 2);
      const maxHandlePos = maxHandle.offsetLeft + (maxHandle.offsetWidth / 2);
      fillElement.style.left = `${minHandlePos}px`;
      fillElement.style.width = `${maxHandlePos - minHandlePos}px`;
    }

    // Update price values
    updatePriceValues(slider, minHandle, maxHandle);
  }

  function stopDrag() {
    isDragging = false;
    activeHandle = null;
  }

  function updatePriceValues(slider, minHandle, maxHandle) {
    // Find the nearest parent container that holds the min and max value displays
    const container = slider.closest('.filter-dropdown, .flex.flex-col.gap-2');
    if (!container) return;

    // Find min and max value elements
    const minValueEl = container.querySelector('.min-value');
    const maxValueEl = container.querySelector('.max-value');

    if (!minValueEl || !maxValueEl) return;

    // Calculate percentage of slider position
    const sliderWidth = slider.offsetWidth - minHandle.offsetWidth;
    const minPercent = (minHandle.offsetLeft / sliderWidth) * 100;
    const maxPercent = (maxHandle.offsetLeft / sliderWidth) * 100;

    // Calculate price range from $20 to $200
    const priceRange = 180; // $200 - $20
    const minPrice = Math.round(20 + (minPercent / 100) * priceRange);
    const maxPrice = Math.round(20 + (maxPercent / 100) * priceRange);

    // Update the displayed values
    minValueEl.textContent = `$ ${minPrice}`;
    maxValueEl.textContent = `$ ${maxPrice}`;

    // Update fill element width
    const fillElement = slider.querySelector('.range-slider-fill');
    if (fillElement) {
      fillElement.style.width = `${maxPercent - minPercent}%`;
    }
  }

  // Initial update of values
  rangeSliders.forEach(handle => {
    if (handle.classList.contains('range-slider-min')) {
      const slider = handle.closest('span');
      const minHandle = slider.querySelector('.range-slider-min');
      const maxHandle = slider.querySelector('.range-slider-max');
      updatePriceValues(slider, minHandle, maxHandle);
    }
  });
}
