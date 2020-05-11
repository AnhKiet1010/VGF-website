
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
        speed: 500,
        autoplay: {
            delay: 2000,
        }
    });
});