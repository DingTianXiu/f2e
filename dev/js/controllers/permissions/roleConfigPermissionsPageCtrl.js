/**
 * Created by Administrator on 2016/3/17 0017.
 * 角色配置权限页面
 */
app.controller('roleConfigPermissionsPageCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', '$compile', '$stateParams',
    function ($scope, globalConfig, $rootScope, dataService, $compile, $stateParams) {

        /**
         * 页面初始化
         */
        $scope.queryAll = function () {
            $scope.roleData = null;//页面所有权限数据
            $scope.roleSelectData = null;//下拉框数据
            $scope.roleId = $stateParams.id;//选中角色id
            $scope.parRoleId = $stateParams.parentId;//上级角色id
            $scope.pageDataOption = null;//所有权限信息
            $scope.queryRoleList();//加载角色下拉
            $scope.getPageDate();//加载权限配置数据
        }


        /**
         * 查询角色下拉框
         */
        $scope.queryRoleList = function () {
            // 查询所有权限信息
            dataService.getData('queryRoleByParentId', {
                parentId: $scope.parRoleId
            }).success(function (rs) {
                $scope.roleSelectData = rs.data;
                $scope.roleIdSelect = Number($scope.roleId);

            })
        }

        /**
         * 查询页面权限显示数据
         */
        $scope.getPageDate = function () {
            $('input[type="checkbox"]').unbind('click');
            // 查询所有权限信息
            dataService.getData('permissionGetTree', {
                rootId: 0, withLeaf: true
            }).success(function (rs) {
                $rootScope.safeApply(function () {
                        $scope.showPageOption = {
                            pageOption: angular.copy($rootScope.treeDataUtil(rs.data.children))
                        }
                        $scope.getRoleData();//加载用户角色信息
                    }
                );

            });
        }

        $scope.getRoleData = function (change) {
            if (change != undefined) {
                $scope.roleId = $scope.roleIdSelect;
            }
            // 根据角色id查询权限信息
            dataService.getData('permissionQueryAllByRoleId', {
                roleId: $scope.roleId
            }).success(function (rs) {
                $scope.roleData = angular.copy(rs.data);//渲染页面
                $('input[type="checkbox"]').unbind('click');

                var roles = $('input[type="checkbox"]');

                //初始化选中状态
                $.each(roles, function (index, item) {
                    $(item).prop('checked', false);
                    $(item).prop('disabled', false);
                })

                //设定选框初始状态
                $.each(roles, function (index, item) {
                    var name = $(item).attr('name');//name属性用于表示层级结构

                    //判定权限的状态(n/停用,y启用)
                    if ($(item).attr('status') == 'n') {
                        $(item).prop('disabled', true);
                        $(item).parent().parent().remove();
                        $.each($('input[name^="' + name + '"]'), function (index1, item1) {//设置所有子集锁定
                            $(item1).prop('disabled', true);
                            $(item1).parent().remove();
                        });
                    }

                    //数据初始化
                    var flagRole = false;//是否选中
                    var flagParent = false;//是否锁定


                    $.each($scope.roleData, function (index1, item1) {
                        if ($(item).attr('id') == "d-" + item1.id) {//判断权限id跟input上的值
                            flagRole = true;
                            flagParent = item1.inherited;//设定锁定的值
                        }

                        //判断状态锁定

                        //if(item1.status=='n'){//判断停用启用状态
                        //    $(item).prop('disabled', true);
                        //    $.each($('input[name^="' + name + '"]'), function (index11, item11) {//设置所有子集锁定
                        //        $(item11).prop('disabled', true);
                        //
                        //    });
                        //
                        //    console.log(item1);
                        //}
                    });

                    if (flagRole) {//判断是否选中
                        $(item).prop('checked', true);//设置选中
                        $.each($('input[name^="' + name + '"]'), function (index1, item1) {//设置所有子集选中
                            $(item1).prop('checked', true);
                        });

                        if (flagParent) {//判断是否锁定
                            $(item).prop('disabled', true);
                            $.each($('input[name^="' + name + '"]'), function (index1, item1) {//设置所有子集锁定
                                $(item1).prop('disabled', true);
                            });
                        }
                    }
                });

                $scope.checkedClick();//执行绑定点击事件

            });

        }

        /**
         * 点击复选框事件绑定
         */
        $scope.checkedClick = function () {
            $('input[type="checkbox"]').unbind('click');//避免重复绑定

            $('input[type="checkbox"]').bind('click', function () {

                var name = $(this).attr('name');//选中元素name值
                var names = name.split('-');//得到层级关系

                if ($(this).prop('checked') != true) {//判断操作选中状态(f选中,t取消)
                    //取消选中操作

                    $.each($('input[name^="' + name + '"]'), function (index, item) {//选中所有子集

                        //判断锁定状态
                        if ($(item).attr('disabled') != 'disabled') {
                            $(item).prop('checked', false);//设置没有锁定的子集为未选中状态

                            //=====================取消全选str=======================
                            var nameChecked = ""
                            $.each(names, function (index1, item1) {
                                if (index1 >= names.length - 1) {//最后一个不取消选中
                                    return false;
                                }
                                nameChecked += names[index1]
                                $("input[name='" + nameChecked + "']").prop('checked', false);
                                nameChecked += "-";
                            });
                            //$("input[name='" +names[0]+ "']").prop('checked', false);
                            //$("input[name='" +names[0]+"-"+names[1] + "']").prop('checked', false);
                            //=====================取消全选end=======================
                        }
                    });
                } else {
                    //选中多选框操作
                    $.each($('input[name^="' + name + '"]'), function (index, item) {//选中所有子集
                        $(item).prop('checked', true);//设定选中状态
                        //if(!$(item).prop('checked')){
                        //    allFlag=false;
                        //}
                    });
                    noAllChecked(names);//检测全选选择

                }


            })
        }
        function noAllChecked(names) {
            if (names.length - 1 < 0)
                return;

            //获取上一层name
            var nameChecked = ""
            var namess = [];//保存上级数组
            $.each(names, function (index1, item1) {
                if (index1 >= names.length - 1) {
                    return false;
                }
                namess[index1] = names[index1];
                nameChecked += names[index1]
                nameChecked += "-";
            });
            nameChecked = nameChecked.substring(0, nameChecked.length - 1);
            var allFlag = true;
            $.each($('input[name^="' + nameChecked + '"]'), function (index, item) {//判断所有子集
                if ((!$(item).prop('checked')) && ($(item).attr('name') != nameChecked)) {
                    allFlag = false;
                }
            });
            if (allFlag) {
                $("input[name='" + nameChecked + "']").prop('checked', true);
                noAllChecked(namess);
            }
        }

        /**
         * 重置按钮(权限配置)
         */
        $scope.resetFunction = function () {
            $scope.getRoleData();
        }

        /**
         * 提交按钮(权限配置)
         */
        $scope.formatData = function () {
            var roles = $('input[type="checkbox"]:checked');//页面数据
            var ids = [];//提交数据
            var indexZ = 0;//循环状态

            //获取选中数据
            $.each(roles, function (index, item) {
                if ($(item).attr('disabled') != 'disabled') {//排除锁定选框
                    ids[indexZ] = $(item).val();
                    indexZ++;
                }

            });

            //提交请求
            dataService.getData('roleCreatePermissionRels', {
                roleId: $scope.roleId, permissionIds: ids
            }).success(function (rs) {
                if (rs.status == 200) {
                    layer.msg('配置成功!', {icon: 1})
                } else {
                    layer.msg('配置失败!', {icon: 2})
                }

            });

        }
        $scope.queryAll();
    }
]);