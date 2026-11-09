document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const prevBtn = carousel.querySelector(".carousel-arrow--prev");
    const nextBtn = carousel.querySelector(".carousel-arrow--next");
    const firstSlide = track.querySelector(".carousel-slide");

    function slideStep() {
      const trackGap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return firstSlide.getBoundingClientRect().width + trackGap;
    }

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -slideStep(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: slideStep(), behavior: "smooth" });
    });
  });
});
