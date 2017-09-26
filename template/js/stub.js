//анимация печатания текста
/*import Typed from 'typed.min.js';

var options = {
  strings: ["<i>First</i> sentence.", "&amp; a second sentence."],
  typeSpeed: 40
};

var typed = new Typed(".element", options);*/
$(function() {
    $(#typed).typed ({
        strings:['- приносит <p>миллионы</p>'],
        typeSpeed: 30,
        backDelay: 500,
        loop: false,
        loopCount:false,
    });
});