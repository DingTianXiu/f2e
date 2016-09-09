/**
 * api列表JS
 */
app.controller('apiListCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', '$state', 'toaster',
    function ($scope, globalConfig, $rootScope, dataService, $state, toaster) {

        /**
         * 页面初始化加载
         */
        setTimeout(function () {
            $("html, body").scrollTop(0);
        }, 100);

        $scope.initData = {
            g : null,
            menu : null
        }
        $scope.queryAll = function () {
            //加载页面普通查询下拉
            $scope.mySelectLoad();
        }

        /**
         * 加载页面查询下拉框
         */
        $scope.mySelectLoad = function () {
            //更新周期
            $scope.mySelectOption = [];
            angular.forEach($rootScope.defaultAdvancedSearchSelect.myApiSelect,function(item){
                $scope.mySelectOption.push({
                    id: item[0],
                    name: item[1]
                });
            });
            $scope.mySelect = $scope.mySelectOption[0].id;
            $scope.loadList();
        }

        /**
         * 查询api列表
         */
        $scope.queryApiList = function() {
            $scope.loadList();
        }

        $scope.itemClick = function(item) {
            if (item.text == '修改') {
                tagConfigCtrlPage($scope.parm.id, 1)
            }else if (item.text == '详情') {
                $state.go('g.data.tagdetail', {
                    labelGroupId: $scope.parm.id
                })
            }
        }


        $scope.getLigerMenu = function(items) {
            $scope.initData.menu = $.ligerMenu({
                width: 170,
                height:40,
                items: items
            });
        }

        $scope.onContextmenu = function (parm, e) {
            $scope.parm = parm.data;
            var items = [{
                text: '修改',
                click: $scope.itemClick,
            }];
            if (parm.data.modifyStatus == 'deployed') {
                items.push({
                    text: '详情',
                    click: $scope.itemClick,
                })
            }
            $scope.getLigerMenu(items);
            $scope.initData.menu.show({
                top: e.pageY - e.offsetY
            });
            return false;
        }

        $scope.onBeforeShowData = function(){
            $scope.gird1Width = $('.l-frozen .l-grid1').width();
            $('.l-grid2').css({right: $scope.gird1Width, left: '0px', width: 'auto'});
            $('.l-panel-bar').remove();
        }

        $scope.loadList = function(){

            if ($scope.g != null) {
                $scope.pageSize = $(".l-bar-selectpagesize select", $scope.g.toolbar).val();
            }
            var H = document.documentElement.clientHeight;
            var pageN = '';

            if ($("span.current").text() == '') {
                pageN = 1

            } else {
                pageN = parseInt($("span.current").text().substr(0, 1))
            }
            $scope.param = {
                name: $scope.mySelectVal,
                pageSize: Math.floor((H - 350) / 40)>0?Math.floor((H - 350) / 40):1,
                pageNum: pageN
            };
             //立即检测$watch中变化的值
             $rootScope.safeApply(
                 $scope.listModel = angular.copy({
                     columns: angular.copy(globalConfig.apiList.columns),
                     url: globalConfig.api.queryApiList,
                     columnWidth:169,
                     headerRowHeight: 45,
                     rowHeight: 40,
                     width:"auto",
                     params: $.extend(true, {}, $scope.param),
                     onContextMenu: $scope.onContextmenu,
                     onBeforeShowData: $scope.onBeforeShowData
                 })
             );
        }

        //==============================页面按钮事件绑定str===================================
        /**
         * 普通搜索按钮
         */
        $scope.mySelectClick = function () {
            $scope.selectOption = {};
            //获取下拉选择条件
            var sval = $("#mySelect").val();
            sval = sval.substring(sval.indexOf(':') + 1, sval.length);
            $scope.selectOption[sval] = $("#mySelectVal").val();
            //赋值查询条件触发列表刷新
            $scope.highSearchOption = angular.copy($scope.selectOption);

            //重新加载列表
            $scope.loadList();
        }

        /**
         * 修改跳转
         */
        $scope.tagConfigCtrlPageUpdata = function (id) {
            $state.go('g.data.modifyTag', {
                labelGroupId: id
            });
        }

        //全局入口
        $scope.queryAll();
    }
]);
