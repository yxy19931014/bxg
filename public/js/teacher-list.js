/**
 * Created by thinkpad on 2017/3/19.
 */
define(['jquery','template','util','bootstrap'],function ($,template,util) {
    util.setMenu(location.pathname);
    $.ajax({
        type:'get',
        url:"/api/teacher",
        dataTyep:"json",
        success:function (data) {
            var html=template("teacherTpl",{list:data.result});
            $("#teacherList").html(html);

            
            // 查看讲师功能
            $(".teacherBtns").find("a:eq(0)").click(function () {
                //查找最近的id
                var tc_id=$(this).closest("td").attr('data-tcid');
                // 处理弹窗
                $.ajax({
                    type:"get",
                    url:"/api/teacher/view",
                    data:{
                        tc_id:tc_id
                    },
                    dataType:"json",
                    success:function (data) {
                        if(data.code==200){
                            var html=template("teacherInfoModel",data.result);
                            $("#teacherInfo").html(html);
                            $("#teacherModal").modal();
                        }
                    }
                });
            });

            // 启用和注销
            $(".teacherBtns").find("a:eq(2)").click(function () {
                var tc_id=$(this).closest("td").attr('data-tcid');
                var tc_status=$(this).closest("td").attr('data-status');
                var td=$(this).closest("td");
                var that=$(this);
                $.ajax({
                    type:"post",
                    url:'/api/teacher/handle',
                    dataType:'json',
                    data:{
                        tc_id:tc_id,
                        tc_status:tc_status
                    },
                    success:function (data) {
                        td.attr("data-status",data.result.tc_status);
                        if(data.result.tc_status==0){
                            that.text('启用');
                        }else {
                            that.text('注销');
                        }
                    }
                })
            });
        }
    });









});