
$(function(){
	// 高级搜索的打开与关闭
	$(".high_search .close").click(function(){
		$(".high_search").hide();
		$(".mask").hide();
	})
	$("#sub2").click(function(){
		$(".mask").show();
		$(".high_search").show();
		return false;
	})

	// 自定义字段的打开与关闭
	$(".diy .close").click(function(){
		$(".diy").hide();
		$(".mask").hide();
	})
	$("#sub3").click(function(){
		$(".mask").show();
		$(".diy").show();
		return false;
	})

	/*耳机菜单*/
	$(".nav2>p,.nav1>p").click(function(){
		$(this).parent().find(".nav_con").slideToggle();
		var src = $(this).find("img").attr("src");
		if(src=="images/1.png"){
			src="images/2.png"
		}else{
			src="images/1.png"
		}
		$(this).find("img").attr("src",src)
	})

	// alert($(window).width())

	$("#li2").hover(function(){
		$(this).css({"background":"#ffffff"});
		$(this).find("a").css({"color":"#666666"});
		$(this).find("a img").attr({"src":"images/up.png"});
		$(this).find(".li2_con").show();
	},function(){
		$(this).css({"background":"#304274"});
		$(this).find("a img").attr({"src":"images/down.png"});
		$(this).find("a").css({"color":"#ffffff"});
		$(this).find(".li2_con").hide();
	})

	$(".info").hover(function(){
		$(".login_out").show().css({"border":"none"});
		$(this).css({"background":"#ffffff"});
		$(this).find(".name").css({"color":"#304274"});
		$(this).find(".fr img").attr({"src":"images/up.png"});
	},function(){
		$(".login_out").hide().css({"border":"#666666"});
		$(this).css({"background":"#304274"});
		$(this).find(".name").css({"color":"#ffffff"});
		$(this).find(".fr img").attr({"src":"images/down.png"})
	})
})