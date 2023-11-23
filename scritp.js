document.addEventListener("DOMContentLoaded", function() {
  const debugMode = false;
  let debugCounter = 3000;

  const colors = ['#9142ff', '#2aff54', '#ffde37', '#ff3737', '#4385ff'];
  const confettiContainer = document.querySelector('.confetti-container');

  const targetDate = new Date(Date.UTC(2023, 11, 1, 17, 0, 0));

  function padNumber(num) {
      return num.toString().padStart(2, '0');
  }

  function createConfetti(animationDelay) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
      confetti.style.animationDelay = animationDelay ? 0 : Math.random() * 2 + 's';
      confettiContainer.appendChild(confetti);

      confetti.addEventListener('animationiteration', () => {
          confetti.remove();
      });
  }

  function updateCountdown() {
      let initialTimeRemaining = debugMode ? debugCounter : targetDate.getTime() - new Date().getTime();
      if (debugMode) {
          debugCounter -= 1000;
      }

      if (initialTimeRemaining <= 0) {
          go();
      } else {
          const days = padNumber(Math.floor(initialTimeRemaining / (1000 * 60 * 60 * 24)));
          const hours = padNumber(Math.floor((initialTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
          const minutes = padNumber(Math.floor((initialTimeRemaining % (1000 * 60 * 60)) / (1000 * 60)));
          const seconds = padNumber(Math.floor((initialTimeRemaining % (1000 * 60)) / 1000));

          document.getElementById('ddhhmmss').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
  }

  // for all you script kiddies out there
  window.go = function() {
      clearInterval(countdownInterval);
      document.getElementById('ddhhmmss').style.display = 'none';
      document.getElementById('play-now').style.display = 'block';

      document.getElementById('countdown').style.color = '#2B2B2B';

      const background = document.getElementById('background');
      let opacity = 0;

      const fadeBackground = setInterval(function() {
          if (opacity >= 1) {
              clearInterval(fadeBackground);
          } else {
              opacity += 0.01;
              background.style.opacity = opacity;
          }
      }, 5);
      for (let i = 0; i < 150; i++) {
          createConfetti(0);
      }
      setInterval(createConfetti, 20);
  }

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  const catImage = document.getElementById('cat-image');
  setInterval(function() {
      catImage.classList.add('bob');
      setTimeout(function() {
          catImage.classList.remove('bob');
      }, 1000);
  }, 3000);
});

// Safari hack
const resizer = () => {
  document.querySelector('body').style.height = window.innerHeight + "px";
}
window.addEventListener("resize", (_e) => resizer());
document.addEventListener("DOMContentLoaded", (_e) => resizer());