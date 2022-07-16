const fileInput = document.querySelector('.file-input')
const chooseImgBtn = document.querySelector('.choose-img');
const previewImg = document.querySelector('.preview-img img');
const filterOptions = document.querySelectorAll('.filter button');
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector('.slider input');


let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;

function loadImage() {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => {
        document.querySelector('.container').classList.remove('disable');
    })
}

filterOptions.forEach(option => {
    option.addEventListener('click', () => {
        document.querySelector(".filter .active").classList.remove('active');
        option.classList.add('active');
        filterName.textContent = option.textContent;
        if (option.id === 'brightness') {
            filterSlider.max = '200';
            filterSlider.value = brightness;
            filterValue.textContent = `${brightness}%`
        } else if (option.id === 'saturation') {
            filterSlider.max = '200';
            filterSlider.value = saturation
            filterValue.textContent = `${saturation}%`
        } else if (option.id === 'inversion') {
            filterSlider.max = '100'
            filterSlider.value = inversion
            filterValue.textContent = `${inversion}%`
        } else {
            filterSlider.max = '100';
            filterSlider.value = grayscale;
            filterValue.textContent = `${grayscale}%`
        }
    })
})


function updateFilter() {
    filterValue.textContent = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active');

    if (selectedFilter.id === 'brightness') {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === 'saturation') {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === 'inversion') {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
}

fileInput.addEventListener('change', loadImage)
chooseImgBtn.addEventListener('click', () => fileInput.click())
filterSlider.addEventListener('input', updateFilter);