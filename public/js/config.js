/**
 * Created by thinkpad on 2017/3/18.
 */
require.config({
    baseUrl : '/public',
    urlArgs:'bust='+(new Date()).getTime(),//防止缓存
    paths : {
        jquery : 'assets/jquery/jquery.min',
        cookie : 'assets/jquery-cookie/jquery.cookie',
        echarts : 'assets/echarts/echarts.min',
        template: 'assets/artTemplate/template',
        bootstrap:'assets/bootstrap/js/bootstrap',
        datepicker:'assets/bootstrap-datepicker/js/bootstrap-datepicker',
        language:'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        util:'js/util',
        overlay:'js/overlay',
        nprogress:'assets/nprogress/nprogress',
        validate:'assets/validate/jquery-validate',
        form:'assets/form/jquery.form',
        uploadify:'assets/uploadify/jquery.uploadify',
        region:'assets/jquery-region/jquery.region',
        ckeditor:'assets/ckeditor/ckeditor',
        Jcrop:'assets/jcrop/js/Jcrop'
    },
    // 把bootstrap转成标准模块
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        language:{
            deps:['jquery','datepicker']
        },
        validate:{
            deps:['jquery']
        },
        uploadify:{
            deps:['jquery']
        },
        ckeditor:{
            exports:'CKEDITOR',
            deps:['jquery']
        },
        Jcrop:{
            deps:['jquery']
        }
    }
});