/**
 * Created by Administrator on 2016/3/17 0017.
 */
app.controller('roleConfigCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', '$timeout','$state',
    function ($scope, globalConfig, $rootScope, dataService, $timeout,$state) {
        $scope.TreeData = [];//保存树上的数据
        /**
         * 页面初始化
         */
        $scope.queryAll = function () {
            $scope.initTree();//初始化树形菜单
            $scope.idOption = 1//设置树形菜单默认选中值
            $scope.getPageParm();

        }

        /**
         * 初始化树形菜单
         */
        $scope.initTree = function () {
            $rootScope.safeApply(function () {
                    $scope.myTreeOption = {
                        url: 'getRoleTree',
                        parms: {rootId: 0,withLeaf:true},
                        fun:  $scope.getPageParm
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
                updateRole($scope.parm.id)
            }
            if (item.text == '配置权限') {
                goPermissionsPage($scope.parm.id,$scope.parm.parentId)
            }
        }
        function queryList(data) {


            $("#tables_con_show").ligerGrid({
                columns: globalConfig.tablesConfig.tagCenter.columns,
                url: globalConfig.api.queryListByParentIdRole,
                cssClass: "ligerClass",
                isScroll: false,
                headerRowHeight: 45,
                rowHeight: 40,
                // pageParmName: 'pageNum',
                // pagesizeParmName: 'pageSize',
                parms: data,
                alternatingRow: false, //单双行差异去除
                root: "data",
                onAfterShowData: function (data) {
                    var gird1Width = $('.l-frozen .l-grid1').width();
                    $('.l-grid2').css({right: gird1Width, left: '0px', width: 'auto'});
                    $('.l-panel-bar').remove();
                    if (data.Total == '' || data.Total == null) {
                        // $('.fc-table-fix').append("<div class='no_data'><p>暂时没有数据</p></div>")
                    }

                },
                onBeforeShowData: function (data) {
                    if (data.Total == '' ||data.Total == null) {
                        $('.l-grid2').css('left', '0px')
                    }
                },
                onContextmenu: function (parm, e) {
                    $scope.parm = parm.data;
                    var items = [{
                        text: '编辑',
                        click: itemclick
                    },{
                        text: '配置权限',
                        click: itemclick
                    }];

                    getLigerMenu(items);
                    menu.show({
                        top: e.pageY - e.offsetY
                    });
                    return false;
                }
            })
        }


        $scope.getPageParm = function (data) {
            if(data==undefined){
                data=1
            }else {
                data=data.data.id
            }
            $scope.closeOpen=data;
            dataService.getData('queryRoleByParentId', {parentId: data, withUnuse: true}).success(function (rs) {
                var H = document.documentElement.clientHeight;
                var val = {
                    pageSize: Math.floor((H - 350) / 40)
                };
                if (val.pageSize <= 0) {
                    val.pageSize = 1
                }
                var page = Math.ceil(rs.data.length / val.pageSize);
                if (page == 0) {
                    $('.bottomPage').remove()
                    return false
                }
                if (page == 1) {
                    $('.bottomPage').remove()
                }
                $('.tcdPageCode').createPage({
                    pageCount: page,
                    current: 1,
                    backFn: function (p) {
                       queryList({ pageNum: p,pageSize:val.pageSize,parentId: data, withUnuse: true})
                    }
                });
               queryList({ pageNum: 1,pageSize:val.pageSize,parentId: data, withUnuse: true})

            })
        }
        /**
         * 回调关闭弹窗
         */
        $scope.callbackOpen = function () {
            var data={data:{id:$scope.closeOpen}}
            $scope.getPageParm(data);//根据返回数据刷新页面
        }

        /**
         * 新增角色信息弹窗时间
         */
        $scope.addRole = function () {
            $scope.closeAddOpen = $rootScope.layerOpen({
                type: 2,
                title: '添加角色',
                content: '/index.html#/dialog/tagRoleConfig/add/'+$scope.idOption
            })
        }

        /**
         * 跳转到权限配置页面
         */
        $scope.goPermissionsPage = function(id,parentId){
            $state.go('g.setting.userpermissions.page',{id:id,parentId:parentId});
        }
        $scope.queryAll();
    }]);

/**
 * 跳转到权限配置页面页面
 */
function goPermissionsPage(id,parentId){
    var scope = angular.element($("#tagRoleConfigId")).scope();
    scope.goPermissionsPage(id,parentId);
}

/**
 * 编辑角色信息弹窗
 * @param id
 */
function updateRole(id) {
    var scope = angular.element($("#tagRoleConfigId")).scope();
    scope.$apply(function () {
        scope.updateOpen = layer.open({
                title: '编辑角色信息：',
                shade: [0.8, '#393D49'],
                shadeClose: true,
                maxmin: true,
                area: ['750px', '450px'],
                type: 2,
                content: '/index.html#/dialog/tagRoleConfig/update/' + id
            }
        )
    })
}
