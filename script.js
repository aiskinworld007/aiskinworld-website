const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav a")];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${visible.target.id}`
      );
    });
  },
  { threshold: [0.2, 0.45, 0.7] }
);

sections.forEach((section) => observer.observe(section));


// Ten-minute session offer window.
// The Razorpay amount is controlled separately inside Razorpay.
const countdownElement = document.getElementById("countdown");
const offerTimer = document.getElementById("offerTimer");
const mainBuyNow = document.getElementById("mainBuyNow");

if (countdownElement && offerTimer) {
  const storageKey = "aiSkinWorldOfferEndsAt";
  const tenMinutes = 10 * 60 * 1000;
  let endsAt = Number(sessionStorage.getItem(storageKey));

  if (!endsAt || endsAt <= Date.now()) {
    endsAt = Date.now() + tenMinutes;
    sessionStorage.setItem(storageKey, String(endsAt));
  }

  const updateCountdown = () => {
    const remaining = Math.max(0, endsAt - Date.now());
    const totalSeconds = Math.ceil(remaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    countdownElement.textContent =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (remaining <= 0) {
      offerTimer.classList.add("is-ended");
      offerTimer.querySelector(".offer-timer__label").textContent =
        "Offer window ended — check current checkout price";
      countdownElement.textContent = "00:00";
      if (mainBuyNow) mainBuyNow.querySelector("span").textContent = "↗";
      clearInterval(timerInterval);
    }
  };

  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);
}

// Pause pulse after interaction so it does not distract during checkout.
document.querySelectorAll(".buy-now-pulse, .sticky-buy__button").forEach((button) => {
  button.addEventListener("click", () => {
    button.style.animation = "none";
  });
});


// Keep the sticky checkout bar from covering the hero photo or main Buy Now button.
const stickyBuyBar = document.getElementById("stickyBuy");
const primaryBuyButton = document.getElementById("mainBuyNow");

if (stickyBuyBar && primaryBuyButton && "IntersectionObserver" in window) {
  const stickyObserver = new IntersectionObserver(
    ([entry]) => {
      stickyBuyBar.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.15 }
  );

  stickyObserver.observe(primaryBuyButton);
}

// Happy Customers: show Instagram reels one at a time with arrows, dots and swipe.
(() => {
  const slider = document.querySelector('.reel-slider');
  if (!slider) return;

  const track = slider.querySelector('.reel-slider__track');
  const slides = [...slider.querySelectorAll('.reel-slide')];
  const prev = slider.querySelector('.reel-slider__arrow--prev');
  const next = slider.querySelector('.reel-slider__arrow--next');
  const dotsWrap = document.querySelector('.reel-slider__dots');
  let index = 0;
  let startX = 0;
  let deltaX = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'reel-slider__dot';
    dot.setAttribute('aria-label', `Show reel ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap?.appendChild(dot);
    return dot;
  });

  function goTo(newIndex) {
    index = Math.max(0, Math.min(slides.length - 1, newIndex));
    track.style.transform = `translateX(-${index * 100}%)`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));

  track?.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    deltaX = 0;
  }, { passive: true });
  track?.addEventListener('touchmove', (event) => {
    deltaX = event.touches[0].clientX - startX;
  }, { passive: true });
  track?.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 55) goTo(index + (deltaX < 0 ? 1 : -1));
  });

  goTo(0);
})();
