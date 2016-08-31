/**
 * 用户管理
 */
app.controller('clientConfigCtrl', ['$scope', '$cookies', 'globalConfig', 'dataService', '$rootScope',
    function ($scope, $cookies, globalConfig, dataService, $rootScope) {

        /**
         * 页面初始化加载
         */
        $scope.queryAll = function () {

            //加载页面普通查询下拉
            $scope.mySelectLoad();

            //加载列表
            $scope.queryList()


        }

        var menu;

        function getLigerMenu(items) {
            menu = $.ligerMenu({
                width: 100,
                items: items
            });
        }

        function itemclick(item) {
            var datas = $scope.parm.userName + "&" + $scope.parm.loginName + "&" + $scope.parm.departName + "&" + $scope.parm.job + "&" + $scope.parm.userId + "&" + $scope.parm.roleId;
            if (item.text == '修改角色') {
                updataUserRoleData(datas)
            }
        };
        /**
         * 加载列表
         */
        $scope.queryList = function (test) {
            
            if (test == undefined) {
                test = {
                    pageNum: 1,
                }
            }
            var H = document.documentElement.clientHeight;

            var val = {
                pageSize: Math.floor((H - 250) / 40),
                sysCode:'wlgf'
            };
            $.extend(val, test);

            dataService.getData('userQueryAll', val).success(function (rs) {

                $("#tables_con_show").ligerGrid({
                    columns: $rootScope.userColumns.columns,
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
                        $('.l-grid2').css({right: gird1Width, left: '0px', width: 'auto'});
                        $('.l-panel-bar').remove()
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
                            text: '修改角色',
                            click: itemclick,
                        }];
                        getLigerMenu(items);
                        menu.show({
                            top: e.pageY - e.offsetY
                        });
                        return false;
                    }
                });
            });
        };
        dataService.getData('userQueryAll', {pageNum:1,pageSize:100000,sysCode:'wlgf'}).success(function (rs) {
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
                    $scope.queryList(val)

                }
            });
        })
        /**
         * 加载页面查询下拉框
         */
        $scope.mySelectLoad = function () {
            //获取配置数据
            var selects = $rootScope.defaultUserSelect;

            //使用状态下拉
            var selectHtml = [];
            $.each(selects.userSelect, function (index, item) {
                selectHtml.push({id: item[0], name: item[1]});
            });
            $scope.userSelect = angular.copy(selectHtml);
            $scope.mySelectOption = selects.userSelect[0][0];
        }


//==============================页面按钮事件绑定str===================================
        /**
         * 弹窗回调函数
         */
        $scope.callbackOpen = function () {
            $scope.queryList();
            // $scope.queryList();
        }
        /**
         * 普通搜索按钮
         */
        $scope.mySelectClick = function () {
            var option = {};
            //获取下拉选择条件
            option[$scope.mySelectOption] = angular.copy($scope.mySelectVal);

            //赋值查询条件触发列表刷新
            $scope.SearchOption = angular.copy(option);
            $scope.queryList()//加载列表
            //重新加载列表
            //$scope.loadList();
        }
//==============================页面按钮事件绑定end===================================

        $scope.queryAll();
    }]);

//realName,loginName,orgName,jobText
function updataUserRoleData(datas) {
    var list = datas.split("&");
    var scope = angular.element($("#windowLoad")).scope();
    // scope.$apply(function () {
        scope.updateOpen = layer.open({
                title: '修改角色信息：',
                shade: [0.8, '#393D49'],
                shadeClose: true,
                maxmin: true,
                area: ['750px', '500px'],
                type: 2,
                content: '/index.html#/dialog/clientConfigModify/update/' + list[0] + '/' + list[1] + '/' + list[2] + '/' + list[3] + '/' + list[4] + '/' + list[5]
            }
        )
    // });
}
