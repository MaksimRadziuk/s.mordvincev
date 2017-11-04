$(window).on('load', function () {
    var $preloader = $('#page-preloader');

    $preloader.fadeOut();
});



$("document").ready(function(){

    /*$('.open-popup-link').magnificPopup({
        type:'inline',
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.main-slider').slick({
        autoplay:true,
        infinite:false
    });*/

    if(window.innerWidth > 800) {
        $('#fullpage').fullpage({
            scrollingSpeed: 700,
            responsiveWidth:800,
            easingcss3: 'ease-in',
            scrollBar: true,
            scrollOverflow: false,
            parallax: false,
            parallaxKey: '',
            parallaxOptions: {
                type: 'reveal',
                percentage: 100
            },
            fitToSection:false,
            lockAnchors: false,
            anchors:['welcome','selling-design','difference','website-design','quality-design','i','whales','digits','portfolio'],
            navigation: true,
            navigationPosition: 'right',
            showActiveTooltip: false,
            slidesNavigation: false,
            controlArrows: false,
            slidesNavPosition: 'bottom',
            verticalCentered: false,
            onLeave: function(index, nextIndex, direction){
                if(direction === 'up'){
                    if(nextIndex === 1) {
                        $('.page-title').removeClass('animated');
                    }
                }
                if(window.location.hash === '#difference' || window.location.hash === '#i' || window.location.hash === '#whales' || window.location.hash === '#portfolio') {
                    $('.page-title').removeClass('white');
                    $('.out-fp-content, #fp-nav').removeClass('white');
                }
                $('.page-title .circle').removeClass('arctic');

            },
            afterLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                if (anchorLink == 'welcome') {
                    $('.out-fp-content, #fp-nav').addClass('animated');
                } else {
                    $('.out-fp-content, #fp-nav').addClass('fast-animated');
                }

                $('.fp-section.fp-completely').addClass('animated');



                if (anchorLink == 'selling-design') {
                    $('.page-title .circle').show();
                    $('.page-title .green').text('1');
                    $('.page-title .total').text('3');
                    $('.page-title p').text('Зачем вам дизайн сайта?');
                }
                if (anchorLink == 'difference') {
                    $('.out-fp-content, #fp-nav').addClass('white');

                    $('.page-title .circle').show();
                    $('.page-title p').text('Зачем вам дизайн сайта?');
                    $('.page-title .green').text('2');
                    $('.page-title .total').text('3');
                    $('.page-title').addClass('white');
                }
                if (anchorLink == 'website-design') {
                    $('.page-title .circle').show();
                    $('.page-title p').text('Зачем вам дизайн сайта?');
                    $('.page-title .green').text('3');
                    $('.page-title .total').text('3');
                }
                if (anchorLink == 'quality-design') {
                    $('.page-title .circle').hide();
                    $('.page-title p').text('Что такое качественный веб-дизайн?');

                }
                if (anchorLink === 'i') {
                    $('.out-fp-content, #fp-nav').addClass('white');

                    $('.page-title .circle').hide();
                    $('.page-title p').text('Зачем вам я?');
                    $('.page-title').addClass('white');
                }
                if (anchorLink == 'whales') {
                    $('.out-fp-content, #fp-nav').addClass('white');
                    $('.page-title').addClass('white');
                    $('.page-title.white .circle').addClass('arctic');

                    $('.page-title .circle').show();
                    $('.page-title p').text('Сколько стоит дизайн сайта?');
                    $('.page-title .green').text('1');
                    $('.page-title .total').text('2');
                }
                if (anchorLink == 'digits') {
                    $('.page-title .circle').show();
                    $('.page-title p').text('Сколько стоит дизайн сайта?');
                    $('.page-title .green').text('2');
                    $('.page-title .total').text('2');
                }
                if (anchorLink == 'portfolio') {
                    $('.out-fp-content, #fp-nav').addClass('white');

                    $('.page-title .circle').hide();
                    $('.page-title p').text('Где найти деньги на дизайн сайта?');
                    $('.page-title').addClass('white');

                    $('.scroll-arrow').hide();
                } else {
                    $('.scroll-arrow').show();
                }
                if(anchorLink !== 'welcome'){
                    $('.page-title').addClass('animated');
                }
            }
        });

        $('.scroll-arrow').click(function () {
            $.fn.fullpage.moveSectionDown();
        });
    } else {
        $(window).on('resize scroll', function() {
            var hamburger_h = $('.hamburger').height();
            var hamburger_t = $('.hamburger').offset().top + hamburger_h;
            var white_h_1 = $('#main-difference').height();
            var white_t_1 = $('#main-difference').offset().top;
            if(hamburger_t > white_t_1) {
                $('.out-fp-content').addClass('white');
            }
            if(hamburger_t > (white_t_1 + white_h_1) || hamburger_t <= white_t_1){
                $('.out-fp-content').removeClass('white');
            }
        });
    }








    $('#nav-menu').iptOffCanvas({
        baseClass: 'offcanvas',
        closeOnClickOutside: false,
        single: true,
        static: false,
        staticCloseCondition: function() { return true; },
        type: 'left'
    });

    $('#nav-menu').on('opened.nav-menu@iptOffCanvas', function() {
        $('.hamburger').addClass('is-active');
    });

    $('#nav-menu').on('closed.nav-menu@iptOffCanvas', function() {
        $('.hamburger').removeClass('is-active');
    });

    $('.hamburger').click(function () {
        $('#nav-menu').data('plugin_iptOffCanvas').toggle();
    });



});


//раздвигание ответа в Общих вопросах
var sl = document.getElementsByClassName("arrow-holder");
var i;

for (i = 0; i < sl.length; i++) {
    sl[i].onclick = function() {
        this.classList.toggle("active");
        this.previousElementSibling.classList.toggle("show");
        this.parentElement.classList.toggle("show");
    }
}

//добавление текста и стиля в faq-nav

$(function(){
 var topPos = $('.slash, #hidden').offset().top; 
 $(window).scroll(function() { 
  var top = $(document).scrollTop();
  if (top > topPos) $('.slash, #hidden').addClass('show'); 
  else $('.slash, #hidden').removeClass('show');
 });
});

$(function(){
 var topPos = $('#active, #hidden').offset().top; 
 $(window).scroll(function() { 
  var top = $(document).scrollTop();
  if (top > topPos) $('#active, #hidden').addClass('active'); 
  else $('#active, #hidden').removeClass('active');
 });
});


