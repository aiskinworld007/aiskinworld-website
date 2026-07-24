// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Buy Now Button
const buyBtn = document.querySelector(".buy");

if (buyBtn) {
  buyBtn.addEventListener("click", function () {
    window.open("https://wa.me/919624821373?text=Hi%20Ai%20Skin%20World,%20I%20want%20to%20buy%20your%20Face%20Wash.", "_blank");
  });
}

// Fade animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".card").forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "0.6s";
  observer.observe(card);
});
