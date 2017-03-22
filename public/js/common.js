define(['jquery','template','cookie','overlay'],function($,template){

	// 控制左侧导航菜单的显示和隐藏
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 没有登录的时候跳转到登录页面
	var pathname = location.pathname;
	var flag = $.cookie('PHPSESSID');
	if(!flag && pathname.indexOf('login') == -1){
		// 没有登录
		location.href = '/login'
	}
	// 实现登录功能
	$('#loginForm').submit(function(){
		var formData = $(this).serialize();
		$.ajax({
			type : 'post',
			// url : 'http://api.studyit.com/login'
			url : '/api/login',
			data : formData,
			dataType : 'json',
			success : function(data){
				if(data.code == 200){
					// console.log(data.result);
					var logInfo = JSON.stringify(data.result);
					// 实现cookie数据的跨页面共享
					$.cookie('logInfo',logInfo,{path : '/'});
					location.href = '/index/index'
				}
			},
			error : function(data){
				console.log(data.responseText);
			}
		});
		return false;//阻止默认行为
	});

	// 退出功能
	$('#logoutId').click(function(){
		$.ajax({
			type : 'post',
			url : '/api/logout',
			dataType : 'json',
			success : function(data){
				if(data.code == 200){
					console.log(data);
					location.href = '/index/login';
				}
			}
		});
	});

	// 渲染登录信息
	var pathname=location.pathname;
	if(pathname.indexOf('login')){
		var obj = JSON.parse($.cookie('logInfo'));
		// var html=template("logInfo",obj);
		// $('.aside .profile').html(html);
	}
	var tpl='<div class="avatar img-circle">'+'<img src="{{tc_avatar}}">'+'</div>'+'<h4>{{tc_name}}</h4>'
	var render=template.compile(tpl);
	var html=render(obj);
	$('.aside .profile').html(html);
	
});
