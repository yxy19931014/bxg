/**
 * Created by thinkpad on 2017/3/21.
 */
define(['jquery','util','template','util','datepicker','language','form','validate'],function ($,util,template) {
    util.setMenu('/teacher/teacher_list');
    var tc_id=util.qs('tc_id');
    // 渲染页面
    if(tc_id){
        // 编辑查询
        $.ajax({
            type:'get',
            url:'/api/teacher/edit',
            data:{
                tc_id:tc_id
            },
            dataType:'json',
            success:function (data) {
                data.result.tInfo='讲师编辑';
                data.result.tc_submit="保存"
                var html=template('teacherEdit',data.result);
                $('#teacherInfo').html(html);
                checkForm('/api/teacher/update');
            }
        })
    }else {
        var html=template('teacherEdit',{
            tInfo:'讲师添加',
            tc_submit:'添加',
            tc_gender:0
        });
        $('#teacherInfo').html(html);
        checkForm('/api/teacher/add');
    }
    // 表单验证方法
    function checkForm(url) {
        $("#teacherForm").validate({
            sendForm:false,
            valid:function () {
                $(this).ajaxSubmit({
                    type:'post',
                    url:url,
                    dataType:'json',
                    success:function (data) {
                        if(data.code==200){
                            location.href='/teacher/teacher_list';
                        }
                    }
                });
            },
            description:{
                tcName: {
                    required:'用户名不能为空'
                },
                tcPass:{
                    required:'密码不能为空',
                    pattern:'只能是六位数字'
                },
                joinDate:{
                    required:'入职日期不能为空'
                }
            },
            eachInvalidField:function () {
                $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            eachValidField:function () {
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
            }

        })
    }
});