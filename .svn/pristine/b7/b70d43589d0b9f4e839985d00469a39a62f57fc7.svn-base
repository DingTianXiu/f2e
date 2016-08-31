app.controller('showcaseexampleDetailCtrl', ['$scope', '$stateParams', '$cookies', 'globalConfig', 'dataService', 'toaster', '$timeout',
	function($scope, $stateParams, $cookies, globalConfig, dataService, toaster, $timeout) {
		var _id = $stateParams.id;
        $scope.initDataa = {};
		$scope.initDataTableData = {};
		$scope.initTempData = {
			previewChartUrl: '/chartPreview.html',
			checkChart: '?'
		};
		// 更新提交预览的状态
		$scope.updateValid = function(val) {
				$scope.initTempData.checkChart = val;
				$scope.$apply();
			}
		$scope.$watch('initTempData.checkChart', function(data) {
			if(false==data){
				toaster.pop({
					type: 'error',
					title: '',
					body: '预览失败',
					showCloseButton: false
				});
			}
		});
			//根据实例ID 获取实例详情
		function getInitData() {
			dataService.getData('getWidget', {
				id: _id
			}).success(function(ws) {
				$scope.initDataTableData = ws.data;

				dataService.getData('getWidgetForEdit', {
					id: ws.data.widgetId
				}).success(function(ret) {
										$scope.initDataa = ret.data;
					$scope.initDataTableData.downloadUrl = globalConfig.api.downloadFile + '/' + ret.data.pkgFileUid + '?ticket=' + $cookies.get('auth');

					$scope.initDataTableData.pluginFileUid = ret.data.pluginFileUid;
					$timeout(function() {
						$scope.initDataTableData.ticket = $cookies.get('auth');
						$('.CodeMirror').each(function(i, el) {
							el.CodeMirror.refresh();
							if (i == 0) {
								$scope.initDataTableData.sampleStyle = el.CodeMirror.getValue();
							}
							if (i == 1) {
								$scope.initDataTableData.sampleData = el.CodeMirror.getValue();
							}
						});
$scope.initDataTableData.checkChart = false;
						document.getElementById('previewIfrom').contentWindow.updatedata($scope.initDataTableData);

					}, 1000);

				});
			});
		}
		getInitData();
		//关闭
		$scope.close = function(){
			window.close();
		}
		//重置
		$scope.resetCode = function() {
				getInitData();
				var iframe = document.getElementById('previewIfrom');
				iframe.contentWindow.location.reload();
			}
			//下载按钮
		$scope.downLoadJs = function() {
			window.location.href = $scope.initDataTableData.downloadUrl;

		}
		//运行
		$scope.previewExamp = function() {
			var iframe = document.getElementById('previewIfrom');
			iframe.contentWindow.location.reload();
			$timeout(function() {
				$scope.initDataTableData.ticket = $cookies.get('auth');
				$('.CodeMirror').each(function(i, el) {
					el.CodeMirror.refresh();
					if (i == 0) {
						$scope.initDataTableData.sampleStyle = el.CodeMirror.getValue();
					}
					if (i == 1) {
						$scope.initDataTableData.sampleData = el.CodeMirror.getValue();
					}
				});

				document.getElementById('previewIfrom').contentWindow.updatedata($scope.initDataTableData);

			}, 1000);
		}
	}
]);
//===================================鼠标事件================================
function mouover() {
	var ps = $("#div_pro").position();
	$("#float_box").css("position", "absolute");
	$("#float_box").css("left", ps.left + 20); //距离左边距  
	$("#float_box").css("top", ps.top + 20); //距离上边距  
	$("#float_box").css("z-index", "9");
	$("#float_box").show()
};

function mouout() {
	$("#float_box").hide()
}
//运行
/*function previewExamp() {
	var iframe = document.getElementById('previewIfrom');
	iframe.contentWindow.location.reload();
}*/