
$(document).ready(function () {
    $('.dropdown-submenu').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

    const nav = $('#nav-header');
    $(window).scroll(function () {
        if (window.screen.width > 800) {
            if ($(this).scrollTop() > 125) {
                nav.addClass("nav-black-bg");
            } else {
                nav.removeClass("nav-black-bg");
            }
        }
    });

    var mySwiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 7000,
        }
    });

    TweenMax.from("#logo", 0.8, {
        delay: 0.2,
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut
    });

    TweenMax.from("#company-name", 1, {
        delay: 0.2,
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut
    });
    TweenMax.from("#company-desc", 1.3, {
        delay: 0.4,
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut
    });
    TweenMax.from("#btn-group", 1.6, {
        delay: 0.6,
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut
    });
    TweenMax.from("#price-tag", 2.5, {
        delay: 0.6,
        y: 10,
        opacity: 0,
        ease: Expo.easeInOut
    });
    TweenMax.to("#slide1", 3, {
        delay: 4,
        scale: 1.1
    });
    TweenMax.staggerFrom(".navbar-nav > li", 1, {
        delay: 0.2,
        opacity: 0,
        ease: Expo.easeInOut
    }, 0.1);

    new WOW().init();
});