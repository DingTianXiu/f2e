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
            $scope.queryList();

        }

        /**
         * 初始化树形菜单
         */
        $scope.initTree = function () {
            $rootScope.safeApply(function () {
                    $scope.myTreeOption = {
                        url: 'getRoleTree',
                        parms: {rootId: 0,withLeaf:true},
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
                updateRole($scope.parm.id)
            }
            if (item.text == '配置权限') {
                goPermissionsPage($scope.parm.id,$scope.parm.parentId)
            }
        };
        /**
         * 加载列表
         */
        $scope.queryList = function (id) {
            // //立即检测$watch中变化的值
            // $rootScope.safeApply(
            //     $scope.listModel = angular.copy({
            //         columns: angular.copy(globalConfig.tablesConfig.tagCenter.columns),
            //         url: globalConfig.api.queryRoleByParentId,
            //         parms: {
            //             parentId: id ==undefined? angular.copy($scope.idOption):id,
            //             rn: (new Date()).getTime()
            //         }
            //     })
            // );
            // $scope.idOption = id;//设置当前选中的菜单id(为了刷新树时右侧的列表依然定位到之前选中的值)
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
            dataService.getData('queryRoleByParentId',val).success(function (rs) {
                $("#tables_con_show").ligerGrid({
                    columns: globalConfig.tablesConfig.tagCenter.columns,
                    cssClass: "ligerClass",
                    isScroll: false,
                    headerRowHeight: 45,
                    rowHeight: 40,
                    pageParmName: 'pageNum',
                    pagesizeParmName: 'pageSize',
                    columnWidth: 150,
                    alternatingRow: false, //单双行差异去除
                    data: {
                        Rows: rs.data
                    },
                    record: rs.total,
                    onAfterShowData: function (data) {
                        var gird1Width = $('.l-frozen .l-grid1').width();
                        $('.l-grid2').css({right: gird1Width,left: '0px',width:'auto'});
                        $('.l-panel-bar').remove();

                    },
                    onBeforeShowData: function (data) {
                        if(rs.data==''||rs.data==null){
                            $('.l-grid2').css('left','0px')
                            $('.fc-table-main').append("<div class='no_data'><p>暂时没有数据</p></div>")
                        }
                    },
                    onContextmenu: function (parm, e) {
                        $scope.parm = parm.data;
                        var items = [{
                            text: '编辑',
                            click: itemclick,
                        },{
                            text: '配置权限',
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
        dataService.getData('queryRoleByParentId',{parentId:1,withUnuse:true}).success(function (rs) {
            var H = document.documentElement.clientHeight;

            var val = {
                pageSize: Math.floor((H - 250) / 40)
            };
            if (val.pageSize<= 0) {
                val.pageSize=1
            }
            var page = Math.ceil(rs.total / val.pageSize);
            if (page == 0) {
                $('.bottomPage').remove()
                $('.fc-table-main').append("<div class='no_data'><p>暂时没有数据</p></div>")
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
        /**
         * 回调关闭弹窗
         */
        $scope.callbackOpen = function () {
            $scope.idOption = angular.copy($("#closeOpen").val());
            $scope.initTree();
            $scope.queryList();
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
