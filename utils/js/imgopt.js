document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");
  const imgs = document.querySelectorAll("img.blur-up");
  let loadedCount = 0;

  if (imgs.length === 0) {
    // no images, hide loader immediately
    if (loader) {
        loader.style.display = "none";
    }
    return;
  }

  imgs.forEach(img => {
    const fullSrc = img.src;
    if (!fullSrc) {
      loadedCount++;
      return;
    }

    const fullImg = new Image();
    fullImg.src = fullSrc;

    fullImg.onload = () => {
      img.src = fullImg.src;
      img.classList.add("loaded");

      loadedCount++;
      if (loadedCount === imgs.length && loader) {
        // loader.style.display = "none"; // hide loader when all done
        loader.classList.add("d-none");
      }
    };

    fullImg.onerror = () => {
      loadedCount++;
      if (loadedCount === imgs.length && loader) {
        loader.style.display = "none"; // still hide loader even if error
      }
    };
  });
});