document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.querySelector('.intro-screen');
    const loadingFill = document.querySelector('.loading-fill');
    const mainApp = document.querySelector('.main-app');
    const navLinks = document.querySelectorAll('.main-nav a');
    const contentSections = document.querySelectorAll('.content-section');

    let loadingProgress = 0;
    const totalLoadingTime = 3000; // 3 seconds for the intro animation
    const updateInterval = 50; // Update every 50ms

    // --- Intro Animation Logic ---
    function animateLoadingBar() {
        const intervalId = setInterval(() => {
            loadingProgress += (updateInterval / totalLoadingTime) * 100; // Calculate percentage
            if (loadingProgress <= 100) {
                loadingFill.style.width = `${loadingProgress}%`;
            }

            if (loadingProgress >= 100) {
                clearInterval(intervalId);
                setTimeout(() => {
                    hideIntroScreen();
                }, 500); // Small delay after fill completes before hiding
            }
        }, updateInterval);
    }

    function hideIntroScreen() {
        introScreen.classList.add('hidden'); // Trigger CSS fade-out
        introScreen.addEventListener('transitionend', () => {
            introScreen.style.display = 'none'; // Completely remove from layout after transition
            mainApp.classList.remove('hidden'); // Show the main app
        }, { once: true }); // Ensure the event listener runs only once
    }

    // Start the loading animation when the script loads
    animateLoadingBar();


    // --- Section Navigation Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior (page refresh)

            // Remove 'active' from all links and content sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add 'active' to the clicked link
            link.classList.add('active');

            // Show the corresponding content section
            const targetSectionId = link.dataset.section + '-section';
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Ensure initial section (Notes) is active on app load
    // This is important if you refresh the page or load directly into the main app
    if (!mainApp.classList.contains('hidden')) {
        const initialSection = document.querySelector('.main-nav a.active');
        if (initialSection) {
            const targetSectionId = initialSection.dataset.section + '-section';
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        } else {
            // Fallback: If no active link is set in HTML, activate 'notes' by default
            document.querySelector('.main-nav a[data-section="notes"]').click();
        }
    }
});
