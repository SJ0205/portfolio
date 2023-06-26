const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navMainLink = document.querySelectorAll('.main-link');
const navSubLink = document.querySelectorAll('.sub-link');
const navMainLinkDel = document.querySelectorAll('.slide-nav-link-d');
const mobileMenuBar = document.querySelector('.bx-menu');
const mobileMenuBarCancle = document.querySelector('.menu-x-icon');

let x = window.innerWidth;
let y = window.scrollYOffset;


function viewportCheck(){
    let x = window.innerWidth;
    const mobileMenuList = document.querySelectorAll('.main-link');
    const mobileMenuListArrow = document.querySelectorAll('.menu-arrow');
    
    if (x > 1000) {
        header.setAttribute('id', 'pc-view');
        for (let i = 0; i < navMainLinkDel.length; i++) {
            navMainLinkDel[i].href = `${navMainLinkDel_herf[i]}`;
        };

    } else {
        header.setAttribute('id', 'mobile-view');

        for (let i = 0; i < navMainLinkDel.length; i++) {
            navMainLinkDel[i].href = "#none";
        };

        navMainLink.forEach((mainLink, index) => {
            mainLink.addEventListener('click', () => {
                navSubLink[index].classList.toggle('active');
                mobileMenuListArrow[index].classList.toggle('active');
            });
        });

    };
}

//mobileMenu 클릭이벤트
mobileMenuBar.addEventListener('click', () => {
    nav.classList.add('active');
    mobileMenuBar.classList.remove('active');
    mobileMenuBarCancle.classList.add('active');
});
mobileMenuBarCancle.addEventListener('click', () => {
    nav.classList.remove('active');
    mobileMenuBar.classList.add('active');
    mobileMenuBarCancle.classList.remove('active');
});

//mobile MenuLink삭제
const navMainLinkDel_herf = [];
for (let i = 0; i < navMainLinkDel.length; i++) {
    let herf;
    herf = navMainLinkDel[i].href;
    navMainLinkDel_herf.push(herf);
}


window.addEventListener('load', () => {

    let x = window.innerWidth;
    let y = window.scrollYOffset;

    //PC,Mobile Check
    viewportCheck();
});

window.addEventListener('resize', () => {
    let x = window.innerWidth;

    //pc,mobile 체크
    viewportCheck();

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
