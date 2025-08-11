// Array of image URLs
const imageUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://invalid-url.com/404.jpg" // Example bad URL
];

// Function to download one image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Function to handle downloading all images
async function downloadImages(urls) {
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");

  // Reset UI
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  outputDiv.innerHTML = "";

  try {
    // Download all images in parallel
    const images = await Promise.all(urls.map(downloadImage));

    // Hide loading spinner
    loadingDiv.style.display = "none";

    // Display images
    images.forEach(img => outputDiv.appendChild(img));
  } catch (error) {
    // Hide loading spinner
    loadingDiv.style.display = "none";

    // Show error message
    errorDiv.textContent = error;
  }
}

// Start download
downloadImages(imageUrls);
