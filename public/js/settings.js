/**
 * Created by thinkpad on 2017/3/21.
 */
define(['jquery','template','ckeditor','region','validate','form','datepicker','language','uploadify','language'],function ($,template,CKEDITOR) {
     // 查询个人中心信息
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function (data) {
            console.log(data);
            var html=template('profileTpl',data.result);
            $('#settings').html(html);
            // 处理文件上传
            $('#upfile').uploadify({
                buttonText:"",
                width:120,
                height:120,
                fileObjName:'tc_avatar',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/avatar',
                onUploadSuccess:function (file,data) {
                    data=JSON.parse(data);
                   $(".preview img").attr('src',data.result.path);
                }
            });
            // 处理表单三级联动
            $('#hometown').region({
                url:'/public/assets/jquery-region/region.json'
            });
            // 富文本处理
            CKEDITOR.replace('ckeditor',{
                toolbarGroups: [{
                    name:'clipboard',groups:["clipboard","undo"]
                }]
            });

            $('#profileForm').validate({
                sendForm:false,
                valid:function () {
                    // 同步更新富文本的内容变化
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    var p=$('#p').find('option:selected').text();
                    var c=$('#c').find('option:selected').text();
                    var d=$('#d').find('option:selected').text();
                    var tc_hometown=p+'|'+c+"|"+d;
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        data:{
                            tc_hometown:tc_hometown
                        },
                        dataType:'json',
                        success:function (data) {
                            if(data.code==200){
                                location.href='/index/settings';
                            }
                        }
                    })
                }
            })
        }
    });
});