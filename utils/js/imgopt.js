



(function ($) {


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
      img.src = cleanUrl(img.src);

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


function cleanUrl(url) {
  const regex = `/e_blur:200%2Cq_auto%2Cf_auto%2Cw_330%2Ch_440`; // hosting
  // const regex2 = `/e_blur:200,q_auto,f_auto,w_330,h_440`; // local testing
  return url.replace(regex, '');
}})(jQuery);
