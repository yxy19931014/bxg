// 遮挡层和进度条
define(['jquery','nprogress'],function ($,nprogress) {
    // 如果同时发送多次Ajax请求，那么stop时会以最后响应完成的时间为准
    // 控制全局遮罩
    $(document).ajaxStart(function () {
        $('.overlay').show();
    });
    $(document).ajaxStart(function () {
        $('.overlay').hide(50);
    });

    // 进度条
    nprogress.start();
    nprogress.done();
});