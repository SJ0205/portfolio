

//index slider
const slide = document.querySelectorAll('.slide');
const slidePager = document.querySelectorAll('.slide-pager');
const slideArrow = document.querySelectorAll('.slide-arrow');
let slideIndex = 0;
let mySlide;

let x = window.innerWidth;
let y = window.scrollYOffset;


//index slide
function slideReset() {
    for (let i = 0; i < slide.length; i++) {
        slide[i].classList.remove('active');
        slidePager[i].classList.remove('active');
    }
}

function slideAni() {
    slideReset();
    slideIndex++;
    if (slideIndex > slide.length) {
        slideIndex = 1;
    }
    slide[slideIndex - 1].classList.add('active');
    slidePager[slideIndex - 1].classList.add('active');
    mySlide = setTimeout(slideAni, 3500);
}

slideAni();

function slidePagerAni(num) {
    clearTimeout(mySlide);
    slideReset();
    slideIndex = num;
    slide[slideIndex - 1].classList.add('active');
    slidePager[slideIndex - 1].classList.add('active');
    mySlide = setTimeout(slideAni, 3500);
}

function slideArrowAni(num) {
    clearTimeout(mySlide);
    slideReset();
    slideIndex += num;
    if (slideIndex > slide.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slide.length;
    }
    slide[slideIndex - 1].classList.add('active');
    slidePager[slideIndex - 1].classList.add('active');
    mySlide = setTimeout(slideAni, 3500);
}

//main store height
function mainStoreHeight() {
    const mainStoreWrap = document.querySelector('.store-content-wrap');
    const businessTextWrap = document.querySelector('.business-text');
    mainStoreWrap.style.height = `${businessTextWrap.scrollHeight}px`;
}


window.addEventListener('load', () => {

    let x = window.innerWidth;
    let y = window.scrollYOffset;

    //PC,Mobile Check
    viewportCheck();

    //main store height
    mainStoreHeight();
});

window.addEventListener('resize', () => {
    let x = window.innerWidth;

    //pc,mobile 체크
    viewportCheck();

    //main store height
    mainStoreHeight();
});

window.addEventListener('scroll', () => {
    let y = window.scrollY;

    //menu fixed
    if (y > 70) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    };
});