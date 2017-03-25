$(function() {
    var bannerSlider = $(".js_banner").oSlider({
        loop: true,
        speed: 5000,
        pager: ".js_pager"
    });
    bannerSlider.init(); //开始轮播


    var productSlider = $(".js_banner2").oSlider({
        // loop: true,
        // speed: 5000,
        pager: ".js_pager2"
    });
    productSlider.init(); //开始轮播

    init();


    $(window).resize(function() {
        init();
    });

    function init() {

        $('.js-o-scale').each(function(){
            $(this).oScale().init();
        });

        $('.js-popular-herl').oHrel().init();
    }

});