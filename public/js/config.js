
$(document).ready(function () {
    $('.dropdown-submenu').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
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
    TweenMax.staggerFrom(".navbar-nav > li", 1, {
        delay: 0.2,
        opacity: 0,
        ease: Expo.easeInOut
    }, 0.1);

    new WOW().init();

    // Tawk.to
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/5ec391b68ee2956d73a27aab/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();

    $("a[rel=gallery1]").fancybox();
});