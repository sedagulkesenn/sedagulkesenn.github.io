    document.addEventListener("DOMContentLoaded", () => {
      const imgs = document.querySelectorAll("img.blur-up");
      imgs.forEach(img => {
        const fullImg = new Image();
        fullImg.src = img.src;
        fullImg.onload = () => {
          img.src = fullImg.src;
          img.classList.add("loaded");
        };
      });
    });