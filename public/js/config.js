
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
        speed: 500,
        autoplay: {
            delay: 2000,
        }
    });
});