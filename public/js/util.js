/**
 * Created by thinkpad on 2017/3/19.
 */
// 工具
define(['jquery'],function ($) {
    return {
        setMenu:function (pathname) {
            $(".navs a").removeClass("active");
            $('.navs a[href="'+pathname+'"]').addClass('active');
        },
        qs:function (pname) {
            var pathname=location.search;
            pathname=pathname.slice(1);
            var obj={};
            if(pathname){
                var arr=pathname.split('&');
                for(var i=0;i<arr.length;i++){
                    var kv=arr[i].split('=');
                        obj[kv[0]]=kv[1];
                }
            }
            return obj[pname];
        }
    } 
});