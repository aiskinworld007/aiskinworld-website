'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  menuButton?.addEventListener('click', () => {
    const open = mobileMenu?.classList.toggle('open') ?? false;
    menuButton.setAttribute('aria-expanded', String(open));
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const viewport = slider.querySelector('.slider-viewport');
    const track = slider.querySelector('.slider-track');
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    const dots = slider.querySelector('.slider-dots');
    if (!viewport || !track || !dots || slides.length === 0) return;

    let index = 0;
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    function go(newIndex) {
      index = (newIndex + slides.length) % slides.length;
      track.style.transform = `translate3d(-${index * 100}%,0,0)`;
      Array.from(dots.children).forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to reel ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dots.appendChild(dot);
    });

    prev?.addEventListener('click', () => go(index - 1));
    next?.addEventListener('click', () => go(index + 1));
    viewport.addEventListener('pointerdown', (event) => {
      dragging = true;
      startX = event.clientX;
      deltaX = 0;
    });
    viewport.addEventListener('pointermove', (event) => {
      if (dragging) deltaX = event.clientX - startX;
    });
    viewport.addEventListener('pointerup', () => {
      if (dragging && Math.abs(deltaX) > 55) go(index + (deltaX < 0 ? 1 : -1));
      dragging = false;
    });
    viewport.addEventListener('pointercancel', () => { dragging = false; });
    go(0);
  });

  // Accurate 10-minute countdown, based on timestamps so it cannot freeze or drift.
  const minutesNode = document.getElementById('timerMinutes');
  const secondsNode = document.getElementById('timerSeconds');
  if (minutesNode && secondsNode) {
    const durationMs = 10 * 60 * 1000;
    let endAt = Date.now() + durationMs;

    function updateCountdown() {
      let remaining = Math.max(0, endAt - Date.now());
      if (remaining <= 0) {
        endAt = Date.now() + durationMs;
        remaining = durationMs;
      }
      const totalSeconds = Math.ceil(remaining / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      minutesNode.textContent = String(minutes).padStart(2, '0');
      secondsNode.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    window.setInterval(updateCountdown, 250);
  }
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('pageshow', () => {
  if (!location.hash) window.scrollTo(0, 0);
});
