// DOM Elements
const imageUpload = document.getElementById('imageUpload');
const beforeImage = document.getElementById('beforeImage');
const afterImage = document.getElementById('afterImage');
const enhanceBtn = document.getElementById('enhanceBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Event Listeners
imageUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            beforeImage.src = e.target.result;
            beforeImage.style.display = 'block';
            enhanceBtn.disabled = false; // Enable enhance button
        };
        reader.readAsDataURL(file);
    }
});

enhanceBtn.addEventListener('click', function () {
    if (beforeImage.src) {
        // Simulate enhancement using CSS filters
        afterImage.src = beforeImage.src;
        afterImage.style.filter = 'brightness(1.2) contrast(1.2) saturate(1.5)';
        afterImage.style.display = 'block';

        // Enable download button
        downloadBtn.href = afterImage.src;
        downloadBtn.style.display = 'inline-block';
    } else {
        alert('Please upload an image first.');
    }
});