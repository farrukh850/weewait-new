// Circular Step Loader with Progressive Arc Fill and Image Transitions
document.addEventListener('DOMContentLoaded', function() {
  const steps = [
    { element: document.querySelector('.step-one'), image: document.querySelector('.step-one-image'), arc: null },
    { element: document.querySelector('.step-two'), image: document.querySelector('.step-two-image'), arc: null },
    { element: document.querySelector('.step-three'), image: document.querySelector('.step-three-image'), arc: null },
    { element: document.querySelector('.step-four'), image: document.querySelector('.step-four-image'), arc: null }
  ];

  let currentStep = 0;
  const totalSteps = steps.length;
  const transitionDuration = 4000; // 3 seconds per step
  let progressInterval = null;
  let fillPercentage = 0;

  // Initialize steps and get arc loaders
  function initializeSteps() {
    // Get all arc loaders
    steps.forEach((step, index) => {
      if (step.element) {
        step.arc = step.element.querySelector('.arc-loader');
      }
    });

    // Show first image
    if (steps[0].image) {
      steps[0].image.classList.remove('hidden');
      steps[0].image.style.opacity = '1';
      steps[0].image.style.transition = 'opacity 0.5s ease-in-out';
    }

    // Hide all other images
    for (let i = 1; i < totalSteps; i++) {
      if (steps[i].image) {
        steps[i].image.classList.add('hidden');
        steps[i].image.style.opacity = '0';
        steps[i].image.style.transition = 'opacity 0.5s ease-in-out';
      }
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

    // Add expanded class to start the transition
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
      if (step.image) {
        step.image.classList.add('hidden');
        step.image.style.opacity = '0';
      }
    });
  }

  // Show specific image with fade-in
  function showImage(stepIndex) {
    hideAllImages();
    if (steps[stepIndex].image) {
      steps[stepIndex].image.classList.remove('hidden');
      // Trigger reflow to ensure transition works
      void steps[stepIndex].image.offsetWidth;
      steps[stepIndex].image.style.opacity = '1';
    }
  }

  // Auto-cycle through steps
  function cycleSteps() {
    resetAllArcs();
    currentStep = (currentStep + 1) % totalSteps;
    showImage(currentStep);
    startArcFill(currentStep);
  }

  // Initialize and start cycling
  initializeSteps();
  showImage(currentStep);
  startArcFill(currentStep);
});

