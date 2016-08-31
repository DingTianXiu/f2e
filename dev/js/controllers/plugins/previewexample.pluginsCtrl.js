//实例预览
app.controller('previewexample.pluginsCtrl', ['$scope', '$state', '$cookies', 'globalConfig', 'dataService', '$stateParams', '$timeout','toaster',
	function($scope, $state, $cookies, globalConfig, dataService, $stateParams, $timeout,toaster) {
		var _id = $stateParams.id;

		$scope.initDataTableData = {};
		$scope.initTempData = {
			thumbnail: '',
			previewChartUrl: '/chartPreview.html',
			checkChart: '?'
		};
		//根据实例ID 获取实例详情
		function getInitData() {
			dataService.getData('getWidget', {
				id: _id
			}).success(function(ws) {
				$scope.initDataTableData = ws.data;
				$scope.initTempData.thumbnail = globalConfig.api.getres + '/' + ws.data.thumbnailFileUid + '?ticket=' + $cookies.get('auth');
				dataService.getData('getWidgetForEdit', {
					id: ws.data.widgetId
				}).success(function(ret) {
					$scope.initDataTableData.pluginFileUid = ret.data.pluginFileUid;
					$timeout(function() {
						$scope.initDataTableData.ticket = $cookies.get('auth');
						document.getElementById('chartPreviewIframe').contentWindow.updatedata($scope.initDataTableData);
					}, 100);
				});
			});
		}
		getInitData();
		$scope.aClick1 = false;
		$scope.aClick2 = true;
		//预览图按钮
		$scope.previewClick = function() {
				$('#preview').show();
				$('#thumbnail').hide();
				$scope.aClick1 = false;
				$scope.aClick2 = true
			}
			//缩略图按钮
		$scope.thumbnailClick = function() {
				$('#preview').hide();
				$('#thumbnail').show();
				$scope.aClick1 = true;
				$scope.aClick2 = false
			}
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
	}
]);