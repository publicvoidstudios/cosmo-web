let imagesPool = [
    './resources/collage/img_1.jpg',
    './resources/collage/img_2.jpg',
    './resources/collage/img_3.jpg',
    './resources/collage/img_4.jpg',
    './resources/collage/img_5.jpg',
    './resources/collage/img_6.jpg',
    './resources/collage/img_7.jpg',
    './resources/collage/img_8.jpg',
    './resources/collage/img_9.jpg',
    './resources/collage/img_10.jpg',
    './resources/collage/img_11.jpg',
    './resources/collage/img_12.jpg',
    './resources/collage/img_13.jpg'
];

let collageImgObjects = document.querySelectorAll('.collage-img');

function getRandomUnusedImage(images, usedImages) {
    const availableImages = images.filter(image => !usedImages.includes(image));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return availableImages[randomIndex];
}

const usedImages = [];

function changeRandomImage() {
    const randomIndex = Math.floor(Math.random() * collageImgObjects.length);
    const randomImg = collageImgObjects[randomIndex];

    const currentOpacity = parseFloat(randomImg.style.opacity);

    if (currentOpacity === 1) {
        // Start fade out
        fade(randomImg, 1, 0, 500, function() {
            swapImageSource(randomImg, randomIndex);
            // Start fade in
            fade(randomImg, 0, 1, 500);
        });
    } else {
        swapImageSource(randomImg, randomIndex);
        // Start fade in
        fade(randomImg, 0, 1, 500);
    }
}

function swapImageSource(randomImg, randomIndex) {
    const currentImage = randomImg.getAttribute('src');
    const unusedImage = getRandomUnusedImage(imagesPool, usedImages);

    usedImages[randomIndex] = unusedImage;
    imagesPool[imagesPool.indexOf(unusedImage)] = currentImage;

    randomImg.setAttribute('src', unusedImage);
}

function fade(element, startOpacity, endOpacity, duration, callback) {
    const startTime = performance.now();

    function updateOpacity() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = elapsed / duration;
        const opacity = lerp(startOpacity, endOpacity, progress);

        element.style.opacity = opacity;

        if (progress < 1) {
            requestAnimationFrame(updateOpacity);
        } else {
            if (callback) {
                callback();
            }
        }
    }

    updateOpacity();
}

function lerp(start, end, progress) {
    return start + (end - start) * progress;
}

collageImgObjects.forEach((img, index) => {
    const randomImage = getRandomUnusedImage(imagesPool, usedImages);

    usedImages[index] = randomImage;
    img.setAttribute('src', randomImage);
});

setInterval(changeRandomImage, 5000);