/**
 * 标签表管理
 */
app.controller('tagConfigCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService', '$state', 'toaster',
    function ($scope, globalConfig, $rootScope, dataService, $state, toaster) {

        /**
         * 页面初始化加载
         */
        setTimeout(function () {
            $("html, body").scrollTop(0);
        }, 100);

        $scope.queryAll = function () {
            //查询用户自定义查询标签配置数据
            $scope.queryViewColumnData();

            $scope.g = null; //列表对象
            //加载页面普通查询下拉
            $scope.mySelectLoad();

            //高级下拉加载标识
            $scope.loadAdvanceSelectFalg = 0;

        }

        /**
         * 加载页面查询下拉框
         */
        $scope.mySelectLoad = function () {
            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;
            //更新周期
            var mySelectHtml = [];
            $.each(selects.mySelect, function (index, item) {
                mySelectHtml.push({
                    id: item[0],
                    name: item[1]
                });
            });

            $scope.mySelectOption = angular.copy(mySelectHtml);
            $scope.mySelect = mySelectHtml[0].id;
        }

        /**
         * 加载高级搜索下拉框
         */
        $scope.loadAdvanceSelect = function () {

            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;

            //使用状态
            var useStatusHtml = '<option value="">请选择</option>';
            $.each(selects.useStatus, function (index, item) {
                useStatusHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
            });
            $("#useStatus").html(useStatusHtml);

            //审核状态
            var modifyStatusHtml = '<option value="">请选择</option>';
            $.each(selects.modifyStatus, function (index, item) {
                modifyStatusHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
            });
            $("#modifyStatus").html(modifyStatusHtml);

        }

        /**
         * 加载页面列表数据
         * 刘大力
         */
        $scope.loadList = function () {
            var josnList = false;
            load(josnList);
        };

        var menu;

        function getLigerMenu(items) {
            menu = $.ligerMenu({
                width: 170,
                height:40,
                items: items
            });
        }

        function itemclick(item) {
            if (item.text == '修改') {
                tagConfigCtrlPage($scope.parm.id, 1)
            } else if (item.text == '审核') {
                tagConfigCtrlPage($scope.parm.id, 2)
            } else if (item.text == '详情') {
                $state.go('g.data.tagdetail', {
                    labelGroupId: $scope.parm.id
                })
            } else if (item.text == '停用') {
                stopOrStartTag1($scope.parm.id, $scope.parm.useStatus)
            } else if (item.text == '启用') {
                stopOrStartTag1($scope.parm.id, $scope.parm.useStatus)
            } else if (item.text == '部署') {
                deployServer($scope.parm.id)
            } else if (item.text == '删除') {
                deleteTag($scope.parm.id, $scope.parm.metaTableName)
            }
        }

        //刘大力
        function load(josnList) {
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
            var val = {
                pageSize: Math.floor((H - 350) / 40)>0?Math.floor((H - 350) / 40):1,
                pageNum: pageN
            };

            $(function () {
                $scope.g = $("#tables_con_show").ligerGrid({
                    columns: globalConfig.tables.tagCenter.columns,
                    url: globalConfig.api.queryLabelGroupsAdvance,
                    checkbox: josnList,
                    root: "data",
                    record: "total",
                    resizable: true,
                    headerRowHeight: 45,
                    rowHeight: 40,
                    pagesizeParmName: "pageSize",
                    pageParmName: "pageNum",
                    cssClass: "ligerClass",
                    enabledSort: false,
                    width: "auto", //默认列宽度
                    columnWidth: 169,
                    frozenCheckbox: false,
                    allowHideColumn: true,
                    alternatingRow: false, //单双行差异去除
                    parms: $.extend(true, {}, $scope.highSearchOption, val),
                    onBeforeShowData: function (data) {
                        var gird1Width = $('.l-frozen .l-grid1').width();
                        $('.l-grid2').css({right: gird1Width, left: '0px', width: 'auto'});
                        $('.l-panel-bar').remove();
                    },
                    onContextmenu: function (parm, e) {
                        $scope.parm = parm.data;
                        var items = [{
                            text: '修改',
                            click: itemclick,
                        }];
                        if (parm.data.modifyStatus == 'wait_audit') {
                            items.push({
                                text: '审核',
                                click: itemclick,
                            })
                        }
                        if (parm.data.modifyStatus == 'deployed') {
                            items.push({
                                text: '详情',
                                click: itemclick,
                            })
                        }
                        if (parm.data.modifyStatus == 'audit_pass') {
                            items.push({
                                text: '部署',
                                click: itemclick,
                            })
                        }

                        if (parm.data.useStatus != 'y') {
                            items.push({
                                text: '删除',
                                click: itemclick,
                            })
                        }

                        getLigerMenu(items);

                        menu.show({
                            top: e.pageY - e.offsetY
                            // left: e.pageX - e.offsetX
                        });
                        return false;
                    }
                });
                $("#pageloading").hide();
            });
        }

        dataService.getData('queryLabelGroupsAdvance', '').success(function (rs) {
            var H = document.documentElement.clientHeight;

            var val = {
                pageSize: Math.floor((H - 350) / 40)
            };
            if (val.pageSize<= 0) {
                val.pageSize=1
            }
            var page = Math.ceil(rs.total / val.pageSize);
            if (page == 0) {
                $('.bottomPage').remove()
                $('.tables_wrap').append("<div class='no_data'><p>暂时没有数据</p></div>")
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
                    $scope.loadList();

                }
            });
        })
        /**
         * 高级搜索弹窗
         */
        $scope.advancedSearch = function () {
            if ($scope.loadAdvanceSelectFalg != 1) {
                //加载高级搜索下拉框数据
                $scope.loadAdvanceSelect();
                //修改标识状态
                $scope.loadAdvanceSelectFalg = 1;
            }

            $scope.highSearchView = $rootScope.layerOpen({
                title: '高级搜索', //标题
                shadeClose: true, //开启遮罩关闭
                content: $("#highSearch") //div选择器
            })
            $('.layui-layer-shade').remove();
        }

        /**
         * 自定义搜索弹窗
         */
        $scope.diySearch = function () {
            $scope.resetSelecttd() //重置标签状态

            $rootScope.diySearchView = $rootScope.layerOpen({
                title: '自定义字段',
                content: $("#diySearch")
            });
        }

        /**
         * 查询用户自定义查询标签配置数据
         */
        $scope.queryViewColumnData = function () {

            //访问数据库
            dataService.getData('queryViewColumn', {
                type: 'view_column_label_group',
                rn: (new Date()).getTime()
            }).success(function (rs) {
                if (rs.data.length == 0) { //判断数据是否为空
                    //保存重置初始数据
                    $scope.selectedOptionRAW = angular.copy($rootScope.defaultQueryViewColumn);
                    //使用默认自定义标签配置数据
                    $scope.selectedOption = angular.copy($rootScope.defaultQueryViewColumn);

                    var dataS = angular.copy($rootScope.defaultQueryViewColumn);

                    dataS = jQuery.grep(dataS, function (item, index) {
                        if (item.isSelected == 0) {
                            return false;
                        }
                        return true;
                    });

                    //保存列表查询参数
                    $scope.queryList = angular.copy(dataS);
                } else {
                    var data = [];
                    var dataS = angular.copy($rootScope.defaultQueryViewColumn);

                    jQuery.grep(dataS, function (item, index) {
                        var flag = false;
                        //勾选返回的标签
                        $.each(rs.data, function (rsindex, rsitem) {
                            if (item.code.trim() == rsitem.code.trim()) {
                                item.isSelected = '1';
                                flag = true;
                                return false;
                            }
                        });

                        //不在返回数据里的标签设为不选中
                        if (!flag) {
                            item.isSelected = '0';
                        }
                        data.push(item);
                    });

                    //设置列表标题
                    $scope.queryList = angular.copy(rs.data);

                    //构建自定义查询数据
                    $scope.selectedOption = angular.copy(data);

                    //保存自定义重置初始数据
                    $scope.selectedOptionRAW = angular.copy(data);

                }

                //加载列表
                // $scope.loadList();
            });
        }

        /**
         * 点击自定义标签事件
         * @param option 点击的页面标签对象
         */
        $scope.selectedOptionUpdate = function (option) {
            $scope.selectedOption = jQuery.grep($scope.selectedOption, function (item, index) { //遍历数组

                if (item.code == option.code) {
                    if (item.isSelected == 1) {
                        item.isSelected = 0;
                    } else {
                        item.isSelected = 1;
                    }
                }

                return true;
            });
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
         * 自定义搜索确定按钮
         */
        $scope.diySearchConfirm = function () {
            //获取选中条件
            var selecteds = $("#selected").find("a");
            var option = {};
            var queryList = []; //保存列表标题
            $.each(selecteds, function (index, item) {
                queryList[index] = {
                    name: $(item).html().substring(0, $(item).html().indexOf('<')),
                    code: $(item).attr('name')
                };
                option['viewColumns[' + index + '].name'] = $(item).html().substring(0, $(item).html().indexOf('<'));
                option['viewColumns[' + index + '].code'] = $(item).attr('name');
            });

            if (queryList.length != 0) {
                //列表标题赋值触发列表刷新
                $scope.queryList = angular.copy(queryList);
            } else {
                //自定义标签恢复重置的状态
                $scope.selectedOption = angular.copy($scope.selectedOptionRAW);
                layer.msg('定制字段不能为空', {
                    icon: 2
                }); //失败
                return;
            }

            option = $.extend(true, {}, {
                type: 'view_column_label_group'
            }, option);

            //查询数据库
            dataService.getData('saveViewColumn', option).success(function (rs) {

                if (rs.status == '200') {
                    //修改成功保存重置状态
                    $scope.selectedOptionRAW = angular.copy($scope.selectedOption);
                    layer.msg(rs.msg, {
                        icon: 1
                    }); //成功
                } else {
                    layer.msg(rs.msg, {
                        icon: 2
                    }); //失败
                }

            });

            //重新加载列表
            //$scope.loadList();
            //关闭弹窗
            $scope.closeDiySearch();
        };

        /**
         * 高级搜索确定按钮
         */
        $scope.advancedSearchConfirm = function () {
            //获取页面查询条件
            var highSearchInput = $("#highSearch").find('input'); //input标签
            var highSearchSelect = $("#highSearch").find('select'); //select标签

            var option = {};
            $.each(highSearchInput, function (index, item) {
                if ($(item).val()) {
                    option[$(item).attr('name')] = $(item).val();
                }
            });

            $.each(highSearchSelect, function (index, item) {
                if ($(item).val()) {
                    var sval = $(item).val();
                    sval = sval.substring(sval.indexOf(':') + 1, sval.length);
                    option[$(item).attr('name')] = sval;
                }
            });

            //赋值查询条件触发列表刷新
            $scope.highSearchOption = angular.copy(option);

            //加载列表
            $scope.loadList();

            //关闭弹窗
            $scope.closeAdvancedSearch();
        }

        /**
         * 自定义标签选择系统默认按钮
         */
        $scope.delftSelected = function () {
            $scope.selectedOption = null;
            $scope.selectedOption = angular.copy($rootScope.defaultQueryViewColumn);
        }

        /**
         * 自定义标签选择重置按钮
         */
        $scope.resetSelecttd = function () {
            $scope.selectedOption = null;
            $scope.selectedOption = angular.copy($scope.selectedOptionRAW);
        }

        //关闭高级搜索弹窗
        $scope.closeAdvancedSearch = function () {
            layer.close($scope.highSearchView);
        }
        //关闭自定义搜索弹窗
        $scope.closeDiySearch = function () {
            layer.close($rootScope.diySearchView);
        }
        //==============================页面按钮事件绑定end===================================

        /**
         * 添加标题变化和高级搜索查询条件变化执行加载列表的函数
         */
        $scope.$watch('queryList+highSearchOption', function (data) {
            if (!data)
                return;

            $scope.loadList();
        }, true);

        // 页面初始化配置
        $scope.page = {}

        /**
         * 修改跳转
         */
        $scope.tagConfigCtrlPageUpdata = function (id) {
            $state.go('g.data.modifyTag', {
                labelGroupId: id
            });
        }

        /**
         * 审核跳转
         */
        $scope.tagConfigCtrlPageShenHe = function (id) {
            $state.go('g.data.auditTag', {
                labelGroupId: id
            });
        }

        $scope.queryAll();
    }
]);

/**
 * 跳转控制
 */
function tagConfigCtrlPage(id, type) {
    var scope = angular.element($("#windowLoad")).scope();
    if (type == 1) { //修改
        scope.tagConfigCtrlPageUpdata(id);
    } else if (type == 2) { //审核
        scope.tagConfigCtrlPageShenHe(id);
    }
}
// 删除标签信息
function deleteTag(id, metaTableName) {
    var params = {
        labelGroupId: id
    }
    layer.confirm('您确定将' + metaTableName + '表删除吗？删除后该表的相关信息将丢失！！', {
        // icon: 3
    }, function (index) {
        var scope = angular.element($("#windowLoad")).scope();
        $.ajax({
            type: 'POST',
            headers: {
                'ticket': Cookies.get('auth') || ''
            },
            url: '/wlgfapi/label/deleteLabelGroup',
            data: params,
            dataType: "json"
        }).done(function (data) {
            // alert(data.status);
            if (data.status == 200) {
                layer.msg('删除成功！');
                scope.loadList();
            } else {
                layer.msg(data.msg);
            }
        }).fail(function () {
            layer.msg('删除失败啦！');
        });
    });
}
// 启用停用标签
function stopOrStartTag1(id, useStatus) {
    var scope = angular.element($("#windowLoad")).scope();
    var usestat = '';
    var msgs = "";
    var msg1 = "";
    var msg12 = "";
    if (useStatus == "y") {
        msgs = "您确定停用该标签表吗？"
        msg1 = "停用成功";
        msg12 = "停用失败";
        usestat = 'n';
    } else {
        msgs = "您确定启用该标签表吗？"
        msg1 = "启用成功";
        msg12 = "启用失败";
        usestat = 'y';
    }
    var params = {
        labelGroupId: id,
        useStatus: usestat,
        ticket: Cookies.get('auth') || ''
    }
    layer.confirm(msgs, {
        // icon: 3
    }, function (index) {
        $.ajax({
            type: 'POST',
            headers: {
                'ticket': Cookies.get('auth') || ''
            },
            url: '/wlgfapi/label/changeLabelGroupUseStatus',
            data: params,
            dataType: "json"
        }).done(function (data) {

            if (data.status == 200) {

                var scope = angular.element($("#windowLoad")).scope();
                scope.loadList();

                layer.msg(msg1);

            } else {
                layer.msg(data.msg);
            }
        }).fail(function (data) {
            layer.msg(data.msg);
        });
    });
}

function deployServer(id) {
    layer.open({
        title: '请填写以下部署信息：',
        shade: [0.8, '#393D49'],
        shadeClose: true,
        maxmin: true,
        area: ['800px', '300px'],
        type: 2,
        content: '/index.html#/dialog/tagconfig/deploy/' + id
    });
}