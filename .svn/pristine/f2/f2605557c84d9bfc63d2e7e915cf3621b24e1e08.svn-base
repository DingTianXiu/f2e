(function($) {
var ms = {
	init: function(obj, args) {
		return(function() {
			ms.fillHtml(obj, args);
			ms.bindEvent(obj, args);
		})();
	},
	//填充html
	fillHtml: function(obj, args) {
		return(function() {

			var start = args.current;
			var pageCount = args.pageCount;

			obj.empty();
			//上一页
			if(start > 1) {
				obj.append('<a href="javascript:;" class="prevPage"></a>');
			} else {
				obj.remove('.prevPage');
				obj.append('<span class="disabled prevPage"></span>');
			}

			if(pageCount - start < 4 && pageCount < 5) {

				for(var i = 1; i <= pageCount; i++) {
					if(i != start) {
						obj.append('<a href="javascript:;" class="tcdNumber">' + i + '</a>');
					} else {
						obj.append('<span class="current on">' + i + '</span>');
					}
				}
			} else if(pageCount - start < 4 && pageCount > 4) {
				for(var j = 1; j <= 4; j++) {
					if((pageCount + j - 4) != start) {
						obj.append('<a href="javascript:;" class="tcdNumber">' + (pageCount + j - 4) + '</a>');
					} else {
						obj.append('<span class="current on">' + (pageCount + j - 4) + '</span>');
					}
				}

			} else {
				obj.append('<span class="current on">' + start + '</span>');

				if(pageCount - start > 1 && pageCount > start) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + (start + 1) + '</a>');
				}
				if(pageCount - start == 2) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + (start + 2) + '</a>');
				}

				if(start + 2 < pageCount && pageCount > 4 && pageCount - start > 3) {
					obj.append('<span class="ellipsis">...</span>');
				}
				if(start != pageCount && start == pageCount - 3) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + (pageCount - 1) + '</a>');
				}
				if(start != pageCount && start < pageCount - 2) {
					obj.append('<a href="javascript:;" class="tcdNumber">' + pageCount + '</a>');
				}

			}

			if(start < pageCount && pageCount > start + 3) {
				obj.append('<a href="javascript:;" class="nextPage"></a>');
			} else {
				obj.remove('.nextPage');
				obj.append('<span class="disabled nextPage"></span>');
			}

			$('.tcdPageCode').append('<span class="current">共' + pageCount + '页</span>');
			if(pageCount > 5) {
				$('.tcdPageCode').append('<input class="jump_num" value="0"  maxlength="3"/><span class="current jump_to" style="background: #7e8e9f;color: #fff;" >跳转</span>');
			}
		})();
	},

	//绑定事件
	bindEvent: function(obj, args) {
		return(function() {
			obj.on("click", "a.tcdNumber", function() {
				var current = parseInt($(this).text());
				ms.fillHtml(obj, {
					"current": current,
					"pageCount": args.pageCount
				});
				if(typeof(args.backFn) == "function") {
					args.backFn(current);
				}
				$('.some-select').show();
				$('.cz-select').hide()
			});
			//上一页
			obj.on("click", "a.prevPage", function() {
				var current = parseInt(obj.children("span.current").text());
				ms.fillHtml(obj, {
					"current": current - 1,
					"pageCount": args.pageCount
				});
				if(typeof(args.backFn) == "function") {
					args.backFn(current - 1);
				}
				$('.some-select').show();
				$('.cz-select').hide()
			});
			//下一页
			obj.on("click", "a.nextPage", function() {
				var current = parseInt(obj.children("span.current").text());
				ms.fillHtml(obj, {
					"current": current + 1,
					"pageCount": args.pageCount
				});
				if(typeof(args.backFn) == "function") {
					args.backFn(current + 1);
				}
				$('.some-select').show();
				$('.cz-select').hide()
			});
			//跳转
			obj.on("click", ".jump_to", function() {

				var current = parseInt($('.jump_num').val());
				if(current > args.pageCount || current == 0) {
					alert('请填写正确数据');
					return false;
				}
				ms.fillHtml(obj, {
					"current": current,
					"pageCount": args.pageCount
				});
				if(typeof(args.backFn) == "function") {
					args.backFn(current);
				}
				$('.some-select').show();
				$('.cz-select').hide()
			});
		})();
	}
}
$.fn.createPage = function(options) {
		var args = $.extend({
			pageCount: 10,
			current: 2,
			backFn: function() {}
		}, options);
		ms.init(this, args);
	}
	})(jQuery);