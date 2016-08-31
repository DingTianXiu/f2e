/**
 * Created by chenjing on 2016/3/17 0017.
 * 权限管理
 */
app.controller('permissionsConfigCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', '$compile',
    function ($scope, globalConfig, $rootScope, dataService, $compile) {

        /**
         * 页面初始化
         */
        $scope.queryAll = function () {
            $scope.initTree();//加载节点
            $scope.TreeData = [];//保存树上的数据

            $scope.idOption = 0//设置默认选中值
            $scope.queryList();//加载列表
        }

        /**
         * 新增权限弹窗
         */
        $scope.addPermissions = function (type) {
            if (!type) {
                return;
            }

            if (type == 'menu_group') {//添加菜单组
                $scope.closeAddOpen = $rootScope.layerOpen({
                    type: 2,
                    title: '添加权限(菜单组)',
                    content: '/index.html#/dialog/permissionsConfig/addByNavGrounp/'
                });
                return;
            }

            if (type == 'page') {//添加页面
                $scope.closeAddOpen = $rootScope.layerOpen({
                    type: 2,
                    title: '添加权限(页面)',
                    content: '/index.html#/dialog/permissionsConfig/addByPage/'
                });
                return;
            }

            if (type == 'permission') {//添加权限
                $scope.closeAddOpen = $rootScope.layerOpen({
                    type: 2,
                    title: '添加权限(权限)',
                    content: '/index.html#/dialog/permissionsConfig/add/'
                });
                return;
            }

        }

        /**
         * 关闭弹窗事件
         */
        $scope.closeAddSources = function () {
            layer.close($scope.closeAddOpen);
        }

        /**
         * 弹窗回调函数
         */
        $scope.callbackOpen = function () {
            $scope.idOption = angular.copy($("#closeOpen").val());
            $scope.queryList();
            $scope.initTree();
            // $scope.queryList();
        }

        /**
         * 初始化树形菜单
         */
        $scope.initTree = function () {
            $rootScope.safeApply(function () {
                    $scope.myTreeOption = {
                        url: 'permissionGetTree',
                        parms: {rootId: 0,withLeaf:false},
                        fun: $scope.queryList
                    }
                }
            );
        }

        var menu;

        function getLigerMenu(items) {
            menu = $.ligerMenu({
                width: 100,
                items: items
            });
        }

        function itemclick(item) {
            if (item.text == '编辑') {
                updatePermissions($scope.parm.id)
            }
        };
        /**
         * 加载列表
         */
        $scope.queryList = function (id,parType) {

            // //立即检测$watch中变化的值
            // $rootScope.safeApply(
            //     $scope.listModel = angular.copy({
            //         columns: angular.copy($rootScope.permissionsConfigColumns.columns),
            //         url: globalConfig.api.permissionQueryByParentId,
            //         parms: {
            //             parentId: id ==undefined? angular.copy($scope.idOption):id
            //         }
            //     })
            // );
            // $scope.idOption = id;
            // //$scope.Type =

            var test={};
            var H = document.documentElement.clientHeight;

            var val = {
                pageSize: Math.floor((H - 250) / 40),
            };
            if(null==id){
                test={parentId:1,withUnuse:true}
            }else {
                test={parentId:id.data.id,withUnuse:true}
            }
            $.extend(val, test);
            dataService.getData('permissionQueryByParentId',val).success(function (rs) {
                $("#tables_con_show").ligerGrid({
                    columns: $rootScope.permissionsConfigColumns.columns,
                    cssClass: "ligerClass",
                    isScroll: false,
                    headerRowHeight: 45,
                    rowHeight: 40,
                    pageParmName: 'pageNum',
                    pagesizeParmName: 'pageSize',
                    // columnWidth: 150,
                    alternatingRow: false, //单双行差异去除
                    data: {
                        Rows: rs.data
                    },
                    record: rs.total,
                    onAfterShowData: function (data) {
                        var gird1Width = $('.l-frozen .l-grid1').width();
                        $('.l-grid2').css({right: gird1Width,left: '0px',width:'auto'});
                        $('.l-panel-bar').remove();

                        if(rs.data==''||rs.data==null){
                            $('.fc-table-fix').append("<div class='no_data'><p>暂时没有数据</p></div>")
                        }

                    },
                    onBeforeShowData: function (data) {
                        if(rs.data==''||rs.data==null){
                            $('.l-grid2').css('left','0px')
                        }
                    },
                    onContextmenu: function (parm, e) {
                        $scope.parm = parm.data;
                        var items = [{
                            text: '编辑',
                            click: itemclick,
                        }];
                        getLigerMenu(items);
                        menu.show({
                            top: e.pageY - e.offsetY
                        });
                        return false;
                    }
                })
            });
        }

        dataService.getData('permissionQueryByParentId',{parentId:1,withUnuse:true}).success(function (rs) {
            var H = document.documentElement.clientHeight;

            var val = {
                pageSize: Math.floor((H - 250) / 40)
            };
            if (val.pageSize<= 0) {
                val.pageSize=1
            }
            var page = Math.ceil(rs.data.length / val.pageSize);
            if (page == 0) {
                $('.bottomPage').remove()
                // $('.fc-table-main').append("<div class='no_data'><p>暂时没有数据</p></div>")
                return false
            }
            $('.tcdPageCode').createPage({
                pageCount: page,
                current: 1,
                backFn: function (p) {
                    var pageNo = {
                        pageNum: p
                    };
                    $.extend(val, pageNo);
                    queryList(val)

                }
            });
        })
        $scope.queryAll();


    }
])
;


/**
 * 删除权限弹窗
 */
function delPermissions(id, name) {
    var scope = angular.element($("#permissionsId")).scope();
    scope.$apply(function () {
        layer.confirm('你确定要删除"' + name + '"吗?', {icon: 3}, function (index) {
            var params = {id: id, isGroup: false};
            $.ajax({
                type: 'GET',
                headers: {'ticket': Cookies.get('auth') || '' },
                url: '/wlgfapi/permission/delete',
                data: params,
                dataType: "json"
            }).done(function (data) {
                if (data.status == 200) {
                    layer.msg('设置成功!');
                    scope.queryAll();//重新加载页面数据
                } else {
                    layer.msg('设置失败!');
                }
            }).fail(function () {
                layer.msg('设置失败!');
            });
        })
    });

}

/**
 * 编辑权限信息弹窗
 * @param id 资源id
 * @param name
 */
function updatePermissions(id) {
    var scope = angular.element($("#permissionsId")).scope();
    scope.$apply(function () {
        scope.updateOpen = layer.open({
                title: '修改权限信息：',
                shade: [0.8, '#393D49'],
                shadeClose: true,
                maxmin: true,
                area: ['750px', '500px'],
                type: 2,
                content: '/index.html#/dialog/permissionsConfig/update/' + id
            }
        )
    });


}
