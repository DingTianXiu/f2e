//已审核可视化控件
app.controller('pluginsDoneCtrl', ['$scope', 'globalConfig', '$rootScope', '$state', 'dataService',
	function($scope, globalConfig, $rootScope, $state, dataService) {
		/**
		 * 页面初始化加载
		 */
		function queryAll() {

			//加载页面普通查询下拉
			$scope.mySelectLoad();
			//高级下拉加载标识
			$scope.loadAdvanceSelectFalg = 0;

		}

		/**
		 * 加载页面查询下拉框
		 */
		$scope.mySelectLoad = function() {
			//获取配置数据 
			var selects = $rootScope.defaultAdvancedSearchSelectByPluginsDone;
			//更新周期
			var mySelectHtml = '';
			$.each(selects.mySelect, function(index, item) {
				mySelectHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
			});
			$("#mySelect").html(mySelectHtml);
		}

		/**
		 * 加载高级搜索下拉框
		 */
		$scope.loadAdvanceSelect = function() {

			//获取配置数据
			var selects = $rootScope.defaultAdvancedSearchSelectByPlugins;

			//更新周期
			var refreshCycleHtml = '';
			$.each(selects.refreshCycle, function(index, item) {
				refreshCycleHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
			});
			$("#refreshCycle").html(refreshCycleHtml);

			//使用状态
			var useStatusHtml = '<option value="">请选择</option>';
			$.each(selects.useStatus, function(index, item) {
				useStatusHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
			});
			$("#useStatus").html(useStatusHtml);

			//审核状态
			var modifyStatusHtml = '<option value="">请选择</option>';
			$.each(selects.modifyStatus, function(index, item) {
				modifyStatusHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
			});
			$("#modifyStatus").html(modifyStatusHtml);

		}

		/**
		 * 高级搜索弹窗
		 */
		$scope.advancedSearch = function() {
			if($scope.loadAdvanceSelectFalg != 1) {
				//加载高级搜索下拉框数据
				$scope.loadAdvanceSelect();
				//修改标识状态
				$scope.loadAdvanceSelectFalg = 1;
			}

			$scope.highSearchView = $rootScope.layerOpen({
				title: '高级搜索', //标题
				area: ['730px', '410px'],
				content: $("#highSearch") //div选择器
			})
			$('.layui-layer-shade').remove();
		}

		//==============================页面按钮事件绑定str===================================

		/* $scope.mySelectClick = function () {
		     var option = {};

		     //获取下拉选择条件
		     option[$('#mySelect').val()] = angular.copy($scope.mySelectVal);
		     //赋值查询条件触发列表刷新
		     $scope.highSearchOption = angular.copy(option);

		 }*/
		//禁用页面点击事件
		document.onkeydown = function(event) {
			var target, code, tag;
			if(!event) {
				event = window.event; //针对ie浏览器  
				target = event.srcElement;
				code = event.keyCode;
				if(code == 13) {
					tag = target.tagName;
					if(tag == "TEXTAREA") {
						return true;
					} else {
						return false;
					}
				}
			} else {
				target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
				code = event.keyCode;
				if(code == 13) {
					tag = target.tagName;
					if(tag == "INPUT") {
						return false;
					} else {
						return true;
					}
				}
			}
		};
		//页面搜索
		document.onclick = Hanlder;

		function Hanlder(e) {
			e = e || event;
			var tag = e.srcElement || e.target;
			if(tag.id == 'selectId') {
				var option = {};
				//获取下拉选择条件
				var sval = $("#mySelect").val();
				option[sval] = $("#mySelectVal").val();
				getQueryList(option);

			}
		};
		var menu;

		function getLigerMenu(items) {
			menu = $.ligerMenu({
				width: 100,
				items: items


			});
		}
		function itemclick(item) {
			if (item.text == '编辑') {
				pluginDoneCtrlPage($scope.parm.id, 1)
			} else {
				$state.go('g.plugins.previewUploadPlugin', {
					id: $scope.parm.id
				})
			}
		};
		//加载列表
		function getQueryList(test) {
			if(test == undefined) {
				queryAll();
			}
			var H = document.documentElement.clientHeight;

			var val = {
				pageSize: Math.floor((H - 350) / 40)>0?Math.floor((H - 350) / 40):1
			};
			$.extend(val, test);
			dataService.getData('queryWidgetAdvance', val).success(function(rs) {
				$("#tables_con_show").ligerGrid({
					columns: globalConfig.pluginsList.done.columns,
					cssClass: "ligerClass",
					headerRowHeight: 45,
					rowHeight: 40,
					pageParmName: 'pageNum',
                    alternatingRow: false, //单双行差异去除
					pagesizeParmName: 'pageSize',
					data: {
						Rows: rs.data
					},
					record: rs.total,
					onAfterShowData: function(data) {
						var gird1Width = $('.l-frozen .l-grid1').width();
						$('.l-grid2').css({
							right: gird1Width,
							left: '0px',
							width:'auto'
						});
					},
					onBeforeShowData: function (data) {
						if(rs.data==null||rs.data==''){
							$('.l-grid2').css('left','0px')
						}
						$('.l-panel-bar').remove()
					},
					onContextmenu: function (parm, e) {
						$scope.parm = parm.data;
						var items = [{
							text: '编辑',
							click: itemclick,
						},{
							text: '预览',
							click: itemclick,
						}];
						getLigerMenu(items);
						menu.show({
							top: e.pageY - e.offsetY
						});
						return false;
					}
				});
			});

		}
		dataService.getData('queryWidgetAdvance', '').success(function(rs) {
			var H = document.documentElement.clientHeight;
			var val = {
				pageSize: Math.floor((H - 350) / 40)
			};
			if (val.pageSize<= 0) {
				val.pageSize=1
			}
			var page = Math.ceil(rs.total / val.pageSize);
			if (page == 0) {
				$('.l-panel-bar').remove()
				$('.bottomPage').remove()
				$('.tables_wrap').append("<div class='no_data'><p>暂时没有数据</p></div>")
				return false
			}
			$('.tcdPageCode').createPage({
				pageCount: page,
				current: 1,
				backFn: function(p) {
					var pageNo = {
						pageNum: p
					};
					$.extend(val, pageNo);
					getQueryList(val)

				}
			});
		})
		getQueryList();

		/**
		 * 高级搜索确定按钮
		 */
		$scope.advancedSearchConfirm = function() {
			$scope.mySelectVal = '';
			angular.element('#mySelectVal').val('');
			//获取页面查询条件
			var highSearchInput = $("#highSearch").find('input'); //input标签
			var highSearchSelect = $("#highSearch").find('select'); //select标签

			var option = {};
			$.each(highSearchInput, function(index, item) {
				if($(item).val()) {
					option[$(item).attr('name')] = $(item).val();
				}
			});

			$.each(highSearchSelect, function(index, item) {
				if($(item).val()) {
					var sval = $(item).val();
					sval = sval.substring(sval.indexOf(':') + 1, sval.length);
					option[$(item).attr('name')] = sval;
				}
			});

			//赋值查询条件触发列表刷新
			//          $scope.highSearchOption = angular.copy(option);
			getQueryList(option);

			//关闭弹窗
			$scope.closeAdvancedSearch();
		}

		//关闭高级搜索弹窗
		$scope.closeAdvancedSearch = function() {
			layer.close($scope.highSearchView);
		}

		//==============================页面按钮事件绑定end===================================

		// 跳转到修改控件页
		$scope.toEditPage = function(id) {
			$state.go('g.plugins.modifyplugins', {
				id: id,
				type: 'done'
			});
		}

		// 跳转到修改控件页
		$scope.toPreviewPage = function(id) {
			$state.go('g.plugins.previewUploadPlugin', {
				id: id
			});
		}
	}
]);
/**
 * 跳转控制
 */
function pluginDoneCtrlPage(id, type) {
	var scope = angular.element($("#windowLoad")).scope();
	if(type == 1) { //修改
		scope.toEditPage(id);
	} else if(type == 2) { //预览
		scope.toPreviewPage(id);
	}
}