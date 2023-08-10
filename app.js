const count = 10;
const apiKey = "YOUR_API_KEY";
const unsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContaner = document.querySelector('.image-contaner');
const loader = document.querySelector('.loader');
let photosArray = [];
let ready = false;
let loadedImages = 0;
let totalImages = 0;

// checking if all have loaded
function imageLoaded () {
    loadedImages++;
    if (loadedImages == totalImages){
        ready = true;
        loader.hidden = true;
    };
};

// Creating link, image, and put it in the image contaner
function displayImages () {
    photosArray.forEach((image) => {
        loadedImages = 0;
        totalImages = photosArray.length;

        // Creating the link tag.
        const link = document.createElement("a");
        link.setAttribute('href', image.links.html);
        link.setAttribute('target', '_blank');

        // Createing image tag.
        const img = document.createElement('img');
        img.setAttribute('src', image.urls.regular);
        img.setAttribute('alt', image.alt_description);
        img.setAttribute('title', image.alt_description);
        img.addEventListener('load', imageLoaded);
        
        // Putting img <img> in inside link <a>, and both inside the image contaner. 
        link.appendChild(img);
        imageContaner.append(link);
    });
};

// getting images form unsplash api
async function getPhotos () {
    try {
        const response = await fetch(unsplashAPI);
        photosArray = await response.json();
        displayImages();    
    }
    catch (err){ 
        alert(err);
    };
};


// Checking if the user scrolled near to bottom.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    };
});
 
getPhotos();