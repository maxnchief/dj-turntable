// Function to start the splash screen animation and hide after timeout
function startSplashScreen() {
  const splash = document.getElementById('splash-screen');

  // Wait for 4 seconds before starting the fade out
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none'; // Remove the splash screen after the fade
    }, 1000); // Fade duration
  }, 4000); // Duration before fade out
}

// Call startSplashScreen when the page loads
window.onload = startSplashScreen;
