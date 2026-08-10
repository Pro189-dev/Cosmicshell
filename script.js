let bootCompleted = false;

// =======================================
// 1. GRAPHICAL BOOT SEQUENCE
// =======================================
function runBootSequence() {
  // Wait 3.5 seconds to match the CSS loading bar animation, then finish boot
  setTimeout(() => {
    if (!bootCompleted) finishBoot();
  }, 3500);
}

function finishBoot() {
  bootCompleted = true;
  const bootScreen = document.getElementById('boot-screen');
  const lockScreen = document.getElementById('lock-screen');

  // FIX: Unhide the lock screen *before* the boot screen fades out
  // This ensures it is sitting directly behind the loading screen
  lockScreen.classList.remove('hidden');

  // Now, tell the boot screen to fade away smoothly
  bootScreen.classList.add('fade-out');

  // Wait 800ms for the fade-out CSS transition before hiding the boot screen completely
  setTimeout(() => {
    bootScreen.classList.add('hidden');
  }, 800); 
}

// Start Boot Sequence on Load
window.addEventListener('load', runBootSequence);


// =======================================
// 2. LOCK SCREEN CLOCK LOGIC
// =======================================
function updateClocks() {
  const now = new Date();

  // Time format: "10:48 PM"
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true
  });

  // Date format: "MONDAY, OCTOBER 27"
  const dateString = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  }).toUpperCase();

  // Update DOM
  document.getElementById('lock-clock').textContent = timeString;
  document.getElementById('lock-date').textContent = dateString;
  
  // Update desktop top bar clock if it exists
  const desktopClock = document.getElementById('clock');
  if (desktopClock) desktopClock.textContent = timeString;
}

setInterval(updateClocks, 1000);
updateClocks();


// =======================================
// 3. AUTHENTICATION & LOGIN ANIMATION
// =======================================
function triggerUnlock() {
  const btn = document.getElementById('unlock-btn');
  const statusMsg = document.getElementById('login-status');
  
  // Prevent running the animation twice if they click multiple times
  if (btn.classList.contains('authenticating') || btn.classList.contains('granted')) return;

  // 1. Start the "Biometric Scan" Animation
  btn.classList.add('authenticating');
  btn.textContent = "[ AUTHENTICATING... ]";
  statusMsg.textContent = "Verifying bio-signature...";

  // 2. Grant Access after 1.2 seconds
  setTimeout(() => {
    btn.classList.remove('authenticating');
    btn.classList.add('granted');
    btn.textContent = "[ ACCESS GRANTED ]";
    
    statusMsg.textContent = "Welcome back, Captain.";
    statusMsg.style.color = "#00ff00"; // Turns text neon green
    
    // 3. Finally, slide the lock screen away after 0.8 seconds
    setTimeout(() => {
      unlockSystem();
    }, 800);

  }, 1200);
}

function unlockSystem() {
  const lockScreen = document.getElementById('lock-screen');
  if (!lockScreen.classList.contains('unlocked')) {
    lockScreen.classList.add('unlocked');
  }
}

// Global Keyboard Trigger to Unlock
document.addEventListener('keydown', (e) => {
  // Only trigger the unlock animation if the boot sequence is finished and the user presses 'Enter'
  if (e.key === 'Enter') {
    if (bootCompleted) triggerUnlock();
  }
});
