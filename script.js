let bootCompleted = false;

// =======================================
// 1. RETRO BOOT SEQUENCE
// =======================================
function runBootSequence() {
  const step1 = document.getElementById('boot-step-1');
  const step2 = document.getElementById('boot-step-2');
  const step3 = document.getElementById('boot-step-3');

  setTimeout(() => {
    if (!bootCompleted) step1.textContent = "> ESTABLISHING NASA SATELLITE UPLINK... OK";
  }, 800);

  setTimeout(() => {
    if (!bootCompleted) step2.textContent = "> MOUNTING DESKTOP MODULES [3/3]... OK";
  }, 1600);

  setTimeout(() => {
    if (!bootCompleted) step3.textContent = "> SYSTEM READY. LAUNCHING LOCK SCREEN...";
  }, 2400);

  setTimeout(() => {
    if (!bootCompleted) finishBoot();
  }, 3200);
}

function skipBoot() {
  if (!bootCompleted) {
    finishBoot();
  }
}

function finishBoot() {
  bootCompleted = true;
  const bootScreen = document.getElementById('boot-screen');
  const lockScreen = document.getElementById('lock-screen');

  bootScreen.classList.add('fade-out');

  setTimeout(() => {
    bootScreen.classList.add('hidden');
    lockScreen.classList.remove('hidden');
  }, 600);
}

// Start Boot Sequence on Load
window.addEventListener('load', runBootSequence);


// =======================================
// 2. LOCK SCREEN CLOCK & UNLOCK LOGIC
// =======================================
function updateClocks() {
  const now = new Date();

  // Time String
  const timeString = now.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  // Date String
  const dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  const dateString = now.toLocaleDateString('en-US', dateOptions).toUpperCase();

  // Update DOM
  document.getElementById('lock-clock').textContent = timeString;
  document.getElementById('lock-date').textContent = dateString;
  document.getElementById('clock').textContent = timeString;
}

setInterval(updateClocks, 1000);
updateClocks();

function unlockSystem() {
  const lockScreen = document.getElementById('lock-screen');
  if (!lockScreen.classList.contains('unlocked')) {
    lockScreen.classList.add('unlocked');
  }
}

// Global Keyboard Trigger to Unlock
document.addEventListener('keydown', (e) => {
  if (bootCompleted) {
    unlockSystem();
  } else {
    skipBoot();
  }
});
