// Custom dropdown toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons
  const filterButtons = document.querySelectorAll('.filter-button');

  // Initialize dropdowns - hide all by default
  filterButtons.forEach(button => {
    const dropdown = button.querySelector('.filter-dropdown');
    const caretIcon = button.querySelector('img[src*="caret"]');

    if (dropdown) {
      // Set initial state to closed
      dropdown.style.opacity = '0';
      dropdown.style.maxHeight = '0';
      dropdown.style.pointerEvents = 'none';

      if (caretIcon) {
        caretIcon.style.transform = 'rotate(0deg)';
      }
    }
  });

  // Add click event listener to each filter button
  filterButtons.forEach(button => {
    const dropdown = button.querySelector('.filter-dropdown');
    const caretIcon = button.querySelector('img[src*="caret"]');

    // Toggle dropdown on button click
    button.addEventListener('click', function(e) {
      e.stopPropagation();

      // Close all other dropdowns first
      document.querySelectorAll('.filter-dropdown').forEach(d => {
        if (d !== dropdown) {
          d.style.opacity = '0';
          d.style.maxHeight = '0';
          d.style.pointerEvents = 'none';

          // Reset all other caret icons
          const parentButton = d.closest('.filter-button');
          if (parentButton) {
            const otherCaret = parentButton.querySelector('img[src*="caret"]');
            if (otherCaret) {
              otherCaret.style.transform = 'rotate(0deg)';
            }
          }
        }
      });

      // Toggle current dropdown
      if (dropdown) {
        const isOpen = dropdown.style.opacity === '1';

        dropdown.style.opacity = isOpen ? '0' : '1';
        dropdown.style.maxHeight = isOpen ? '0' : '220px';
        dropdown.style.pointerEvents = isOpen ? 'none' : 'auto';

        // Rotate caret icon
        if (caretIcon) {
          caretIcon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      }
    });

    // Handle item selection in the dropdown
    const dropdownItems = button.querySelectorAll('.filter-dropdown li');
    dropdownItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.stopPropagation();

        // Highlight the selected item and remove highlight from others
        dropdownItems.forEach(li => {
          li.classList.remove('bg-accent_skyblue/10');
          const checkIcon = li.querySelector('img[src*="blue-check"]');
          if (checkIcon) {
            checkIcon.classList.add('hidden');
            checkIcon.classList.remove('block');
          }
        });

        // Add highlight to clicked item
        item.classList.add('bg-accent_skyblue/10');
        const checkIcon = item.querySelector('img[src*="blue-check"]');
        if (checkIcon) {
          checkIcon.classList.remove('hidden');
          checkIcon.classList.add('block');
        }

        // Get the text of the selected item (without the check icon text)
        const selectedText = item.textContent.trim();

        // Update the button text with the selected value
        const buttonText = button.querySelector('p');
        if (buttonText) {
          buttonText.textContent = selectedText;
        }

        // Close the dropdown
        if (dropdown) {
          setTimeout(() => {
            dropdown.style.opacity = '0';
            dropdown.style.maxHeight = '0';
            dropdown.style.pointerEvents = 'none';

            // Reset caret icon
            if (caretIcon) {
              caretIcon.style.transform = 'rotate(0deg)';
            }
          }, 150); // Small delay for better UX
        }
      });
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener('click', function() {
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
      dropdown.style.opacity = '0';
      dropdown.style.maxHeight = '0';
      dropdown.style.pointerEvents = 'none';

      // Reset all caret icons
      const parentButton = dropdown.closest('.filter-button');
      if (parentButton) {
        const caret = parentButton.querySelector('img[src*="caret"]');
        if (caret) {
          caret.style.transform = 'rotate(0deg)';
        }
      }
    });
  });
});

