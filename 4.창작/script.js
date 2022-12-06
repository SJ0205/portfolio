(() => {
    let yOffset = window.pageYOffset;
    let currentSection = 0;
    let totalScrollHeight = 0;
    let prevScrollHeight = 0;

    const sectionInfo = [{
        type: 'fixed',
        scrollHeight: 0,
        heightNum: 6,
        container: document.querySelector('#main-section'),
        objs: {
            messageA: document.querySelector('.message-a'),
            messageB: document.querySelector('.message-b'),
            messageC: document.querySelector('.message-c'),
            messageD: document.querySelector('.message-d'),
            messageE: document.querySelector('.message-e'),
            canvas: document.querySelector('#main-canvas'),
            context: document.querySelector('#main-canvas').getContext('2d'),
            imgSet: [],
        },
        values: {
            canvas_opacity: [1, 0, {
                start: 0.8,
                end: 0.85
            }],
            imgSequence: [0, 303],
            imgCount: 304,
            //messageA 0.15 ~ 0.3
            messageA_opacity_in: [0, 1, {
                start: 0.15,
                end: 0.2
            }],
            messageA_translateY_in: [20, 0, {
                start: 0.15,
                end: 0.2
            }],
            messageA_opacity_out: [1, 0, {
                start: 0.25,
                end: 0.3
            }],
            messageA_translateY_out: [0, -20, {
                start: 0.25,
                end: 0.3
            }],

            //messageB 0.3 ~ 0.45
            messageB_opacity_in: [0, 1, {
                start: 0.3,
                end: 0.35
            }],
            messageB_translateY_in: [20, 0, {
                start: 0.3,
                end: 0.35
            }],
            messageB_opacity_out: [1, 0, {
                start: 0.4,
                end: 0.45
            }],
            messageB_translateY_out: [0, -20, {
                start: 0.4,
                end: 0.45
            }],

            //messageC 0.45 ~ 0.6
            messageC_opacity_in: [0, 1, {
                start: 0.45,
                end: 0.5
            }],
            messageC_translateY_in: [20, 0, {
                start: 0.45,
                end: 0.5
            }],
            messageC_opacity_out: [1, 0, {
                start: 0.55,
                end: 0.6
            }],
            messageC_translateY_out: [0, -20, {
                start: 0.55,
                end: 0.6
            }],

            //messageD 0.6 ~ 0.75
            messageD_opacity_in: [0, 1, {
                start: 0.6,
                end: 0.65
            }],
            messageD_translateY_in: [20, 0, {
                start: 0.6,
                end: 0.65
            }],
            messageD_opacity_out: [1, 0, {
                start: 0.7,
                end: 0.75
            }],
            messageD_translateY_out: [0, -20, {
                start: 0.7,
                end: 0.75
            }],

            //messageE 0.75 ~ 0.9
            messageE_opacity_in: [0, 1, {
                start: 0.75,
                end: 0.8
            }],
            messageE_translateY_in: [20, 0, {
                start: 0.75,
                end: 0.8
            }],
            messageE_opacity_out: [1, 0, {
                start: 0.85,
                end: 0.9
            }],
            messageE_translateY_out: [0, -20, {
                start: 0.85,
                end: 0.9
            }],

        }
    }, {
        type: 'normal',
        scrollHeight: 0,
        container: document.querySelector('#one'),
        content: document.querySelector('.one-text-box')
    }, {
        type: 'fixed',
        scrollHeight: 0,
        heightNum: 4,
        container: document.querySelector('#two'),
        objs: {
            canvas: document.querySelector('#sub-canvas'),
            context: document.querySelector('#sub-canvas').getContext('2d'),
            imgPath: [
                'img/sub-canvas-img-1.jpg',
                'img/sub-canvas-img-2.jpg'
            ],
            imgSet: [],
        },
        values: {
            imgCount: 2,
            rect1X: [0, 0, {
                start: 0,
                end: 0
            }],
            rect2X: [0, 0, {
                start: 0,
                end: 0
            }],
            rectStartY: 0,
            blendHeight: [0, 0, {
                start: 0,
                end: 0
            }],
            canvas_scale: [0, 0, {
                start: 0,
                end: 0
            }]
        }
    }]

    function menuActive() {
        yOffset = window.pageYOffset;

        if (yOffset > 50) {
            document.querySelector('header').classList.add('active');
        } else if (yOffset < 50) {
            document.querySelector('header').classList.remove('active');
        }
    }

    function setLayout() {
        for (let i = 0; i < sectionInfo.length; i++) {
            if (sectionInfo[i].type === 'fixed') {
                sectionInfo[i].scrollHeight = window.innerHeight * sectionInfo[i].heightNum;
            } else if (sectionInfo[i].type === 'normal') {
                sectionInfo[i].scrollHeight = sectionInfo[i].content.clientHeight + (window.innerHeight * 0.6);
            }

            sectionInfo[i].container.style.height = `${sectionInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        totalScrollHeight = 0;

        for (let i = 0; i < sectionInfo.length; i++) {
            totalScrollHeight += sectionInfo[i].scrollHeight;
            if (yOffset <= totalScrollHeight) {
                currentSection = i;
                break;
            }

        }

        document.querySelector('body').setAttribute('id', `show-section-${currentSection}`);



        //canvas setting
        const widthRatio = window.innerWidth / 1920;
        const heightRatio = window.innerHeight / 1080;
        const canvasRatio = 0;
        if (widthRatio > heightRatio) {
            sectionInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${widthRatio})`;
            sectionInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${widthRatio})`;
        } else {
            sectionInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
            sectionInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        }
    }

    function setCanvasImages() {
        let mainImgElem;
        for (let i = 0; i < sectionInfo[0].values.imgCount; i++) {
            mainImgElem = new Image();
            mainImgElem.src = `video-flame/flame${i}.png`;
            sectionInfo[0].objs.imgSet.push(mainImgElem);
        }

        let subImgElem;
        for (let i = 0; i < sectionInfo[2].objs.imgPath.length; i++) {
            subImgElem = new Image();
            subImgElem.src = sectionInfo[2].objs.imgPath[i];
            sectionInfo[2].objs.imgSet.push(subImgElem);
        }
    }



    function calcValues(values, currentYOffset) {
        let rt;

        const scrollHeight = sectionInfo[currentSection].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {

            const partStart = scrollHeight * values[2].start;
            const partEnd = scrollHeight * values[2].end;
            const partScrollHeight = partEnd - partStart;

            if (currentYOffset < partStart) {
                rt = values[0];
            } else if (currentYOffset > partEnd) {
                rt = values[1];
            } else if (currentYOffset >= partStart && currentYOffset <= partEnd) {
                rt = (currentYOffset - partStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }
        } else {
            rt = scrollRatio * (values[1] - values[0]) + values[0]
        }

        return rt;
    }


    function scrollLoop() {
        enterNewSection = false;
        yOffset = window.pageYOffset;
        prevScrollHeight = 0;

        for (let i = 0; i < currentSection; i++) {
            prevScrollHeight += sectionInfo[i].scrollHeight;
        }

        if (yOffset >= prevScrollHeight + sectionInfo[currentSection].scrollHeight) {
            enterNewSection = true;
            currentSection++;
            document.querySelector('body').setAttribute('id', `show-section-${currentSection}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewSection = true;
            if (currentSection === 0) {
                return;
            }
            currentSection--;
            document.querySelector('body').setAttribute('id', `show-section-${currentSection}`);
        }

        if (enterNewSection) {
            return
        }

        sectionAnimation();
    }

    function sectionAnimation() {
        const objs = sectionInfo[currentSection].objs;
        const values = sectionInfo[currentSection].values;
        let currentYOffset = yOffset - prevScrollHeight;
        let scrollHeight = sectionInfo[currentSection].scrollHeight;
        let scrollRatio = currentYOffset / scrollHeight;
        switch (currentSection) {
            case 0:
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.38) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.52) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.68) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageE.style.opacity = calcValues(values.messageE_opacity_in, currentYOffset);
                    objs.messageE.style.transform = `translate3d(0, ${calcValues(values.messageE_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageE.style.opacity = calcValues(values.messageE_opacity_out, currentYOffset);
                    objs.messageE.style.transform = `translate3d(0, ${calcValues(values.messageE_translateY_out, currentYOffset)}%, 0)`;
                }
                break;
            case 1:
                //normalSection
                //아래 섹션 캔버스 미리그리기
                if (scrollRatio > 0.9) {
                    const objs = sectionInfo[2].objs;
                    const values = sectionInfo[2].values;
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;

                    if (widthRatio <= heightRatio) {
                        // 캔버스보다 브라우저 창이 홀쭉한 경우
                        canvasScaleRatio = heightRatio;
                    } else {
                        // 캔버스보다 브라우저 창이 납작한 경우
                        canvasScaleRatio = widthRatio;
                    }

                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.fillStyle = 'white';
                    objs.context.drawImage(objs.imgSet[0], 0, 0);

                    const recalctedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                    const recalctedInnerHeight = window.innerHeight / canvasScaleRatio;
                    const whiteRectWidth = recalctedInnerWidth * 0.15;
                    values.rect1X[0] = (objs.canvas.width - recalctedInnerWidth) / 2; //시작점
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth; //끝점
                    values.rect2X[0] = values.rect1X[0] + recalctedInnerWidth - whiteRectWidth; //시작점
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth; //끝점

                    objs.context.fillRect(values.rect1X[0], 0, whiteRectWidth, objs.canvas.height);
                    objs.context.fillRect(values.rect2X[0], 0, whiteRectWidth, objs.canvas.height);
                }
                break;
            case 2:
                //가로&세로 꽉 차게 하기 위해서 여기서 세팅
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if (widthRatio <= heightRatio) {
                    // 캔버스보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = heightRatio;
                } else {
                    // 캔버스보다 브라우저 창이 납작한 경우
                    canvasScaleRatio = widthRatio;
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.imgSet[0], 0, 0);

                const recalctedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                const recalctedInnerHeight = window.innerHeight / canvasScaleRatio;
                const whiteRectWidth = recalctedInnerWidth * 0.15;


                if (!values.rectStartY) {
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    // values.rect1X[2].start = (window.innerHeight/2) / scrollHeight;
                    // values.rect2X[2].start = (window.innerHeight/2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                }

                values.rect1X[0] = (objs.canvas.width - recalctedInnerWidth) / 2; //시작점
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth; //끝점
                values.rect2X[0] = values.rect1X[0] + recalctedInnerWidth - whiteRectWidth; //시작점
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth; //끝점

                objs.context.fillRect(calcValues(values.rect1X, currentYOffset), 0, whiteRectWidth, objs.canvas.height);
                objs.context.fillRect(calcValues(values.rect2X, currentYOffset), 0, whiteRectWidth, objs.canvas.height);

                if (scrollRatio < values.rect1X[2].end) {
                    objs.canvas.classList.remove('fixed');

                } else {
                    objs.canvas.classList.add('fixed');

                    //blendHeight: [0, 0, {start:0, end:0}]
                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rect1X[2].end;
                    values.blendHeight[2].end = values.rect1X[2].end + 0.2;

                    const blendHeight = calcValues(values.blendHeight, currentYOffset);


                    objs.canvas.style.top = `-${(objs.canvas.height - objs.canvas.height * canvasScaleRatio)/2}px`;
                    //objs.context.drawImage(이미지, 이미지x, 이미지y, 이미지x크기, 이미지y크기, 캔버스x, 캔버스y, 캔버스x크기, 캔버스y크기);
                    objs.context.drawImage(objs.imgSet[1],
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight)

                    if (scrollRatio > values.blendHeight[2].end) {
                        values.canvas_scale[0] = canvasScaleRatio;
                        values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                        values.canvas_scale[2].start = values.blendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                        objs.canvas.style.marginTop = 0;
                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                    }

                    if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
                        objs.canvas.classList.remove('fixed');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                    }
                }

                break;
        }
    }

    let refId;
    let refState;
    let acc = 0.2;
    let delayedYOffset = 0;

    function canvasLoop() {

        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

        if (!enterNewSection) {
            if (currentSection === 0) {
                let currentYOffset = delayedYOffset - prevScrollHeight;
                const objs = sectionInfo[currentSection].objs;
                const values = sectionInfo[currentSection].values;
                let sequence = Math.round(calcValues(values.imgSequence, currentYOffset));

                if (objs.imgSet[sequence]) {
                    objs.context.drawImage(objs.imgSet[sequence], 0, 0);
                }
            }
        }

        refId = requestAnimationFrame(canvasLoop);

        if (Math.abs(yOffset - delayedYOffset) < 1) {
            cancelAnimationFrame(refId);
            refState = false;
        }

    }

    window.addEventListener('load', () => {
        document.body.classList.remove('before-load');
        setLayout();
        menuActive();

        sectionInfo[0].objs.context.drawImage(sectionInfo[0].objs.imgSet[0], 0, 0);

        document.querySelectorAll('.nav-links')[currentSection].classList.add('active');

        window.addEventListener('scroll', () => {
            scrollLoop();
            menuActive();
            if (!refState) {
                refId = requestAnimationFrame(canvasLoop);
                refState = true;
            }
            if (!enterNewSection) {
                for (let i = 0; i < document.querySelectorAll('.nav-links').length; i++) {
                    document.querySelectorAll('.nav-links')[i].classList.remove('active');
                }
                document.querySelectorAll('.nav-links')[currentSection].classList.add('active');
            }
        });

        let timer;
        window.addEventListener('resize', () => {
            clearTimeout(timer);
            timer = setTimeout(()=>{
                if (window.innerWidth > 900) {
                    window.location.reload();
                }
            },500);
        });

        window.addEventListener('orientationchange', () => {
            scrollTo(0, 0);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });

        document.querySelector('.loading').addEvenetListener('transitionend',(e)=>{
            document.body.removeChild(e.currentTarget);
        })

    });

    setCanvasImages();

})();