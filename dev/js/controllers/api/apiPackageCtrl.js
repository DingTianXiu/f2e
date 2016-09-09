/**
 * Created by ArvinChen on 2016/8/31 0031.
 */
/**
 * 标签展台
 */
app.controller('apiPackageCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', 'appUtils',
    function ($scope, globalConfig, $rootScope, dataService,appUtils ) {


        $scope.selectOptions = [{name: '审核通过', code: "1"}, {name: "待审核", code: "2"},{name: "审核不通过", code: "2"}];


        $scope.callFunTest = function(itemData){
            layer.msg("执行保存数据!"+JSON.stringify(itemData));
        }
        $scope.initData = {
            isShowAPI:false,
            pageInfo: {
                listInfo: {
                    pageSize: 10,
                    total: 20,
                    pageNum: 1,
                    data: [
                        {name: '包名1',ms:'描述', select: 1,yy:'测试原因'},
                        {name: '包名2',ms:'描述', select: 2},
                        {name: '包名3',ms:'描述', select: 1},
                        {name: '包名4',ms:'描述', select: 1},
                        {name: '包名5',ms:'描述', select: 1}
                    ]
                },
                apiListInfo:{
                    pageSize: 10,
                    total: 20,
                    pageNum: 1,
                    data: [
                        {name: 'API名称1', select: 1},
                        {name: 'API名称2', select: 2},
                        {name: 'API名称3', select: 1},
                        {name: 'API名称4', select: 1},
                        {name: 'API名称5', select: 1}
                    ]
                }
            },
            updataMsOption:'',//修改描述
        }

        /**
         * 切换列表显示
         */
        $scope.showList  = function(itemData){
            //appUtils.loadHide();
            console.log(itemData);
            $scope.initData.isShowAPI = !$scope.initData.isShowAPI;
        }

        /**
         * 修改描述
         */
        $scope.updateMsOpen = function (itemData){
            $scope.initData.updataMsOption = itemData.ms;
            $rootScope.OPEN = $rootScope.layerOpen({
                title: '修改'+itemData.name+'描述', //标题
                area: ['730px', '410px'],
                content: $("#updateMsOpen") //div选择器
            });
        }

        /**
         * 提交修改描述
         */
        $scope.updateMsApi = function (itemData){
            layer.msg("执行修改描述!"+JSON.stringify($scope.initData.updataMsOption));
            $rootScope.CLOSE_OPEN();
            //itemData.ms = angular.copy($scope.initData.updataMsOption);
        }

        /**
         * 审核
         */
        $scope.checkOpen = function (itemData){
            $scope.initData.updataMsOption = itemData.ms;
            $rootScope.OPEN = $rootScope.layerOpen({
                title: '您正在审核'+itemData.name, //标题
                area: ['730px', '410px'],
                content: $("#checkOpen") //div选择器
            });
        }

        /**
         * 提价审核
         */
        $scope.commitCheckOpen = function (itemData){
            $scope.initData.updataMsOption = itemData.ms;
            $rootScope.OPEN = $rootScope.layerOpen({
                title: '您正在'+itemData.name+'提交审核', //标题
                area: ['730px', '410px'],
                content: $("#commitCheckOpen") //div选择器
            });
        }

    }
]);