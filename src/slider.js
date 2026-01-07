// Circular Step Loader with Progressive Arc Fill and Image Transitions
// Responsive slider that shows desktop or mobile version based on viewport width
document.addEventListener('DOMContentLoaded', function() {
  const desktopSlider = document.querySelector('.slider-desktop');
  const mobileSlider = document.querySelector('.slider-mobile');

  // Step data for mobile content updates
  const stepData = [
    {
      number: '1',
      title: 'Create your account',
      description: 'Enter basic details and set a secure password.'
    },
    {
      number: '2',
      title: 'Import your waitlist',
      description: 'Bring your current list into the system in a few clicks, in any format.'
    },
    {
      number: '3',
      title: 'Share your daycare with families',
      description: 'Share to grab your custom sign-up link and QR code.'
    },
    {
      number: '4',
      title: 'You\'re set for success',
      description: 'Configure your rooms with presets and adjust the setup anytime.'
    }
  ];

  let steps = [
    { element: document.querySelector('.step-one'), images: [], arc: null },
    { element: document.querySelector('.step-two'), images: [], arc: null },
    { element: document.querySelector('.step-three'), images: [], arc: null },
    { element: document.querySelector('.step-four'), images: [], arc: null }
  ];

  let currentStep = 0;
  const totalSteps = steps.length;
  const transitionDuration = 6000; // 6 seconds per step
  let progressInterval = null;
  let fillPercentage = 0;

  // Determine which slider is active based on viewport width
  function getActiveSlider() {
    return window.innerWidth >= 1024 ? desktopSlider : mobileSlider;
  }

  // Update mobile step content
  function updateMobileStepContent(stepIndex) {
    const mobileNumber = document.querySelector('.step-mobile-number');
    const mobileTitle = document.querySelector('.step-mobile-title');
    const mobileDescription = document.querySelector('.step-mobile-description');

    if (mobileNumber && mobileTitle && mobileDescription) {
      const data = stepData[stepIndex];
      mobileNumber.textContent = data.number;
      mobileTitle.textContent = data.title;
      mobileDescription.textContent = data.description;
    }
  }

  // Initialize steps with images from the active slider
  function initializeSteps() {
    const activeSlider = getActiveSlider();

    steps.forEach((step, index) => {
      // Get arc loader from step element
      if (step.element) {
        step.arc = step.element.querySelector('.arc-loader');
      }

      // Get images from active slider only
      if (activeSlider) {
        const stepNames = ['one', 'two', 'three', 'four'];
        const img = activeSlider.querySelector(`.step-${stepNames[index]}-image`);
        if (img) {
          step.images = [img];
        } else {
          step.images = [];
        }
      }
    });

    // On mobile, get the arc loader from step-mobile element
    if (window.innerWidth < 1024) {
      const mobileStepElement = document.querySelector('.step-mobile');
      if (mobileStepElement) {
        const mobileArc = mobileStepElement.querySelector('.arc-loader');
        if (mobileArc) {
          // Override all step arcs with the mobile arc for mobile view
          steps.forEach(step => {
            step.arc = mobileArc;
          });
        }
      }
    }

    // Show first image and hide others
    if (steps[0].images.length > 0) {
      steps[0].images.forEach(img => {
        img.classList.remove('hidden');
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.5s ease-in-out';
      });
    }

    for (let i = 1; i < totalSteps; i++) {
      if (steps[i].images.length > 0) {
        steps[i].images.forEach(img => {
          img.classList.add('hidden');
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease-in-out';
        });
      }
    }

    // Update mobile step content on initialization
    if (window.innerWidth < 1024) {
      updateMobileStepContent(0);
    }
  }

  // Update arc progress
  function updateArcProgress(stepIndex, percentage) {
    const step = steps[stepIndex];
    if (!step.arc) return;

    const arc = step.arc;

    // Update border gradient based on percentage
    if (percentage === 0) {
      arc.style.borderTopColor = 'transparent';
      arc.style.borderRightColor = 'transparent';
      arc.style.borderBottomColor = 'transparent';
      arc.style.borderLeftColor = 'transparent';
    } else if (percentage <= 25) {
      arc.style.borderTopColor = '#3B82F6';
      arc.style.borderRightColor = 'transparent';
      arc.style.borderBottomColor = 'transparent';
      arc.style.borderLeftColor = 'transparent';
    } else if (percentage <= 50) {
      arc.style.borderTopColor = '#3B82F6';
      arc.style.borderRightColor = '#3B82F6';
      arc.style.borderBottomColor = 'transparent';
      arc.style.borderLeftColor = 'transparent';
    } else if (percentage <= 75) {
      arc.style.borderTopColor = '#3B82F6';
      arc.style.borderRightColor = '#3B82F6';
      arc.style.borderBottomColor = '#3B82F6';
      arc.style.borderLeftColor = 'transparent';
    } else {
      arc.style.borderTopColor = '#3B82F6';
      arc.style.borderRightColor = '#3B82F6';
      arc.style.borderBottomColor = '#3B82F6';
      arc.style.borderLeftColor = '#3B82F6';
    }
  }

  // Reset all arcs to inactive state
  function resetAllArcs() {
    steps.forEach(step => {
      if (step.arc) {
        step.arc.classList.remove('expanded');
        step.arc.style.borderTopColor = 'transparent';
        step.arc.style.borderRightColor = 'transparent';
        step.arc.style.borderBottomColor = 'transparent';
        step.arc.style.borderLeftColor = 'transparent';
        step.arc.style.animation = 'none';
      }
    });
  }

  // Animate arc fill
  function startArcFill(stepIndex) {
    if (progressInterval) {
      clearInterval(progressInterval);
    }

    if (steps[stepIndex].arc) {
      steps[stepIndex].arc.classList.add('expanded');
    }

    fillPercentage = 0;
    const increment = 100 / (transitionDuration / 50); // Update every 50ms

    progressInterval = setInterval(() => {
      fillPercentage += increment;

      if (fillPercentage >= 100) {
        fillPercentage = 100;
        updateArcProgress(stepIndex, fillPercentage);
        clearInterval(progressInterval);

        // After fill completes, transition to next step
        setTimeout(() => {
          cycleSteps();
        }, 300); // Brief delay for visual feedback
      } else {
        updateArcProgress(stepIndex, fillPercentage);
      }
    }, 50);
  }

  // Hide all images
  function hideAllImages() {
    steps.forEach(step => {
      if (step.images.length > 0) {
        step.images.forEach(img => {
          img.classList.add('hidden');
          img.style.opacity = '0';
        });
      }
    });
  }

  // Show specific image with fade-in
  function showImage(stepIndex) {
    hideAllImages();
    if (steps[stepIndex].images.length > 0) {
      steps[stepIndex].images.forEach(img => {
        img.classList.remove('hidden');
        // Trigger reflow to ensure transition works
        void img.offsetWidth;
        img.style.opacity = '1';
      });
    }
  }

  // Auto-cycle through steps
  function cycleSteps() {
    resetAllArcs();
    currentStep = (currentStep + 1) % totalSteps;
    showImage(currentStep);

    // Update mobile step content when cycling
    if (window.innerWidth < 1024) {
      updateMobileStepContent(currentStep);
    }

    startArcFill(currentStep);
  }

  // Handle window resize to reinitialize on breakpoint change
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Reinitialize slider on viewport change
      resetAllArcs();
      currentStep = 0;
      initializeSteps();
      showImage(currentStep);
      startArcFill(currentStep);
    }, 250); // Debounce resize events
  });

  // Initialize and start cycling
  initializeSteps();
  showImage(currentStep);
  if (window.innerWidth < 1024) {
    updateMobileStepContent(currentStep);
  }
  startArcFill(currentStep);
});
