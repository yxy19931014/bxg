/**
 * Created by thinkpad on 2017/3/22.
 */
define(['jquery','template','util','ckeditor','validate','form'],function ($,template,util,CKEDITOR) {
     util.setMenu('/course/add');
    var cs_id=util.qs('cs_id');
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{
            cs_id:cs_id
        },
        dataType:'json',
        success:function (data) {
            var html=template('basicTpl',data.result);
            $("#basicInfo").html(html);
            // 富文本处
            CKEDITOR.replace('ckeditor',{
                toolbarGroups: [{
                    name:'clipboard',groups:["clipboard","undo"]
                }]
            });
            // 提交表单
            $("#basicForm").validate({
                sendForm:false,
                valid:function () {
                    // 同步更新富文本的内容变化
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/basic',
                        dataType:'json',
                        success:function (data) {
                            if(data.code==200){
                                location.href='/course/picture?cs_id='+data.result.cs_id;
                            }
                        }
                    })
                }
            })
            
            
            
        }
    })
});