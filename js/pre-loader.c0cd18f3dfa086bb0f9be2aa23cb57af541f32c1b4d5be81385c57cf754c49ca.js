$(document).on('ready', function () {
    //fade out spinner
    $('.spinner-grow').fadeOut();
    //fade out div
    $('.page-preloader').fadeOut('slow');
    $('body').css({
        'overflow':'visible'
    });
});