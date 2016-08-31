/*
 * 新建实例
 */
app.controller('addexamplePluginsCtrl', ['$scope', '$state', '$cookies', 'globalConfig', 'dataService', 'FileUploader', 'toaster', '$timeout',
	function($scope, $state, $cookies, globalConfig, dataService, FileUploader, toaster, $timeout) {
		
		$scope.submited = false;

		//字符过长提示
    	$scope.maxLength = true;

		// 页面初始数据
		$scope.iniData = {
			name: '', //实例名称
			controList: [], //获取控件列表
			widgetId: null,
			thumbnailFileUid: '', // 缩略图编号
			thumbnailFileName: '', // 缩略图名称
			comment: '', // 表说明
			sampleStyle: '',
			sampleData: '',
			pluginFileUid: ''
		};
		$scope.initTempData = {
			thumbnail: '',
			previewChartUrl: '/chartPreview.html',
			checkChart: '?'
		};
		// 上传状态等
		$scope.upload = {
			uploadAttachment: {
				status: 0,
				progress: 0,
				fileName: ''
			}
		};

		$(".shadow-div").css({"height":($(window).height()-412)/2,"overflow-y":"auto"});
		$("#previewIfrom").css({"height":$(window).height()-412,"overflow-y":"auto"});
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
		//监控输入字符
	    $scope.$watch('iniData.comment', function (newValue) {
	        if(newValue != null){
	            $scope.textLength = newValue.length;
	            if(newValue.length > 200){
	                $scope.maxLength = false;
	                $(".max-length").show();
	            }else{
	                $scope.maxLength = true;
	                $(".max-length").hide();
	            };
	        }else{
	            $scope.textLength = 0;
	        }
	        
	    });
			// 上传附件
		var uploaderAttachment = $scope.uploaderAttachment = new FileUploader({
			url: globalConfig.api.uploadFile + '?type=widget_thumbnail',
			autoUpload: true,
			queueLimit: 1,
			headers: {
				ticket: $cookies.get('auth')
			},
			removeAfterUpload: true,
			onWhenAddingFileFailed: function(item, filter, options) { // 上传前失败
				toaster.clear();
				if(filter.name == 'enforceMaxFileSize') {
					toaster.pop({
						type: 'error',
						title: '',
						body: '上传文件大小超过20M',
						showCloseButton: false
					});
				}
				if(filter.name == 'scriptfileType') {
					toaster.pop({
						type: 'error',
						title: '',
						body: '文件格式应为jpg,png,gif中的一种',
						showCloseButton: false
					});
				}
				$('#uploaderAttachmentid').val('');
			},
			onProgressItem: function(item, progress) {
				$scope.upload.uploadAttachment.status = 1;
			},
			onSuccessItem: function(item, response, status, headers) { // 上传成功
				if(status === 200 && response.status === 200) {
					$scope.upload.uploadAttachment.status = 2; // 上传完成
					$scope.upload.uploadAttachment.fileName = response.data.name; // 文件名
					$scope.iniData.thumbnailFileUid = response.data.uid;
					$('#uploaderAttachmentid').val('');
					$scope.initTempData.thumbnail = globalConfig.api.getres + '/' + response.data.uid + '?ticket=' + $cookies.get('auth');
				} else if(status === 200 && response.status === 503) {
					$scope.upload.uploadAttachment.status = 0; // 上传失败
					toaster.clear();
					toaster.pop({
						type: 'error',
						title: '',
						body: response.msg,
						showCloseButton: false,
					});
					$('#uploaderAttachmentid').val('');
				}
			}
		});
		uploaderAttachment.filters.push({
			'name': 'enforceMaxFileSize',
			'fn': function(item) {
				return item.size <= 20971520; // 20 MiB to bytes
			}
		});
		uploaderAttachment.filters.push({
			'name': 'scriptfileType',
			'fn': function(item) {
				return /^.*?\.(jpg|png|gif)$/.test(item.name)
			}
		});
		// 删除附件
		$scope.delAttachment = function() {
				$scope.upload.uploadAttachment.status = 0;
				$scope.upload.uploadAttachment.progress = 0;
				$scope.upload.uploadAttachment.fileName = '';
				$scope.iniData.thumbnailFileUid = '';
			}
			//获取控件初始值
		getinitExampleList();

		function getinitExampleList() {

			dataService.getData('widgetSimpleList', '').success(function(rs) {

				$scope.iniData.controList = rs.data;
				$scope.iniData.widgetId = rs.data[0]['id'];
				dataService.getData('getWidgetForEdit', {
					id: $scope.iniData.widgetId
				}).success(function(ret) {
					$scope.iniData.pluginFileUid = ret.data.pluginFileUid;
				});

			});
		}
		//切换选择控件
		$scope.changeWidgetId = function() {
			getExampleList();
		};
		// 获取控件名称
		function getExampleList() {
			dataService.getData('getWidgetForEdit', {
				id: $scope.iniData.widgetId
			}).success(function(ret) {
				$scope.iniData.pluginFileUid = ret.data.pluginFileUid;
			});

		}
		$scope.scopevar = 1;
		$scope.commentRed = false;
		if($scope.iniData.comment.length === 200) {
			$scope.commentRed = true;
		}

		//提交第一步
		$scope.firstStep = function() {
			$scope.submited = true;
			dataService.getData('verityByName', {
				name: $scope.iniData.name
			}).success(function(rs) {
				$scope.iniData.isHave = rs.data;
				if(!$scope.iniData.name || !$scope.iniData.thumbnailFileUid || !$scope.iniData.comment) {
					toaster.pop({
						type: 'error',
						title: '',
						body: '有必填项未填写完成，新填写',
						showCloseButton: false
					});
					return false;
				}
				// 长度验证
				if($scope.iniData.name.length > 20) {
					toaster.pop({
						type: 'error',
						title: '',
						body: '实例名称长度超过20个字',
						showCloseButton: false
					});
					return false;
				}
				if($scope.iniData.comment.length > 200) {
					toaster.pop({
						type: 'error',
						title: '',
						body: '实例说明长度超过200个字',
						showCloseButton: false
					});
					return false;
				}
				if($scope.iniData.isHave == false) {
					toaster.pop({
						type: 'error',
						title: '',
						body: '实例名已存在',
						showCloseButton: false
					});
					return false;
				}
				$('.step1').hide();
				$('.step2').show();
				$scope.scopevar = 2;

			});
		}
		$scope.secondStep = function() {
			if(!$scope.iniData.sampleDate || !$scope.iniData.sampleStyle) {
				toaster.pop({
					type: 'error',
					title: '',
					body: '有必填项未填写完成，新填写',
					showCloseButton: false
				});
				return false;
			}
			if($scope.initTempData.checkChart!=true) {
				toaster.pop({
					type: 'error',
					title: '',
					body: '自动预览不成功，不能进行提交！',
					showCloseButton: false
				});
				return false;
			}
			$('.step1').hide();
			$('.step2').hide();
			
			$scope.submited = true;

			if($scope.createtagform.$valid) {

				var params = {
					name: $scope.iniData.name,
					widgetId: $scope.iniData.widgetId,
					comment: $scope.iniData.comment,
					sampleData: $scope.iniData.sampleDate,
					sampleStyle: $scope.iniData.sampleStyle,
					isDefault: 'y',
					thumbnailFileUid: $scope.iniData.thumbnailFileUid, // 缩略图
					comment: $scope.iniData.comment // 表说明
				};

				dataService.postData('createWidget', params).success(function(rs) {
					if(rs.status === 200) {
						toaster.clear();
						$('.step3').show();
						$('.step2').hide();
						$scope.scopevar = 3;
					} else {
						$scope.submited = false;
					}
				})
			}
		}
		// $scope.backSecStep = function() {
		// 	$('.step1').show();
		// 	$('.step2').hide();
		// 	$('.step3').hide();
		// 	$scope.scopevar1 = true;
		// 	$scope.scopevar2 = true;
		// }
		$scope.backExampleList = function() {
			$state.go('g.plugins.exampleList')
		}

		$scope.previewExamp = function() {
			var iframe = document.getElementById('previewIfrom');
			iframe.contentWindow.location.reload();
			$timeout(function() {
				$scope.iniData.ticket = $cookies.get('auth');
				$('.CodeMirror').each(function(i, el) {
					el.CodeMirror.refresh();
					if(i == 0) {
						$scope.iniData.sampleStyle = el.CodeMirror.getValue();
					}
					if(i == 1) {
						$scope.iniData.sampleData = el.CodeMirror.getValue();
					}
				});

				document.getElementById('previewIfrom').contentWindow.updatedata($scope.iniData);

			}, 1000);
		}

		$scope.cancelTag = function() {
			$(".mask").show();
		};
		//继续设置
		$scope.next = function() {
			$(".mask").hide();
		};
	}
]);