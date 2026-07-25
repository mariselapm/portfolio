document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    if (caption) {
      lightboxCaption.textContent = caption;
      lightboxCaption.hidden = false;
    } else {
      lightboxCaption.textContent = "";
      lightboxCaption.hidden = true;
    }
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    lightboxCaption.textContent = "";
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const full = item.getAttribute("data-full");
      const alt = item.querySelector("img").alt;
      const caption = item.getAttribute("data-caption") || "";
      openLightbox(full, alt, caption);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-content")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});
