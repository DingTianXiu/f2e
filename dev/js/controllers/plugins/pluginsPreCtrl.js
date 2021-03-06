//待审核可视化控件
app.controller('pluginsPreCtrl', ['$scope', 'globalConfig', '$rootScope', '$state', 'dataService','toaster',
	function($scope, globalConfig, $rootScope, $state, dataService,toaster) {
		/**
		 * 页面初始化加载
		 */
		function queryAll() {
			$scope.mySelectLoad();

			//高级下拉加载标识
			$scope.loadAdvanceSelectFalg = 0;

		}

		// 下拉选择数据
		$scope.searchList = {
			list: [],
			currentVal: 'targetId'
		}

		/**
		 * 加载页面查询下拉框
		 */
		$scope.mySelectLoad = function() {
			//获取配置数据
			var selects = $rootScope.defaultAdvancedSearchSelectByPlugins;
			$scope.searchList.list = $rootScope.defaultAdvancedSearchSelectByPlugins.mySelect;
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
				$.each(selects.modifyStatus, function(index, item) {
					useStatusHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
				});
				$("#status").html(useStatusHtml);

				//审核状态
				var modifyStatusHtml = '<option value="">请选择</option>';
				$.each(selects.modifyStatus, function(index, item) {
					modifyStatusHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
				});
				$("#modifyStatus").html(modifyStatusHtml);

				dataService.getData('queryByParentId', {
					parentId: 173
				}).success(function(rs) {
					var widgetSimpleListHtml = '<option value="">请选择</option>';
					$.each(rs.data, function(index, item) {
						widgetSimpleListHtml += '<option value="' + item.name + '">' + item.name + '</option>';
					});
					$("#widgetCatName").html(widgetSimpleListHtml);
				});

			}
		var menu;

		function getLigerMenu(items) {
			menu = $.ligerMenu({
				width: 100,
				items: items


			});
		}

		function itemclick(item) {
			if (item.text == '编辑') {
				pluginPreCtrlPage($scope.parm.id, 1)
			} else if (item.text == '审核') {
				pluginPreCtrlPage($scope.parm.id, 2)
			} else if (item.text == '删除') {
				deletePlugin($scope.parm.id)
			}
		};
		//批量操作
		$scope.getSelectedRows = function () {
			$('.some-select').show()
			$('.cz-select').hide()
			queryList(true)
		}
		//取消选择
		$scope.cancelSelect = function () {
			$('.some-select').hide()
			$('.cz-select').show()
			queryList(false);
		}
		//删除
		$scope.delRows = function () {
			var rows = $scope.g.getSelecteds();
			if(!(rows && rows.length>0)){
				toaster.pop({
					type: 'error',
					title: '',
					body: '请至少勾选一个'
				});
				return;
			}
			var i = 0;
			var ids=[];
			angular.forEach(rows, function (data, arrary) {
				ids.push(data.id)
				if (data.useStatus == 'y') {
					toaster.pop({
						type: 'error',
						title: '',
						body: '存在不可以删除的数据',
						showCloseButton: false
					});
					++i;
					return  forEach.break();
				}
			})
			$scope.index=layer.confirm('确认删除控件源吗？', {
				// icon: 3
			},function(){
				if (i == 0) {
					dataService.getData('delePlugins',{id:ids.join(',')}).success(function (res){
						if(res.status==200){
							toaster.pop({
								type: 'success',
								title: '',
								body: '删除成功',
								showCloseButton: false
							});
							//关闭弹窗
							layer.close( $scope.index);
							queryList(); //重新加载页面数据
						}else{
							toaster.pop({
								type: 'error',
								title: '',
								body: '删除失败',
								showCloseButton: false
							});
						}
					})
				}
			})

		}
			//加载列表
		function queryList(test) {
			if(test == undefined) {
				queryAll();
			}
			var H = document.documentElement.clientHeight;
			var val = {
				pageSize: Math.floor((H - 350) / 40)>0?Math.floor((H - 350) / 40):1
			};
			$.extend(val, test);
			if(true==test||false==test){

				dataService.getData('queryWidgetModifyAdvance', val).success(function(rs) {

					$scope.g =	$("#tables_con_show").ligerGrid({
						columns: globalConfig.pluginsList.pre.columns,
						cssClass: "ligerClass",
						headerRowHeight: 45,
						rowHeight: 40,
						checkbox: test,
						frozenCheckbox: false,
						pageParmName: 'pageNum',
						pagesizeParmName: 'pageSize',
						// columnWidth: 150,
						alternatingRow: false, //单双行差异去除
						data: {
							Rows: rs.data
						},
						record: rs.total,
						onBeforeShowData: function (data) {
							$('.l-panel-bar').remove();
							if(rs.data==null){
								$('.l-grid2').css('left','0px')
							}
						},
						onAfterShowData: function(data) {
							var gird1Width = $('.l-frozen .l-grid1').width();
							$('.l-grid2').css({
								right: gird1Width,
								left: '0px',
								width: 'auto'
							});
						}
					});
				});
			}

			dataService.getData('queryWidgetModifyAdvance', val).success(function(rs) {

				$("#tables_con_show").ligerGrid({
					columns: globalConfig.pluginsList.pre.columns,
					cssClass: "ligerClass",
					headerRowHeight: 45,
					rowHeight: 40,
					pageParmName: 'pageNum',
					pagesizeParmName: 'pageSize',
					// columnWidth: 150,
					alternatingRow: false, //单双行差异去除
					data: {
						Rows: rs.data
					},
					record: rs.total,
					onAfterShowData: function(data) {
						var gird1Width = $('.l-frozen .l-grid1').width();
						$('.l-grid2').css({
							right: gird1Width,
							left: '0px',
							width: 'auto'
						});
					},
					onBeforeShowData: function (data) {
						$('.l-panel-bar').remove();
						if(rs.data==null||rs.data==''){
							$('.l-grid2').css('left','0px')
						}
					},
					onContextmenu: function (parm, e) {
						$scope.parm = parm.data;
						var items = [{
							text: '编辑',
							click: itemclick
						}];
						if (parm.data.modifyStatus == 'wait_audit') {
							items.push({
								text: '审核',
								click: itemclick
							})
						}
						if (parm.data.useStatus!= 'y') {
							items.push({
								text: '删除',
								click: itemclick
							})
						}

						getLigerMenu(items);
						menu.show({
							top: e.pageY - e.offsetY
						});
						return false;
					}

				});
			});

		}
		dataService.getData('queryWidgetModifyAdvance',{pageSize:10000}).success(function(rs) {
			var H = document.documentElement.clientHeight;

			var val = {
				pageSize: Math.floor((H - 350) / 40)
			};
			if (val.pageSize<= 0) {
				val.pageSize=1
			}
			var page = Math.ceil(rs.total / val.pageSize);
			if (page == 0) {
				$('.bottomPage').remove()
				$('.l-panel-bar').remove()
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
					queryList(val)

				}
			});
		})
		queryList();

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

		// 是否是文本框搜索
		$scope.isInput = true;

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
				if($scope.searchList.currentVal == 'modifyStatus') {
					option[$scope.searchList.currentVal] = $('#modifyStatusS').val();
				} else {
					option[$scope.searchList.currentVal] = angular.copy($scope.mySelectVal);
				}
				queryList(option);

			}
		}
		// 获取下拉选中项
		$scope.getDownlistValue = function() {

			var val = $scope.searchList.currentVal;
			if(val === 'modifyStatus') {
				$scope.isInput = false;
			} else {
				$scope.isInput = true;
			}

		}

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

			queryList(option);

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
				type: 'pre'
			});
		}

		// 跳转到修改控件页
		$scope.toAuditPage = function(id) {
			$state.go('g.plugins.audit', {
				id: id
			});
		}
	}
]);
/**
 * 跳转控制
 */
function pluginPreCtrlPage(id, type) {
	var scope = angular.element($("#windowLoad")).scope();
	if(type == 1) { //修改
		scope.toEditPage(id);
	} else if(type == 2) { //审核
		scope.toAuditPage(id);
	} else if(type == 3) { //删除
		scope.deletePlugin(id);
	}
}

// 删除标签信息
function deletePlugin(id) {
	var params = {
		modifyId: id
	}
	layer.confirm('确认删除该可视化控件吗？', {
		// icon: 3
	}, function(index) {
		var scope = angular.element($("#windowLoad")).scope();
		$.ajax({
			type: 'POST',
			headers: {
				'ticket': Cookies.get('auth') || ''
			},
			url: '/wlgfapi/widget/deleteWidgetModify',
			data: params,
			dataType: "json"
		}).done(function(data) {
			// alert(data.status);
			if(data.status == 200) {
				//console.log(JSON.stringify(data));
				layer.msg('删除成功！');
				scope.queryList(); //重新加载页面数据
			} else {
				layer.msg(data.msg);
			}
		}).fail(function() {
			layer.msg('删除失败啦！');
		});
	});
}