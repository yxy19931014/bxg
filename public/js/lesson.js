/**
 * Created by thinkpad on 2017/3/23.
 */
define(['jquery','template','util','bootstrap','validate','form'],function ($,template,util) {
    util.setMenu('/course/add');
    var cs_id=util.qs('cs_id');
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{
            cs_id:cs_id
        },
        dataType:'json',
        success:function (data) {
            if(data.code==200){
                var html=template('lessonTpl',data.result);
                $('#lessonInfo').html(html);
                // 添加课时
                $('#addLesson').click(function () {
                    $('#chapterModal').modal();
                    var html={};
                    html.title='添加课时';
                    console.log(html);
                    html=template('lessonModalTpl',html);
                    $("#lessonModalInfo").html(html);
                    courseTime('/api/course/chapter/add');
                    
                });
                // 编辑课时
                $('.editLesson').click(function () {
                    var ctId=$(this).attr('data-ctId');
                    $.ajax({
                        type:'get',
                        url:'/api/course/chapter/edit',
                        data:{
                          ct_id: ctId
                        },
                        dataType:'json',
                        success:function (data) {
                            data.result.title='编辑课时';
                            var html=template('lessonModalTpl',data.result);
                            $("#lessonModalInfo").html(html);
                            courseTime('/api/course/chapter/modify');
                            $('#chapterModal').modal();
                        }
                    }) 
                });
                function courseTime(url) {
                    $("#lessonForm").validate({
                        sendForm:false,
                        valid:function () {
                            var free=$('#isFree').prop('checked')?1:0;
                            $(this).ajaxSubmit({
                                type:'post',
                                url:url,
                                data:{
                                    ct_cs_id:cs_id,
                                    ct_is_free:free
                                },
                                dataType:'json',
                                success:function (data) {
                                    if(data.code==200){
                                        location.href='/course/lesson?cs_id='+cs_id;
                                    }
                                }
                            });
                        }
                    })
                }
            }
        }
    })
});