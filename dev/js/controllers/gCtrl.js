/**
 * 全局大框
 */
app.controller('gCtrl', ['$scope','$rootScope', '$state', '$stateParams', '$cookies', '$localStorage', '$window', 'globalConfig',
	function($scope,$rootScope, $state, $stateParams, $cookies, $localStorage, $window, globalConfig) {
		// 用户信息
		$scope.userInfo = $localStorage.userInfo;
		// console.log($scope.userInfo);
		if (!$localStorage.userInfo) {
			$state.go('login');

		}
		$.each($scope.userInfo, function(i,e) {
			if(e.realName){
				$scope.userInfo.realName=e.realName
			}
		});
		// 判断数组是否包含
		$scope.checkPermission = function(item) {
			if ($localStorage.permissionCodes && $localStorage.permissionCodes.indexOf(item) > -1) {
				return true;
			} else {
				return false;
			}
		}

		// 左侧导航打开
		$scope.leftNav = {
			tagconfig: true,
			setting: true,
			sourcegroup: true
		};

		/**
		 * 退出登录
		 */
		$scope.logOut = function() {
			$cookies.remove('auth');
			$cookies.remove('acf_ticket');
			$localStorage.$reset();
			var _host = window.location.host;
			var _logHost = 'sso.dev.adt100.net'; // 开发

			if (_host.indexOf('adt100.com') > -1) {
				_logHost = 'sso007.adt100.com';
			}
			$window.location.href = "http://" + _logHost + "/logout?service=http://" + _host + '/#/login'
			// $state.go('login');
		};
		// 物料、亿商公用头部
		// $(".main .main_top").append('<ul><li><a href="#">亿商</a></li><li><a href="#">BOSS</a></li><li><a href="#">物料工坊</a></li></ul>');


	}


]);

