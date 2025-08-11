(() => {
  const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300"
  ];

  function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${url}`);
    });
  }

  async function downloadImages(urls) {
    const loadingDiv = document.getElementById("loading");
    const errorDiv = document.getElementById("error");
    const outputDiv = document.getElementById("output");

    loadingDiv.style.display = "block";
    errorDiv.textContent = "";
    outputDiv.innerHTML = "";

    try {
      const images = await Promise.all(urls.map(downloadImage));
      loadingDiv.style.display = "none";
      images.forEach(img => outputDiv.appendChild(img));
    } catch (error) {
      loadingDiv.style.display = "none";
      errorDiv.textContent = error;
    }
  }

  document.getElementById("download-images-button")
    .addEventListener("click", () => downloadImages(imageUrls));
})();
