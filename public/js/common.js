
	NProgress.start();

	NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	
	
	// 过滤掉在登录页的情况
	var pathname=location.pathname;
	var flag=$.cookie('PHPSESSID');
	if(!flag && pathname.indexOf('login')==-1){
		location.href='/login';
	}