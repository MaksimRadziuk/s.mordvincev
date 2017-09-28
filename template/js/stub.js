$(document).ready(function() {
    $('body #section').eq(0).addClass("active").fadeIn(1000); // Показываем первый блок, можно и не первый, если прописать нужную цифру в eq()
    setInterval('blockAnimate();', 8000); // Вызываем функцию для смены блока каждые 5 секунд
});

// Функция для смены блоков, показывает блоки по очереди, начальный блок задаётся выше
function blockAnimate() {
    var length = $('body #section').length - 1;
    $('body #section').each(function(index) {
        if($(this).hasClass('active') && index != length) {
            $(this).removeClass("active").fadeOut(1000).next('#section').addClass("active").delay(1000).fadeIn(1000);
            return false;
        } else if (index == length) {
            $(this).removeClass('active').fadeOut(1000);
            $('body #section').eq(0).addClass("active").delay(1000).fadeIn(1000);
            return false;
        }
    });
};