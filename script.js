// Splash screen logic
function startSplashScreen() {
  const splash = document.getElementById('splash-screen');

  // Wait for 4 seconds, then start fade out
  setTimeout(() => {
    splash.classList.add('fade-out');

    // After fade-out animation ends (1 second), hide splash and redirect
    setTimeout(() => {
      splash.style.display = 'none';

      // Redirect to main menu
      window.location.href = "menu.html";
    }, 1000); // matches CSS fade-out transition duration
  }, 4000); // how long splash screen stays visible
}

// Run splash logic on window load
window.onload = startSplashScreen;
