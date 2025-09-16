document.addEventListener('DOMContentLoaded', function() {
    // Get all the quote bubbles and the button
    const bubbles = document.querySelectorAll('.chat-bubble');
    const getStartedButton = document.querySelector('.get-started-button');
    const loadingDotsArray = []; // Array to store references to loading dots

    // Create and add loading dots for each bubble
    bubbles.forEach(bubble => {
        const loadingDots = document.createElement('div');
        loadingDots.className = 'chat-loading-dots';
        loadingDots.innerHTML = '<span></span><span></span><span></span>';

        // Insert loading dots before each bubble
        bubble.parentNode.insertBefore(loadingDots, bubble);

        // Store reference to the loading dots
        loadingDotsArray.push(loadingDots);

        // Hide bubbles initially
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(20px)';
        bubble.style.display = 'none';
    });

    // Hide the button initially
    if (getStartedButton) {
        getStartedButton.style.opacity = '0';
        getStartedButton.style.transform = 'translateY(20px)';
        getStartedButton.style.display = 'none';
    }

    // Function to animate bubbles one by one with loading dots
    function animateBubbles() {
        let delay = 500; // Initial delay before starting animations

        // For each bubble, show loading dots first, then the bubble
        bubbles.forEach((bubble, index) => {
            const loadingDots = loadingDotsArray[index]; // Get the corresponding loading dots

            // Show loading dots
            setTimeout(() => {
                loadingDots.style.display = 'flex';
            }, delay);

            // Hide loading dots and show bubble after 1.5 seconds
            setTimeout(() => {
                loadingDots.style.display = 'none';
                bubble.style.display = 'block';
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateY(0)';
            }, delay + 1500);

            delay += 2500; // Total delay for each bubble (1.5s for dots + 1s gap)
        });

        // Show the button after all bubbles
        if (getStartedButton) {
            setTimeout(() => {
                getStartedButton.style.display = 'block';
                getStartedButton.style.opacity = '1';
                getStartedButton.style.transform = 'translateY(0)';
            }, delay);
        }
    }

    // Start animation after a 1-second delay
    setTimeout(animateBubbles, 1000);
});
