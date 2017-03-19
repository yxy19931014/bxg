/**
 * Created by thinkpad on 2017/3/19.
 */
define(['jquery','template'],function ($,template) {
    $.ajax({
        type:'get',
        url:"/api/teacher",
        dataTyep:"json",
        success:function (data) {
            var html=template("teacherTpl",{list:data.result});
            $("#teacherList").html(html);
        }
    });
});