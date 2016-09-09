/**
 * API展台
 */
app.controller('apiBoothCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', '$timeout', '$state',
    function($scope, globalConfig, $rootScope, dataService, $timeout, $state) {

        // $scope.currentState = $state.current.name;

        $scope.date={
            mySelectVal:''
        };

        // $scope.droplistData = {
        //     typeList: [
        //         {
        //             id:22,
        //             name:'标签'
        //         },
        //         {
        //             id:23,
        //             name:'主键'
        //         }
        //     ],
        //     labelLevelList:[
        //         {
        //             id:1,
        //             name:'一级标签'
        //         },
        //         {
        //             id:2,
        //             name:'二级标签'
        //         }
        //     ]
        // };

        // 设置高度
        $(".bq_wrap").css({"height":$(window).height(),"overflow-x":"hidden"});

        //初始化表签树
        $scope.initTree = function(id,searchName) {
            $rootScope.safeApply(function() {
                $scope.myTreeOption = {
                    url: 'queryApiTree',
                    parms: {
                        rootId: id,
                        searchName:searchName
                    },
                    delValue: id == 'undefined' ? 0 : id,
                    fun: function(data) {
                        $scope.getDetail(data);
                    }
                }
            });
        };
        // $scope.$watch('dataVal', function (newValue) {
        //     if($scope.dataVal==undefined) {
        //         dataService.getData('queryApiTree',{
        //             rootId: 24
        //         }).success(function (res) {
        //
        //             $scope.getDetail(res.data.children[0].children[0].children[0].children[1].children[0])
        //         })
        //     }
        // });


        $scope.initTree();
        //判断是标签则执行方法
        $scope.getDetail = function(data) {
            $scope.dataVal=data;
            // console.log(data.data)
            if(data.data==undefined){
                $scope.getLabelDetail(data.id);
                getTagName(data.id);
            }else {
                $scope.getLabelDetail(data.data.id);
                getTagName(data.data.id);
            }

        };
        //获取标签详情
        $scope.getLabelDetail = function(id) {
            dataService.getData('queryApiBoothList', {
                category: id
            }).success(function(res) {

                $scope.detailData = res.data;

                //获取类目路径
                // if($scope.detailData.category != null){
                //     getLabelPath($scope.detailData.category);
                // }

                // function getLabelPath(id) {
                //     //访问接口
                //     dataService.getData('getLabelPath', {
                //         id: id
                //     }).success(function(rs) {
                //         $scope.pathName =rs.data.pathName;
                //     });
                // }

                // if(res.data.labelLevel){
                //     $scope.detailData.labelLevel = parseInt(res.data.labelLevel);
                // }
                // if(res.data.type){
                //     $scope.detailData.type = parseInt(res.data.type);
                // }
                // $scope.comboBoxInit({
                //     url: 'getCategoryTree',
                //     delValue: res.data.category,
                //     parms: {
                //         rootId: 24
                //     }
                // });
            })

        };

        //获取中文名  英文名
        function getTagName(id) {
            //访问接口
            dataService.getData('queryApiBoothList', {
                category: id
            }).success(function (rs) {
                $scope.getLabelCodeName = rs.data;
                $scope.getLabelCodeName.codeName = rs.data.code;
                $scope.getLabelCodeName.chineseName = rs.data.name;
            });
        }

        //标签类目
        $scope.comboBoxInit = function(option) {
            $scope.safeApply(function() {
                $scope.comboBoxOption = {
                    url: option.url,
                    parms: option.parms || {
                        rootId: 0,
                        state: option.state
                    },
                    width: option.width || 398,
                    delValue: option.delValue == 'undefined' ? 0 : option.delValue,
                    onSelected: option.onSelected
                }
            });

        };
        // $scope.comboBoxInit({
        //     url: 'getCategoryTree',
        //     delValue: 24,
        //     parms: {
        //         rootId: 24
        //     }
        // });

        // dataService.getData('getLabelInfoCount','').success(function(res){
        //     //测试数据
        //     var testData = {
        //         allCount:'测试数据001',
        //         onlineCount:'测试数据001属下',
        //         levelFCount:'测试数据001属下士官'
        //     };
        //     $scope.dataInfo = testData;
        //
        // });


        //搜索
        $scope.mySelectClick=function(){
            $scope.initTree('',$scope.date.mySelectVal);
        }
    }
]);