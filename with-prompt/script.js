// DOM Elements
const imageUpload = document.getElementById('imageUpload');
const beforeImage = document.getElementById('beforeImage');
const afterImage = document.getElementById('afterImage');
const slider = document.querySelector('.slider');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const saturationInput = document.getElementById('saturation');
const resetBtn = document.getElementById('resetBtn');

let isDragging = false;

// Event Listeners
imageUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            beforeImage.src = e.target.result;
            afterImage.src = e.target.result;
            beforeImage.style.display = 'block';
            afterImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Slider Drag Functionality
slider.addEventListener('mousedown', () => {
    isDragging = true;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const containerRect = document.querySelector('.image-container').getBoundingClientRect();
        const offsetX = e.clientX - containerRect.left;
        const percentage = (offsetX / containerRect.width) * 100;
        slider.style.left = `${percentage}%`;
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    }
});

// Apply Filters
function applyFilters() {
    const brightness = brightnessInput.value;
    const contrast = contrastInput.value;
    const saturation = saturationInput.value;
    afterImage.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
}

brightnessInput.addEventListener('input', applyFilters);
contrastInput.addEventListener('input', applyFilters);
saturationInput.addEventListener('input', applyFilters);

// Reset Filters
resetBtn.addEventListener('click', () => {
    brightnessInput.value = 100;
    contrastInput.value = 100;
    saturationInput.value = 100;
    applyFilters();
});