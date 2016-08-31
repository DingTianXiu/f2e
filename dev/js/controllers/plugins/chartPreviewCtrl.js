/**
 * 控件预览
 */
// 插入script标签
var chartPreviewApp = angular.module('ChartPreviewApp', ['angularLoad']);
chartPreviewApp.constant('d3', d3);

chartPreviewApp.controller('chartPreviewCtrl', ['$scope', '$window', '$timeout', '$q', 'angularLoad',
    function ($scope, $window, $timeout, $q, angularLoad) {

        // 父层数据
        $scope.parentData = {
            pluginFileUid: '',
            ticket: ''
        };
        // 父数据
        var parentScope = $window.parent.angular.element($window.frameElement).scope();

        // 页面数据
        $scope.pageData = {
            chartLoaded: false
        };

        window.updatedata = function (data) {
            $scope.pageData.chartLoaded = false;
            angular.element('#chartPreview').empty();
            $scope.$apply(function () {
                $scope.parentData = data;

                $q.all([
                    angularLoad.loadScript('/wlgfapi/file/res/' + $scope.parentData.pluginFileUid + '?ticket=' + $scope.parentData.ticket).catch(function (data) {
                        parentScope.updateValid(false)
                    })
                ]).then(function (rs) {
                    $timeout(function () {

                        $scope.pageData.chartLoaded = true;
                        var _params = $scope.$eval($scope.parentData.sampleStyle);
                        var isTure = [undefined]
                        if (rs.toString() != isTure.toString()&&typeof _params === 'object') {
                            simplePie(_params);
                            parentScope.updateValid(true)
                        }else{
                            parentScope.updateValid(false)
                        }
                    }, 1500)
                })


            });
        };
    }
]);
