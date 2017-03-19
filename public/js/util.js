/**
 * Created by thinkpad on 2017/3/19.
 */
// 工具
define(['jquery'],function ($) {
    return {
        setMenu:function (pathname) {
            $(".navs a").removeClass("active");
            $('.navs a[href="'+pathname+'"]').addClass('active');
        }
    } 
});