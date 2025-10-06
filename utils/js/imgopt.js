document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");
  const imgs = document.querySelectorAll("img.blur-up");
  let loadedCount = 0;

  const regex = /e_blur:200,q_auto,f_auto,w_330,h_440/;

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
      img.src = img.src.replace(regex, "e_blur:0,q_auto,f_auto");

      loadedCount++;
      if (loadedCount === imgs.length && loader) {
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