



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

      loadedCount++;
      if (loadedCount === imgs.length && loader) {
        loader.classList.add("d-none");
      }

      img.src = cleanUrl(img.src);

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
  const regex = `/e_blur:200%2Cq_auto%2Cf_auto`; //hosting
  //const regex = `/e_blur:200,q_auto,f_auto,w_20,h_20`; // local testing
  return url.replace(regex, '/f_auto,q_auto');
}})(jQuery);
