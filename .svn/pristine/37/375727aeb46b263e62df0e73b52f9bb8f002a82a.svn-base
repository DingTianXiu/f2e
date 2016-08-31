/**
 * Created by Administrator on 2016/3/17 0017.
 * 角色配置权限页面
 */
app.controller('roleConfigPermissionsDataCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', '$compile', '$stateParams','$state',
    function ($scope, globalConfig, $rootScope, dataService, $compile, $stateParams,$state) {

        /**
         * 页面初始化
         */
        $scope.queryAll = function () {
            $scope.roleId = $stateParams.id;//选中角色id
            $scope.parRoleId = $stateParams.parentId;//上级角色id
            //数据权限
            $scope.getDataCategory();//加载树形菜单
        }

        /**
         * 提交按钮(权限配置)
         */
        $scope.formatData = function () {
            var metaTabelIds = [];
            angular.forEach($scope.checkBoxsOption,function(item,index){
                if(item.checkedStatus){
                    metaTabelIds.push(item.id);
                }
            });

            dataService.getData('roleCreateMetaTableRels', {
                roleId:  $scope.roleId,
                metaDbId:$scope.metaDbId,
                tabelIds:metaTabelIds
            }).success(function (rs) {
                if(rs.status==200){
                    layer.msg('保存成功!',{icon:1})
                }else{
                    layer.msg('保存失败!',{icon:2})
                }

            });
        }

        //===================================数据权限str===================================

        /**
         * 查询用户原始配置数据
         */
        $scope.getUserCheckBox = function(){
            dataService.getData('roleQueryMetaTableByRoleId', {
                roleId:  $scope.roleId
            }).success(function (rs) {
                angular.forEach($scope.checkBoxsOption,function(item,index){
                    angular.forEach(rs.data,function(item1,index1){
                        if(item.id==item1.id){
                            item.checkedStatus=true;
                        }
                    })
                });
            });
        }
        /**
         * 加载需要的数据
         */
        $scope.getDataCategory = function(){
            $scope.getDbData($rootScope.dataCategory[0].code);
            $scope.getDbData($rootScope.dataCategory[1].code);
        }

        /**
         * 查询元数据配置(数据库信息)
         */
        $scope.getDbData = function(id){
            dataService.getData('queryDbsByCategoryId', {
                categoryId: id
            }).success(function (rs) {
                if(id==5){
                    $scope.treeData = [
                        {id:$rootScope.dataCategory[0].code,name:$rootScope.dataCategory[0].name,children:rs.data}
                    ];
                }else{
                    $scope.treeData1 = [
                        {id:$rootScope.dataCategory[1].code,name:$rootScope.dataCategory[1].name,children:rs.data}
                    ];
                    $scope.treeList();//加载树菜单
                }

                return rs.data;
            });
        }

        /**
         * 查询数据表
         */
        $scope.getTableList = function(){
            dataService.getData('queryTablesByDbId', {
                metaDbId: $scope.metaDbId
            }).success(function (rs) {
                $scope.checkBoxsOption = rs.data;
                $scope.getUserCheckBox();//加载用户配置数据

            });
        }

        /**
         * 加载树菜单
         */
        $scope.treeList = function () {

            $("#groupTree").ligerTree({
                data: angular.copy($scope.treeData),
                checkbox: false,
                slide: false,
                attribute: ['id', 'name'],
                textFieldName: 'name',
                single: true,
                nodeWidth: 120,
                onClick: function (node) {
                    $scope.metaDbId = node.data.id;
                    $scope.getTableList()
                }
            });

            $("#groupTree1").ligerTree({
                data: angular.copy($scope.treeData1),
                checkbox: false,
                slide: false,
                attribute: ['id', 'name'],
                textFieldName: 'name',
                single: true,
                nodeWidth: 120,
                onClick: function (node) {
                    $scope.metaDbId = node.data.id;
                    $scope.getTableList()
                }
            });
        }

        $scope.goPage = function(){
            $state.go('g.setting.roleConfig');
        }


        //===================================数据权限end===================================

        $scope.queryAll();
    }
]);