$(window).ready(function () {

    let x = window.innerWidth;
    let y = window.pageYOffset;
    let mainLink = document.querySelectorAll('.main-link');
    let time = null;
    let sec = 150;

    let slideNavLinks = new Array();
    for (let i = 0; i < $('.slide-nav-link-d').length; i++) {
        $('.slide-nav-link-d').eq(i).attr("href");
        slideNavLinks.push($('.slide-nav-link-d').eq(i).attr("href"));
    }

    if ($('div').hasClass('slide-box')) {
        //slide 실행
        console.log('slide실행');
        let slideIndex = 0;
        let my;

        slideAni();
        $('#prev').on('click', function () {
            slideArrowAni(-1)
        });
        $('#next').on('click', function () {
            slideArrowAni(1)
        });

        function slideReset() {
            for (let i = 0; i < $('.slide').length; i++) {
                $('.slide').eq(i).css('display', 'none');
                $('.slide-dot').eq(i).removeClass('on');
            }
        };

        function slideAni() {
            slideReset();

            slideIndex++;

            if (slideIndex > $('.slide').length) {
                slideIndex = 1;
            }

            $('.slide').eq(slideIndex - 1).css('display', 'block');
            $('.slide-dot').eq(slideIndex - 1).addClass('on');

            my = setTimeout(slideAni, 3000);
        }

        function slideArrowAni(num) {
            clearTimeout(my);
            slideReset();

            slideIndex += num;

            if (slideIndex > $('.slide').length) {
                slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = $('.slide').length;
            }

            $('.slide').eq(slideIndex - 1).css('display', 'block');
            $('.slide-dot').eq(slideIndex - 1).addClass('on');

            my = setTimeout(slideAni, 3000);
        }

        function slidePagerAni(num) {
            clearTimeout(my);
            slideReset();

            slideIndex = num;

            $('.slide').eq(slideIndex).css('display', 'block');
            $('.slide-dot').eq(slideIndex).addClass('on');

            my = setTimeout(slideAni, 3000);
        }

        $('.slide-dot').each(function (i) {
            $(this).click(function () {
                clearTimeout(my);
                slideReset();
                $('.slide').eq(i).css('display', 'block');
                $('.slide-dot').eq(i).addClass('on');
                my = setTimeout(slideAni, 3000);
            })
        })


    } else {
        false;
    }

    function headerHandler() {
        let x = window.innerWidth;

        if (x < 850) {

            //slide-nav
            $('header').removeAttr('class');
            $('nav').removeAttr('class');

            $('header').attr('class', 'slide-nav');
            $('.bx-menu').click(function () {
                $('nav').toggleClass('active');
            });

            $('.slide-nav-link-d').removeAttr('href');

            for (let i = 0; i < mainLink.length; i++) {
                $(mainLink[i]).click(function () {
                    $(this).children('.sub-link').toggleClass('active');
                });
            };

        } else {
            //normal-nav
            $('header').attr('class', 'normal-nav');

            for (let i = 0; i < $('.slide-nav-link-d').length; i++) {
                $('.slide-nav-link-d').eq(i).attr('href', slideNavLinks[i]);
            }
        }
    };

    headerHandler();

    window.addEventListener('resize', () => {
        let x = window.innerWidth;
        clearTimeout(time);
        time = setTimeout(headerHandler, sec);
    });

    window.addEventListener('scroll', () => {
        let y = window.scrollY;
        if (y > 70) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
        };
    });
})