var page = null;
var filter = false;

$(window).on('load', function () {

    var $preloader = $('#page-preloader');

    $preloader.fadeOut();
});

$("document").ready(function(){

    if ($('a.m-scroll-arrow').length > 0) {

        $('a.m-scroll-arrow').smoothScroll();
    }

    $('a.open-modal').magnificPopup({
        type:'inline',
    });

    if ($('article table').length > 0) {

        $('article table').stacktable();
    }

    $('.scrollbar-outer').scrollbar();

    if ($('body').hasClass('main')) {

        setFullpage();
    }

    if ($('body').hasClass('aboutme')) {

        setFullpage_forAboutMe();
    }

    if ($('body').hasClass('blog')) {

        setFullpage_forBlog();
    }

    if ($('body').hasClass('faq')) {
	    
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

        setFullpage_forFAQ();
    }

    if ($('body').hasClass('contacts')) {

        if ((window.innerWidth > 768) && (window.innerWidth <= 1024)) {

            setFullpage_forContacts();
        }
    }

    if ($('body').hasClass('portfolio')) {

        $('.out-fp-content, #fp-nav').addClass('white');

        if (window.innerWidth > 768) {

            setFullpage_forPortfolio();
        }
    }

    if ($('body').hasClass('onework')) {

        $(".tabs").lightTabs();

        $('.out-fp-content, #fp-nav').addClass('white');
        $('.scroll-arrow').css('display', 'none');
    }

    if ($('body').hasClass('article')) {

        $('.out-fp-content, #fp-nav').addClass('white');
        $('.scroll-arrow').css('display', 'none');
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

    setTimeout(function () {
        $('#main-welcome .order-design').css('display','block').children().focus();
    },1000);
});

$(document).on('change', 'body.portfolio .radio input, body.portfolio .tags input', function(event) {

    filter = true;

    if (page != null) {

        $('.scroll-arrow').css("display", "none");
        page.fullpage.destroy('all');
        page = null;

        $('#portfolio-second').css('display', 'none');
        $('#portfolio-third').css('display', 'none');
        $('#portfolio-last').css('display', 'none');


        $('#portfolio-first .fp-bg').css('height', 'auto');
        $('#portfolio-first .fp-bg').css('min-height', 'calc(100vh - 66px)');
        $('#portfolio-first footer').css('display', 'block');

        $('#portfolio-first .tiles .tile-row').css('display', 'block');
    }

    var types = [];

    $("#filters input:checkbox:checked").each(function(index, element) {

        types.push($(element).attr('data-item'));
    });

    var params = {
        page: $('#filters').attr('data-page'),
        sphere: $('#filters input:radio:checked').attr('data-item'),
        types: types.join(',')
    };

    ajax('/?task=getProducts', params, function (response) {

        if (response.status == 'Ok') {

            var html = '';
            var before = [0,4,8,12,16,20,24,28,32,36,40,44,48,52,56,60];
            var after = [3,7,11,15,19,23,27,31,35,39,43,47,51,55,59];

            $('#portfolio-first .tiles').html('');

            $.each(response.products, function(index, product) {

                if (before.indexOf(index) > -1) {

                    html += '<div class="tile-row">';
                }
                else {

                    html += '<div class="tile-cell separator"></div>';
                }

                html += '<div class="tile-cell"><a href="' + product.url + '" class="item"' +
                    'style="background-image:url(/media/images/portfolio/' + product.alias + '.jpg)"><div>' +
                    '<img src="/themes/website/img/device-' + product.device + '.png"><span>Клиент: <strong>' +
                    product.client + '</strong></span><span>Тема: <strong>' + product.theme + '</strong></span>' +
                    '<span>Категория: <strong>' + product.type + '</strong></span></div></a></div>';

                if (after.indexOf(index) > -1) {

                    html += '</div>';
                }
            });

            $('#portfolio-first .tiles').html(html);
        }

    });
});

$(document).on('change', 'body.blog .radio input, body.blog .tags input', function(event) {

    filter = true;

    if (page != null) {

        $('.scroll-arrow').css("display", "none");
        page.fullpage.destroy('all');
        page = null;

        $('#portfolio-second').css('display', 'none');
        $('#portfolio-third').css('display', 'none');
        $('#portfolio-last').css('display', 'none');


        $('#portfolio-first .fp-bg').css('height', 'auto');
        $('#portfolio-first .fp-bg').css('min-height', 'calc(100vh - 66px)');
        $('#portfolio-first footer').css('display', 'block');

        $('#portfolio-first .tiles .tile-row').css('display', 'block');
    }

    var types = [];

    $("#filters input:checkbox:checked").each(function(index, element) {

        types.push($(element).attr('data-item'));
    });

    var params = {
        page: $('#filters').attr('data-page'),
        sphere: $('#filters input:radio:checked').attr('data-item'),
        types: types.join(',')
    };

    ajax('/?task=getArticles', params, function (response) {

        if (response.status == 'Ok') {

        }

    });
});


$(document).on('click', '#contactform span.button', function(event) {

    var captcha = grecaptcha.getResponse();

    if ($('#contactform input[name="skype"]').val() == '') {

        return false;
    }

    if ($('#contactform input[name="email"]').val() == '') {

        return false;
    }

    if ($('#contactform textarea').val() == '') {

        return false;
    }

    if ($('#contactform input[type="checkbox"]').prop('checked') == false) {

        return false;
    }

    if (captcha.length) {

        var params = {
            recaptcha: captcha,
            name: $('#contactform input[name="name"]').val(),
            email: $('#contactform input[name="email"]').val(),
            skype: $('#contactform input[name="skype"]').val(),
            text: $('#contactform textarea').val()
        };

        ajax('/?task=sendMessage', params, function (response) {

            if (response.status == 'Ok') {

                $('#contactform span.button').css('display', 'none');
                $('#contactform span.success').css('display', 'block');
            }

        });

        grecaptcha.reset();
    }
});

$(window).resize(function() {

    if ($('body').hasClass('portfolio') && (filter == false)) {

        if (window.innerWidth > 768) {

            if (page == null) {

                setFullpage_forPortfolio();
            }
        }
        else {

            if (page != null) {

                $('.scroll-arrow').css("display", "");
                page.fullpage.destroy('all');
                page = null;
            }
        }
    }

    if ($('body').hasClass('contacts')) {

        if ((window.innerWidth > 768) && (window.innerWidth <= 1024)) {

            if (page == null) {

                setFullpage_forContacts();
            }
        }
        else {

            if (page != null) {

                page.fullpage.destroy('all');
                page = null;
            }
        }
    }
});

function setFullpage() {

    if($('#fullpage').length > 0) {
        if (window.innerWidth > 800) {
            $('#fullpage').fullpage({
                scrollingSpeed: 700,
                responsiveWidth: 800,
                easingcss3: 'ease-in',
                scrollBar: false,
                scrollOverflow: false,
                parallax: true,
                parallaxKey: 'bW9yZHZpbmNldi5jb21fanZqY0dGeVlXeHNZWGc9RXRo',
                parallaxOptions: {
                    type: 'reveal',
                    percentage: 100
                },
                fitToSection: false,
                lockAnchors: false,
                anchors: ['welcome', 'selling-design', 'difference', 'website-design', 'quality-design', 'i', 'whales', 'digits', 'portfolio'],
                navigation: true,
                navigationPosition: 'right',
                showActiveTooltip: false,
                slidesNavigation: false,
                controlArrows: false,
                slidesNavPosition: 'bottom',
                verticalCentered: false,
                onLeave: function (index, nextIndex, direction) {
                    if (direction === 'up') {
                        if (nextIndex === 1) {
                            $('.page-title').removeClass('animated');
                        }
                    }
                    if (window.location.hash === '#difference' || window.location.hash === '#i' || window.location.hash === '#whales' || window.location.hash === '#portfolio') {
                        $('.page-title').removeClass('white');
                        $('.out-fp-content, #fp-nav').removeClass('white');
                    }
                    $('.page-title .circle').removeClass('arctic');

                },
                afterLoad: function (anchorLink, index, slideAnchor, slideIndex) {
                    if (anchorLink == 'welcome') {
                        $('.out-fp-content, #fp-nav').addClass('animated');
						$('.search-box').addClass('colorChng');
                    } else {
                        $('.out-fp-content, #fp-nav').addClass('fast-animated');
                    }

                    $('.fp-section.fp-completely').addClass('animated');


                    if (anchorLink == 'selling-design') {
						$('.search-box').addClass('colorChng');
                        $('.page-title .circle').show();
                        $('.page-title .green').text('1');
                        $('.page-title .total').text('3');
                        $('.page-title p').text('Зачем вам дизайн сайта?');
                    }
                    if (anchorLink == 'difference') {
                        $('.out-fp-content, #fp-nav').addClass('white');
						$('.search-box').removeClass('colorChng');
                        $('.page-title .circle').show();
                        $('.page-title p').text('Зачем вам дизайн сайта?');
                        $('.page-title .green').text('2');
                        $('.page-title .total').text('3');
                        $('.page-title').addClass('white');
                    }
                    if (anchorLink == 'website-design') {
						$('.search-box').addClass('colorChng');
                        $('.page-title .circle').show();
                        $('.page-title p').text('Зачем вам дизайн сайта?');
                        $('.page-title .green').text('3');
                        $('.page-title .total').text('3');
                    }
                    if (anchorLink == 'quality-design') {
						$('.search-box').addClass('colorChng');
                        $('.page-title .circle').hide();
                        $('.page-title p').text('Что такое качественный веб-дизайн?');

                    }
                    if (anchorLink === 'i') {
                        $('.out-fp-content, #fp-nav').addClass('white');
						$('.search-box').removeClass('colorChng');
                        $('.page-title .circle').hide();
                        $('.page-title p').text('Зачем вам я?');
                        $('.page-title').addClass('white');
                    }
                    if (anchorLink == 'whales') {
                        $('.out-fp-content, #fp-nav').addClass('white');
						$('.search-box').removeClass('colorChng');
                        $('.page-title').addClass('white');
                        $('.page-title.white .circle').addClass('arctic');

                        $('.page-title .circle').show();
                        $('.page-title p').text('Сколько стоит дизайн сайта?');
                        $('.page-title .green').text('1');
                        $('.page-title .total').text('2');
                    }
                    if (anchorLink == 'digits') {
						$('.search-box').addClass('colorChng');
                        $('.page-title .circle').show();
                        $('.page-title p').text('Сколько стоит дизайн сайта?');
                        $('.page-title .green').text('2');
                        $('.page-title .total').text('2');
                    }
                    if (anchorLink == 'portfolio') {
                        $('.out-fp-content, #fp-nav').addClass('white');
						$('.search-box').removeClass('colorChng');
                        $('.page-title .circle').hide();
                        $('.page-title p').text('Где найти деньги на дизайн сайта?');
                        $('.page-title').addClass('white');

                        $('.scroll-arrow').hide();
                    } else {
                        $('.scroll-arrow').show();
                    }
                    if (anchorLink !== 'welcome') {
                        $('.page-title').addClass('animated');
                    }
                }
            });

            $('.scroll-arrow').click(function () {
                $.fn.fullpage.moveSectionDown();
            });
        } else {
            $(window).on('resize scroll', function () {
                var hamburger_h = $('.hamburger').height();
                var hamburger_t = $('.hamburger').offset().top + hamburger_h;

                var white_h_1 = $('#main-difference').height();
                var white_t_1 = $('#main-difference').offset().top;

                var white_h_2 = $('#main-i').height();
                var white_t_2 = $('#main-i').offset().top;

                var white_h_3 = $('#main-whales').height();
                var white_t_3 = $('#main-whales').offset().top;

                var white_h_4 = $('#main-portfolio').height();
                var white_t_4 = $('#main-portfolio').offset().top;

                if (
                    (hamburger_t >= white_t_1 && hamburger_t < (white_t_1 + white_h_1) ) ||
                    (hamburger_t >= white_t_2 && hamburger_t < (white_t_2 + white_h_2)) ||
                    (hamburger_t >= white_t_3 && hamburger_t < (white_t_3 + white_h_3)) ||
                    (hamburger_t >= white_t_4 && hamburger_t < (white_t_4 + white_h_4))) {
                    $('.out-fp-content').addClass('white');
                } else {
                    $('.out-fp-content').removeClass('white');
                }
            });
        }
    }
}

function setFullpage_forFAQ() {

    if(window.innerWidth > 1024 && window.innerHeight > 600) {
        $('#fullpage').fullpage({
            scrollingSpeed: 700,
            responsiveWidth:800,
            easingcss3: 'ease-in',
            scrollBar: false,
            scrollOverflow: false,
            parallax: true,
            parallaxKey: 'bW9yZHZpbmNldi5jb21fanZqY0dGeVlXeHNZWGc9RXRo',
            parallaxOptions: {
                type: 'reveal',
                percentage: 100
            },
            fitToSection:false,
            lockAnchors: false,
            anchors:['main', 'questions'],
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
                if(window.location.hash === '#main' || window.location.hash === '#questions') {
                    $('.page-title').removeClass('white');
                    $('.out-fp-content, #fp-nav').removeClass('white');
                }
                

            },
            afterLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                if (anchorLink == 'main') {
                    $('.out-fp-content, #fp-nav').addClass('animated');
                } else {
                    $('.out-fp-content, #fp-nav').addClass('fast-animated');
                }

                $('.fp-section.fp-completely').addClass('animated');


                if (anchorLink == 'questions') {
                    $('.out-fp-content, #fp-nav').addClass('white');
                    $('.slash, #hidden').addClass('show'); 
                    $('#active, #hidden').addClass('active'); 
                    $('.scroll-arrow').hide();
                } else {
                    $('.scroll-arrow').show();
                    $('.slash, #hidden').removeClass('show');
                    $('#active, #hidden').removeClass('active');
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
            var white_h_1 = $('#faq-questions').height();
            var white_t_1 = $('#faq-questions').offset().top;
            if(hamburger_t > white_t_1) {
                $('.out-fp-content').addClass('white');
            }
            if(hamburger_t > (white_t_1 + white_h_1) || hamburger_t <= white_t_1){
                $('.out-fp-content').removeClass('white');
            }
        });
    }
}

function setFullpage_forAboutMe() {

    if(window.innerWidth > 800) {
        $('#fullpage').fullpage({
            scrollingSpeed: 700,
            responsiveWidth:800,
            easingcss3: 'ease-in',
            scrollBar: false,
            scrollOverflow: false,
            parallax: true,
            parallaxKey: 'bW9yZHZpbmNldi5jb21fanZqY0dGeVlXeHNZWGc9RXRo',
            parallaxOptions: {
                type: 'reveal',
                percentage: 100
            },
            fitToSection:false,
            lockAnchors: false,
            anchors:['education','competence','experience','advantages','characteristic','certificates','principles', 'worktype'],
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
                if(window.location.hash === '#competence' || window.location.hash === '#advantages' || window.location.hash === '#advantages'  || window.location.hash === '#certificates' || window.location.hash === '#principles' || window.location.hash === '#worktype') {
                    
                    $('.out-fp-content, #fp-nav').removeClass('white');
                    $('.search-box').removeClass('colorChng');
                }
               

            },
            afterLoad: function(anchorLink, index, slideAnchor, slideIndex) {
                if (anchorLink == 'education') {
                    $('.out-fp-content, #fp-nav, .search-box').addClass('animated');
                    $('.search-box').addClass('colorChng');
                } else {
                    $('.out-fp-content, #fp-nav, .search-box').addClass('fast-animated');
                }

                $('.fp-section.fp-completely').addClass('animated');


                if (anchorLink == 'competence') {
                    $('.out-fp-content, #fp-nav').addClass('white');
                    $('.search-box').removeClass('colorChng');
                    
                }
                if (anchorLink == 'experience') {
                    $('.out-fp-content, #fp-nav').addClass('white');
                    $('.search-box').removeClass('colorChng');
                }
                if (anchorLink == 'advantages') {
                    $('.out-fp-content, #fp-nav').addClass('white');
                   $('.search-box').removeClass('colorChng');

                }
                if (anchorLink === 'characteristic') {
                    $('.search-box').addClass('colorChng');
                    
                }
                if (anchorLink == 'certificates') {
                    $('.out-fp-content, #fp-nav').addClass('white');
                    $('.search-box').removeClass('colorChng');
                    
                }
                if (anchorLink == 'principles') {
                    $('.out-fp-content, #fp-nav').addClass('white');
                    $('.search-box').removeClass('colorChng');
                    
                }
                if (anchorLink == 'worktype') {
                    $('.search-box').removeClass('colorChng');
                    $('.out-fp-content, #fp-nav').addClass('white');

                    

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

            var white_h_1 = $('#about-competence').height();
            var white_t_1 = $('#about-competence').offset().top;

            var white_h_2 = $('#about-experience').height();
            var white_t_2 = $('#about-experience').offset().top;

            var white_h_3 = $('#about-advantages').height();
            var white_t_3 = $('#about-advantages').offset().top;

            var white_h_4 = $('#about-certificates').height();
            var white_t_4 = $('#about-certificates').offset().top;

            var white_h_5 = $('#about-principles').height();
            var white_t_5 = $('#about-principles').offset().top;

            var white_h_6 = $('#about-worktype').height();
            var white_t_6 = $('#about-worktype').offset().top;

            if(
                (hamburger_t >= white_t_1 && hamburger_t < (white_t_1+white_h_1)) ||
                (hamburger_t >= white_t_2 && hamburger_t < (white_t_2+white_h_2)) ||
                (hamburger_t >= white_t_3 && hamburger_t < (white_t_3+white_h_3)) ||
                (hamburger_t >= white_t_4 && hamburger_t < (white_t_4+white_h_4)) ||
                (hamburger_t >= white_t_5 && hamburger_t < (white_t_5+white_h_5)) ||
                (hamburger_t >= white_t_6 && hamburger_t < (white_t_6+white_h_6))) {
                $('.out-fp-content').addClass('white');
                $('.search-box').removeClass('colorChng');
            }

             else {
                $('.out-fp-content').removeClass('white');
                $('.search-box').addClass('colorChng');
            }

        });
    }
}

function setFullpage_forPortfolio() {

    page = $('#fullpage');

    page.fullpage({
        scrollingSpeed: 700,
        easingcss3: 'ease-in',
        scrollBar: false,
        scrollOverflow: true,
        parallax: true,
        parallaxKey: 'bW9yZHZpbmNldi5jb21fanZqY0dGeVlXeHNZWGc9RXRo',
        scrollOverflowOptions: {
            bounce: false,
        },
        lockAnchors: false,
        anchors: ['first', 'second', 'third', 'last'],
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: false,
        slidesNavigation: false,
        controlArrows: false,
        slidesNavPosition: 'bottom',
        verticalCentered: false,
        onLeave: function (index, nextIndex, direction) {

        },
        afterLoad: function (anchorLink, index, slideAnchor, slideIndex) {

            $('.out-fp-content, #fp-nav').addClass('fast-animated');
            $('.fp-section.fp-completely').addClass('animated');

            if (anchorLink == 'last') {
                $('.scroll-arrow').css("display", "none");
            }
            else {
                $('.scroll-arrow').css("display", "block");
            }
        }
    });

    $.fn.fullpage.setKeyboardScrolling(false);
    $('.scroll-arrow').click(function () {
        $.fn.fullpage.moveSectionDown();
    });
}

function setFullpage_forBlog() {

    if($('#fullpage-blog').length > 0) {

        if (window.innerWidth > 800) {

            page = $('#fullpage-blog');

            page.fullpage({
                scrollingSpeed: 700,
                responsiveWidth: 800,
                easingcss3: 'ease-in',
                scrollBar: false,
                scrollOverflow: false,
	            parallax: true,
	            parallaxKey: 'bW9yZHZpbmNldi5jb21fanZqY0dGeVlXeHNZWGc9RXRo',
                parallaxOptions: {
                    type: 'reveal',
                    percentage: 100
                },
                fitToSection: false,
                lockAnchors: false,
                anchors: ['screen-1', 'screen-2', 'screen-3', 'screen-4'],
                navigation: true,
                navigationPosition: 'right',
                showActiveTooltip: false,
                slidesNavigation: false,
                controlArrows: false,
                slidesNavPosition: 'bottom',
                verticalCentered: false,
                onLeave: function (index, nextIndex, direction) {

                },
                afterLoad: function (anchorLink, index, slideAnchor, slideIndex) {
                    $('.out-fp-content, #fp-nav').addClass('fast-animated white');

                    $('.fp-section.fp-completely').addClass('animated');

                    if (anchorLink === 'screen-4') {
                        $('.scroll-arrow').hide();
                    } else {
                        $('.scroll-arrow').show();
                    }
                }
            });
        }
    }
}

function setFullpage_forContacts() {

    page = $('#fullpage');

    page.fullpage({
        scrollingSpeed: 700,
        easingcss3: 'ease-in',
        scrollBar: false,
        scrollOverflow: true,
        parallax: true,
        parallaxKey: 'bW9yZHZpbmNldi5jb21fanZqY0dGeVlXeHNZWGc9RXRo',
        scrollOverflowOptions:{
            bounce:false,
        },
        lockAnchors: false,
        anchors:['first','main'],
        navigation: true,
        navigationPosition: 'right',
        showActiveTooltip: false,
        slidesNavigation: false,
        controlArrows: false,
        slidesNavPosition: 'bottom',
        verticalCentered: false,
        onLeave: function(index, nextIndex, direction){

        },
        afterLoad: function(anchorLink, index, slideAnchor, slideIndex) {

            $('.out-fp-content, #fp-nav').addClass('fast-animated');
            $('.fp-section.fp-completely').addClass('animated');

            if (anchorLink == 'first') {
                $('.scroll-arrow').css("transform", "");
                $('.scroll-arrow').click(function () {
                    $.fn.fullpage.moveSectionDown();
                });
            }

            if (anchorLink == 'main') {
                $('.scroll-arrow').css("transform", "rotate(180deg)");
                $('.scroll-arrow').click(function () {
                    $.fn.fullpage.moveSectionUp();
                });
            }
        }
    });

    $.fn.fullpage.setKeyboardScrolling(false);
}

(function($){
    jQuery.fn.lightTabs = function(options){

        var createTabs = function(){
            tabs = this;
            i = 0;

            showPage = function(i){
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            };

            showPage(0);

            $(tabs).children("ul").children("li").each(function(index, element){
                $(element).attr("data-page", i);
                i++;
            });

            $(tabs).children("ul").children("li").click(function(){
                showPage(parseInt($(this).attr("data-page")));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

// обёртка для ajax-запроса
function ajax(url, params, callback) {

    if (callback && (typeof(callback) === 'function')) {

        $.ajax({
            url: url,
            type: 'post',
            data: params,
            async: false,
            success: callback,
            error: function (jqxhr, status, message) {
            }
        });
    }
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}