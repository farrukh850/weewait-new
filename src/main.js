// Import styles to be processed by Vite
import './input.css';

// Mobile Menu Toggle function - defined outside the DOMContentLoaded event
// so it can be called immediately when the script loads
function setupMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');
  const mobileMenuItems = document.getElementById('mobile-menu-items');

  if (hamburgerBtn && mainNav && mobileMenuItems) {
    // Remove any existing event listeners (just in case)
    hamburgerBtn.removeEventListener('click', toggleMobileMenu);
    // Add the event listener
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    function toggleMobileMenu() {
      hamburgerBtn.classList.toggle('active');

      // Toggle the transform class to show/hide the navigation
      mainNav.classList.toggle('translate-x-full');
      mobileMenuItems.classList.toggle('translate-x-full');

      // Add 'active' class to hamburger button for styling if needed
      if (mainNav.classList.contains('translate-x-full')) {
        document.body.style.overflow = '';
      } else {
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
      }
    }

    return true;
  }
  return false;
}

// Accordion functionality
function setupAccordion() {
  const faqItems = document.querySelectorAll('.faq-header');

  if (faqItems.length) {
    faqItems.forEach(item => {
      // Find the button and content elements
      const button = item.querySelector('button');
      const content = item.parentElement.querySelector('.faq-content');
      const icon = button.querySelector('img');

      // Set initial state (first item open, rest closed)
      if (item !== faqItems[0]) {
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        content.style.marginTop = '0';
        if (icon) {
          icon.src = '/images/plus.svg';
          icon.alt = 'Plus';
        }
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        content.style.marginTop = '16px';
      }

      // Add click event listener to toggle accordion
      item.addEventListener('click', () => {
        const isOpen = content.style.maxHeight !== '0px';

        // Toggle current item
        if (isOpen) {
          // Close the item
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          content.style.marginTop = '0';
          if (icon) {
            icon.src = '/images/plus.svg';
            icon.alt = 'Plus';
          }
        } else {
          // Open the item
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = '1';
          content.style.marginTop = '16px';
          if (icon) {
            icon.src = '/images/minus.svg';
            icon.alt = 'Minus';
          }
        }
      });
    });

    return true;
  }
  return false;
}

// Plan duration buttons toggle functionality
function setupPlanDurationButtons() {
  const planDurationBtns = document.querySelectorAll('.plan-duration-btn');
  const saveDiscountSpan = document.querySelector('.save-discount');
  const priceDisplayElements = document.querySelectorAll('[data-monthly][data-yearly]');
  const originalPriceElements = document.querySelectorAll('.original-price');

  if (planDurationBtns.length) {
    // Set initial state - yearly pricing is shown by default (second button is active)
    updatePricing('yearly');

    planDurationBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        // Remove bg-accent class from all buttons
        planDurationBtns.forEach(b => {
          b.classList.remove('bg-accent');
          b.classList.add('text-primary_black/70');
        });

        // Add bg-accent class to the clicked button
        btn.classList.add('bg-accent');
        btn.classList.remove('text-primary_black/70');

        // Toggle the save-discount span background color based on which button is active
        if (saveDiscountSpan) {
          // If the second button (Yearly) is active
          if (index === 1) {
            saveDiscountSpan.classList.add('bg-primary_black');
            saveDiscountSpan.classList.remove('bg-accent_yellow');
            saveDiscountSpan.classList.remove('text-black');
            saveDiscountSpan.classList.add('text-white');
            updatePricing('yearly');
          } else {
            // If the first button (3 month) is active
            saveDiscountSpan.classList.add('bg-accent_yellow');
            saveDiscountSpan.classList.add('text-black');
            saveDiscountSpan.classList.remove('text-white');
            saveDiscountSpan.classList.remove('bg-primary_black');
            updatePricing('monthly');
          }
        }
      });
    });

    return true;
  }
  return false;

  // Helper function to update pricing based on selected plan duration
  function updatePricing(pricingType) {
    // Update all elements with price data attributes
    priceDisplayElements.forEach(element => {
      if (element.hasAttribute(`data-${pricingType}`)) {
        element.textContent = element.getAttribute(`data-${pricingType}`);
      }
    });
    // Update original (crossed-out) prices and toggle visibility
    originalPriceElements.forEach(element => {
      if (element.hasAttribute(`data-${pricingType}`)) {
        element.textContent = element.getAttribute(`data-${pricingType}`);
        // Show for yearly, hide for monthly
        if (pricingType === 'yearly') {
          element.classList.remove('hidden');
        } else {
          element.classList.add('hidden');
        }
      }
    });
  }
}

// Wait for jQuery to load first (jQuery is loaded from CDN in the HTML)
document.addEventListener('DOMContentLoaded', function() {
  // Set up the mobile menu right away
  const mobileMenuSetup = setupMobileMenu();

  // If mobile menu setup failed on first try, try again after a short delay
  // This helps with potential race conditions or slow DOM loading
  if (!mobileMenuSetup) {
    setTimeout(setupMobileMenu, 500);
  }

  // Set up the accordion functionality
  const accordionSetup = setupAccordion();

  // If accordion setup failed on first try, try again after a short delay
  if (!accordionSetup) {
    setTimeout(setupAccordion, 500);
  }

  // Setup plan duration buttons if present
  setupPlanDurationButtons();

  // Initialize Daycare Carousel
  const $carousel = $('.daycare-carousel');

  // Check if carousel exists before initializing
  if ($carousel.length) {
    console.log('Daycare carousel found, initializing...');
    $carousel.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      dots: false,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev hidden"><span class="carousel-arrow carousel-arrow-prev"></span></button>',
      nextArrow: '<button type="button" class="slick-next"><span class="carousel-arrow carousel-arrow-next"></span></button>',
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1.1,
            arrows: false,
          }
        }
      ]
    });
    console.log('Slick initialized');

    // Function to check slide position and hide/show arrows for daycare carousel
    function updateDaycareArrows() {
      const slideCount = $carousel.slick('getSlick').slideCount;
      const currentSlide = $carousel.slick('slickCurrentSlide');
      const slidesToShow = $carousel.slick('getSlick').options.slidesToShow;

      // Hide prev arrow on first slide, show otherwise
      if (currentSlide === 0) {
        $carousel.find('.slick-prev').addClass('hidden');
      } else {
        $carousel.find('.slick-prev').removeClass('hidden');
      }

      // Hide next arrow on last slide, show otherwise
      if (currentSlide >= slideCount - slidesToShow) {
        $carousel.find('.slick-next').addClass('hidden');
      } else {
        $carousel.find('.slick-next').removeClass('hidden');
      }
    }

    // Call initially to set correct state
    updateDaycareArrows();

    // Update arrows when slide changes
    $carousel.on('afterChange', function() {
      updateDaycareArrows();
    });

    // Handle mobile scrollbar functionality
    const $carouselSlides = $('.carousel-slide');
    const totalSlides = $carouselSlides.length;
    const $scrollbarThumb = $('.daycare-scrollbar-thumb');

    // Set initial scrollbar thumb width based on visible slides
    function initScrollbar() {
      const slidesToShow = $carousel.slick('getSlick').options.slidesToShow;
      const thumbPercentage = Math.min(slidesToShow / totalSlides, 1);
      const containerWidth = $('.daycare-scrollbar-container').width();
      const thumbWidth = Math.max(30, thumbPercentage * containerWidth); // Minimum thumb width of 30px

      $scrollbarThumb.css('width', thumbWidth + 'px');

      // Initial position
      updateScrollbarPosition(0);
    }

    // Call on load and window resize
    initScrollbar();
    $(window).on('resize', initScrollbar);

    // Update scrollbar position based on current slide
    function updateScrollbarPosition(currentSlide) {
      const slidePercentage = currentSlide / (totalSlides - $carousel.slick('getSlick').options.slidesToShow);
      const maxThumbPosition = $('.daycare-scrollbar-container').width() - $scrollbarThumb.width();
      const newPosition = Math.max(0, Math.min(slidePercentage * maxThumbPosition, maxThumbPosition));

      $scrollbarThumb.css('left', newPosition + 'px');
    }

    // Update scrollbar when slides change
    $carousel.on('afterChange', function(event, slick, currentSlide) {
      updateScrollbarPosition(currentSlide);
    });

    // Make the scrollbar draggable
    let isDragging = false;
    let startX, startLeft;

    $scrollbarThumb.on('mousedown touchstart', function(e) {
      isDragging = true;
      $scrollbarThumb.addClass('dragging');

      // Get initial position
      startX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
      startLeft = parseInt($scrollbarThumb.css('left'));

      // Prevent default to avoid text selection
      e.preventDefault();
    });

    $(document).on('mousemove touchmove', function(e) {
      if (!isDragging) return;

      // Calculate new position
      const x = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
      const diff = x - startX;

      const containerWidth = $('.daycare-scrollbar-container').width();
      const thumbWidth = $scrollbarThumb.width();
      const maxPosition = containerWidth - thumbWidth;

      let newLeft = Math.max(0, Math.min(startLeft + diff, maxPosition));

      // Update thumb position
      $scrollbarThumb.css('left', newLeft + 'px');

      // Calculate which slide to go to
      const slidePercentage = newLeft / maxPosition;
      const slideCount = $carousel.slick('getSlick').slideCount;
      const slidesToShow = $carousel.slick('getSlick').options.slidesToShow;
      const targetSlide = Math.round(slidePercentage * (slideCount - slidesToShow));

      // Go to slide
      $carousel.slick('slickGoTo', targetSlide);
    });

    $(document).on('mouseup touchend', function() {
      if (isDragging) {
        isDragging = false;
        $scrollbarThumb.removeClass('dragging');
      }
    });
  } else {
    console.log('Daycare carousel not found on this page');
  }

  // Initialize Testimonial Slider
  const $testimonialSlider = $('.testimonial-slider');

  $testimonialSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.testimonial-prev'),
    nextArrow: $('.testimonial-next'),
  });
});


//Filter Javascript
// Filter dropdowns functionality
function setupFilterDropdowns() {
  const filterButtons = document.querySelectorAll('.filter-button');

  if (filterButtons.length) {
    // First, hide all dropdowns initially with opacity and height
    filterButtons.forEach(button => {
      const dropdown = button.querySelector('.filter-dropdown');
      const caretIcon = button.querySelector('img[src*="caret"]'); // Get the caret icon

      if (dropdown) {
        dropdown.style.opacity = '0';
        dropdown.style.maxHeight = '0';
        dropdown.style.overflow = 'hidden';
        dropdown.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
        dropdown.style.pointerEvents = 'none'; // Disable interaction when hidden
      }

      // Set initial caret rotation
      if (caretIcon) {
        caretIcon.style.transform = 'rotate(0deg)';
        caretIcon.style.transition = 'transform 0.3s ease';
      }
    });

    // Add click event listeners to each filter button
    filterButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        const dropdown = this.querySelector('.filter-dropdown');
        const caretIcon = this.querySelector('img[src*="caret"]'); // Get the caret icon

        if (!dropdown) return;

        // Get all other dropdowns to close them
        const allDropdowns = document.querySelectorAll('.filter-dropdown');
        const allButtons = document.querySelectorAll('.filter-button');

        // Toggle current dropdown
        const isVisible = dropdown.style.opacity === '1';

        // First close all dropdowns and reset all carets
        allDropdowns.forEach(item => {
          if (item !== dropdown) {
            item.style.opacity = '0';
            item.style.maxHeight = '0';
            item.style.pointerEvents = 'none';
          }
        });

        allButtons.forEach(btn => {
          if (btn !== button) {
            const otherCaret = btn.querySelector('img[src*="caret"]');
            if (otherCaret) {
              otherCaret.style.transform = 'rotate(0deg)';
            }
          }
        });

        // Then toggle the current dropdown and rotate caret
        if (isVisible) {
          dropdown.style.opacity = '0';
          dropdown.style.maxHeight = '0';
          dropdown.style.pointerEvents = 'none';

          // Rotate caret back
          if (caretIcon) {
            caretIcon.style.transform = 'rotate(0deg)';
          }
        } else {
          dropdown.style.opacity = '1';
          dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
          dropdown.style.pointerEvents = 'auto';

          // Rotate caret
          if (caretIcon) {
            caretIcon.style.transform = 'rotate(180deg)';
          }
        }

        // Prevent the event from bubbling up to document
        e.stopPropagation();
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.filter-button')) {
        const allDropdowns = document.querySelectorAll('.filter-dropdown');
        const allButtons = document.querySelectorAll('.filter-button');

        allDropdowns.forEach(dropdown => {
          dropdown.style.opacity = '0';
          dropdown.style.maxHeight = '0';
          dropdown.style.pointerEvents = 'none';
        });

        // Reset all carets
        allButtons.forEach(btn => {
          const caret = btn.querySelector('img[src*="caret"]');
          if (caret) {
            caret.style.transform = 'rotate(0deg)';
          }
        });
      }
    });

    return true;
  }
  return false;
}

// Call the setup function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupFilterDropdowns();
});
