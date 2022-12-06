window.addEventListener('load', () => {
    const header = document.querySelector('header');
    const item = document.querySelectorAll('.ex-item');
    let originX = window.innerWidth;

    for (let i = 0; i < item.length; i++) {
        item[i].addEventListener('mouseover', mouseHoverIn);
        item[i].addEventListener('mouseout', mouseHoverOut)
    }

    function mouseHoverIn(e) {
        this.classList.add('on');
    }

    function mouseHoverOut(e) {
        this.classList.remove('on');
    }
    

    if(document.querySelector('section').classList.contains('main-img-section')){
        //index 일때
        if(originX < 730){
            document.querySelector('.new-campaign-section img').src = "img/main4-banner-2.jpg";
            document.querySelector('.bottom-red-circle').style.opacity = 0;
            document.querySelector('.bottom-yellow-circle').style.opacity = 0;
            document.querySelector('.post-it').style.animation = 'none';
        }else{
            document.querySelector('.new-campaign-section img').src = "img/main4-banner.jpg";
            document.querySelector('.bottom-red-circle').style.opacity = 1;
            document.querySelector('.bottom-yellow-circle').style.opacity = 1;
        }
    }

    if(document.querySelector('section').classList.contains('history-section')){
        //introduce 일때, 이미지 랜덤 호출
        const historyImg = document.querySelectorAll('.history-pic img');
        let numBox = Array(16).fill().map((v,i)=>i+1);
        console.log(numBox);
        let shuffle = [];
        for(let i = 0; i<numBox.length; i++){
            let value = Math.floor(Math.random() * numBox.length);
            if(shuffle.indexOf(value) === -1){
                shuffle.push(value)
            }else{
                i--;
            }
        }

        let delay = 0;
        for(let i = 0; i<historyImg.length; i++){
            delay += 150;
            setTimeout(function(){
                historyImg[shuffle[i]].style.opacity = 1;
            },delay);
        }
    }


    const logo = document.querySelector('.header-logo');
    const close = document.querySelector('.close');
    logo.addEventListener('click',()=>{
        header.classList.toggle('on');
    })
    close.addEventListener('click',()=>{
        header.classList.remove('on');
    })


    window.addEventListener('scroll', () => {
        let modifiedX = window.innerWidth;
        let y = window.pageYOffset;
        if (y > 50 && modifiedX > 731) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    })

    window.addEventListener('resize', () => {
        let modifiedX = window.innerWidth;

        if(modifiedX < 950 && originX > 950 ){
            document.querySelector('.main-img-ball').style.top = '-25%';
            document.querySelector('.main-img-ball').style.animation = '8s seesaw1 0.5s ease-in-out infinite';
            document.querySelector('.main-img-squre').style.top = '-20%';
            document.querySelector('.main-img-squre').style.animation = '9s seesaw2 0.5s ease-in-out infinite';
        }

        if(modifiedX > 950 && originX < 950){
            document.querySelector('.main-img-ball').style.top = '-35%';
            document.querySelector('.main-img-ball').style.animation = '8s seesaw1 0.5s ease-in-out infinite';
            document.querySelector('.main-img-squre').style.top = '-40%';
            document.querySelector('.main-img-squre').style.animation = '9s seesaw2 0.5s ease-in-out infinite';
        }

        if(modifiedX < 730){
            document.querySelector('.new-campaign-section img').src = "img/main4-banner-2.jpg";
            document.querySelector('.bottom-red-circle').style.opacity = 0;
            document.querySelector('.bottom-yellow-circle').style.opacity = 0;
        }else{
            document.querySelector('.new-campaign-section img').src = "img/main4-banner.jpg";
            document.querySelector('.bottom-red-circle').style.opacity = 1;
            document.querySelector('.bottom-yellow-circle').style.opacity = 1;
        }

    })
})