document.addEventListener("DOMContentLoaded", () => {
  // Instagram sizes embeds wrongly inside a closed section, so wait for a click to load them
  document.querySelectorAll(".fold").forEach((fold) => {
    fold.addEventListener("toggle", () => {
      if (!fold.open || !fold.querySelector(".instagram-media")) return;
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else if (!document.getElementById("instagram-embed")) {
        const script = document.createElement("script");
        script.id = "instagram-embed";
        script.src = "https://www.instagram.com/embed.js";
        script.onload = () => window.instgrm.Embeds.process();
        document.body.append(script);
      }
    });
  });

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
