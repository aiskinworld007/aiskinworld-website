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
