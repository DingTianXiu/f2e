/**
 * 预览
 */
app.controller('previewPluginCtrl', ['$scope', '$cookies', '$timeout', '$stateParams', 'globalConfig', 'dataService', 'toaster',
  function($scope, $cookies, $timeout, $stateParams, globalConfig, dataService, toaster) {

    var _id = $stateParams.id || ''; //id

    // 表单数据
    $scope.formData = {};

    // 页面配置
    $scope.pageData = {
      step: 1, // 步骤状态
      previewChartUrl: '/chartPreview.html',
      checkChart: '?',
      categoryList: [],
      baseLibList: [],
      sampleList: [],
      currentSample: null,
      currentSampleIndex: 0,
      currentSampleId: null
    }

    // 临时显示数据
    $scope.tempShowData = {
      thumbnail: null,
      previewTabIndex: 0
    }

    // 转化缩略图
    $scope.exchangeThumbnailUrl = function(uid) {
      if (uid) {
        return globalConfig.api.getres + '/' + uid + '?ticket=' + $cookies.get('auth');
      }
    }

    // 更新提交预览的状态
    $scope.updateValid = function(val) {
      $scope.pageData.checkChart = val;
      $scope.$apply();
    }
    $scope.$watch('pageData.checkChart', function(data) {
      if(false==data){
        toaster.pop({
          type: 'error',
          title: '',
          body: '预览失败',
          showCloseButton: false
        });
      }
    });

    // 实例数据
    $scope.sampleData = [];

    // 只读编辑器
    $scope.editorReadonlyOptions = {
      lineWrapping: true,
      lineNumbers: true,
      lang: "js",
      readOnly: 'nocursor',
      mode: {
        name: "javascript",
        json: true
      }
    };

    // 获取控件信息
    function getWigdetInfo(id) {
      dataService.getData('getWidgetModifyAdaptive', {
        id: id
      }).success(function(rs) {
        $scope.formData = rs.data;
        getSampleData(rs.data.targetId);
      });
    }
    getWigdetInfo(_id);

    // 改变实例名称
    $scope.changeSampleVal = function() {
        // 根据id设置索引值
      var indexes = $.map($scope.sampleData, function(obj, index) {
        if (obj.id == $scope.pageData.currentSampleId) {
          return index;
        }
      })
      $scope.pageData.currentSampleIndex = indexes[0];

      $scope.formData.sampleStyle = $scope.sampleData[$scope.pageData.currentSampleIndex].sampleStyle;
      $scope.formData.sampleData = $scope.sampleData[$scope.pageData.currentSampleIndex].sampleData;

      document.getElementById('chartPreviewIframe').contentWindow.updatedata($scope.formData);
    };

    // 获取实例
    function getSampleData(widgetId) {
      dataService.getData('widgetListById', {
        widgetId: widgetId
      }).success(function(rs) {
        $scope.sampleData = rs.data;
        $timeout(function() {
          $scope.formData.ticket = $cookies.get('auth');
          $scope.formData.sampleStyle = rs.data[$scope.pageData.currentSampleIndex].sampleStyle;
          $scope.formData.sampleData = rs.data[$scope.pageData.currentSampleIndex].sampleData;
          $scope.pageData.currentSampleId = rs.data[$scope.pageData.currentSampleIndex].id;
          $scope.formData.thumbnailFileUid = rs.data[$scope.pageData.currentSampleIndex].thumbnailFileUid;
          document.getElementById('chartPreviewIframe').contentWindow.updatedata($scope.formData);
        }, 600);
      });
    }



  }
]);
