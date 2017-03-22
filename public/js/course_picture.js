/**
 * Created by thinkpad on 2017/3/22.
 */
define(['jquery','template','util','uploadify'],function ($,template,util) {
    util.setMenu('/course/add');
    var cs_id=util.qs('cs_id');
    $.ajax({
        type:'get',
        url:'/api/course/picture',
        data:{
            cs_id:cs_id
        },
        dataType:'json',
        success:function (data) {
            var html=template('pictureTpl',data.result);
            $('#pictureInfo').html(html);

            // 处理文件上传
            $('#upfile').uploadify({
                width:100,
                height:'auto',
                buttonText:"选择图片",
                buttonClass:"btn btn-success btn-sm",
                fileObjName:'cs_cover_original',
                itemTemplate:'',
                formData:{cs_id:cs_id},
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/cover',
                onUploadSuccess:function (file,data) {
                    console.log(data);
                    data=JSON.parse(data);
                    $(".preview img").attr('src',data.result.path);
                }
            });

        }
    })
});