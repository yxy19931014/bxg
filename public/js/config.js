/**
 * Created by thinkpad on 2017/3/18.
 */
require.config({
    baseUrl : '/public',
    paths : {
        jquery : 'assets/jquery/jquery.min',
        cookie : 'assets/jquery-cookie/jquery.cookie',
        echarts : 'assets/echarts/echarts.min',
        template: 'assets/artTemplate/template',
        bootstrap:'assets/bootstrap/js/bootstrap',
        util:'js/util',
        overlay:'js/overlay',
        nprogress:'assets/nprogress/nprogress'
    },
    // 把bootstrap转成标准模块
    shim:{
        bootstrap:{
            deps:['jquery']
        }
    }
});