const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
menuButton.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));

const track = document.querySelector('.reel-track');
const slides = [...document.querySelectorAll('.reel-slide')];
const dots = [...document.querySelectorAll('.reel-dots button')];
const prev = document.querySelector('.reel-prev');
const next = document.querySelector('.reel-next');
let reelIndex = 0;
let touchStartX = 0;

function showReel(index) {
  reelIndex = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${reelIndex * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === reelIndex));
  slides.forEach((slide, i) => slide.classList.toggle('active', i === reelIndex));
}

prev?.addEventListener('click', () => showReel(reelIndex - 1));
next?.addEventListener('click', () => showReel(reelIndex + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showReel(i)));
track?.addEventListener('touchstart', event => { touchStartX = event.touches[0].clientX; }, { passive: true });
track?.addEventListener('touchend', event => {
  const change = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(change) > 45) showReel(reelIndex + (change < 0 ? 1 : -1));
}, { passive: true });
showReel(0);
