/**
 * 标签表管理
 */
app.controller('tagCenterPreCtrl', ['$scope', 'globalConfig', '$rootScope', 'dataService',
    function ($scope, globalConfig, $rootScope, dataService) {
        var g;
        /**
         * 页面初始化加载
         */
        $scope.queryAll = function () {
            //查询用户自定义查询标签配置数据
            $scope.queryViewColumnData();

            $scope.g = null;
            //加载页面普通查询下拉
            $scope.mySelectLoad();

            //高级下拉加载标识
            $scope.loadAdvanceSelectFalg = 0;

        }

        var modifyStatus = [{
            available: 'wait_audit',
            text: '待审核'
        }, {
            available: 'audit_pass',
            text: '审核通过'
        }, {
            available: 'audit_not_pass',
            text: '审核不通过'
        }, {
            available: 'deployed',
            text: '已部署'
        }, {
            available: 'modify',
            text: '变更'
        }, {
            available: 'create',
            text: '新建'
        }];

        /**
         * 加载页面查询下拉框
         */
        $scope.mySelectLoad = function () {
            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelectByCenter;
            //更新周期
            var mySelectHtml = '';
            $.each(selects.mySelect, function (index, item) {
                mySelectHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
            });
            $("#mySelect").html(mySelectHtml);
        }

        /**
         * 加载高级搜索下拉框
         */
        $scope.loadAdvanceSelect = function () {

            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelectByCenter;

            //更新周期
            var refreshCycleHtml = '';
            $.each(selects.refreshCycle, function (index, item) {
                refreshCycleHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
            });
            $("#refreshCycle").html(refreshCycleHtml);

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
            var columns = [{
                display: '标签中文名',
                name: 'name',
                render: function (rowdata) {
                    return '<span title="' + $rootScope.escapeHtml(rowdata.name) + '">' + $rootScope.escapeHtml(rowdata.name) + '</span>';
                }
            }, {
                display: '标签英文名',
                name: 'code',
                render: function (rowdata) {
                    return '<span title="' + $rootScope.escapeHtml(rowdata.code) + '">' + $rootScope.escapeHtml(rowdata.code) + '</span>';
                }
            }, {
                display: '标签数据类型',
                name: 'dataCategory',
                render: function (rowdata) {
                    if (rowdata.dataCategoryName != null) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.dataCategoryName) + '">' + $rootScope.escapeHtml(rowdata.dataCategoryName) + '</span>';
                    } else {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.dataCategory) + '">' + $rootScope.escapeHtml(rowdata.dataCategory) + '</span>';
                    }
                }
            }, {
                display: '标签类型',
                name: 'type',
                render: function (rowdata) {
                    if (rowdata.typeName != null) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.typeName) + '">' + $rootScope.escapeHtml(rowdata.typeName) + '</span>';
                    } else {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.type) + '">' + $rootScope.escapeHtml(rowdata.type) + '</span>';
                    }
                }
            }, {
                display: '标签类目',
                name: 'categoryPath',
                render: function (rowdata) {
                    if (rowdata.categoryPath != null) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.categoryPath) + '">' + $rootScope.escapeHtml(rowdata.categoryPath) + '</span>';
                    }
                }
            }, {
                display: '标签等级',
                name: 'labelLevel',
                // width: 220,
                render: function (rowdata) {
                    if (rowdata.labelLevel != null) {
                        if (rowdata.labelLevel == 1) {
                            return '<span title="一级标签">一级标签</span>';
                        } else {
                            return '<span title="二级标签">二级标签</span>';
                        }
                    }
                }
            }, {
                display: '是否为事实标签',
                name: 'isFact',
                render: function (rowdata) {
                    if (rowdata.isFact != null) {
                        if (rowdata.isFact == "n") {
                            return $rootScope.escapeHtml("否")
                        } else {
                            return $rootScope.escapeHtml("是")
                        }
                    }
                }
            }, {
                display: '标签非空率',
                name: 'labelQuality',
                render: function (rowdata) {
                    if (rowdata.labelQuality != null) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.labelQuality.toFixed(2)) + '%">' + $rootScope.escapeHtml(rowdata.labelQuality.toFixed(2)) + '%</span>';
                    }
                }
            }, {
                display: '审核状态',
                name: 'modifyStatus',
                editor: {
                    type: 'select',
                    data: modifyStatus,
                    valueField: 'available',
                    textField: 'text'
                },
                render: function (item) {
                    for (var i = 0; i < modifyStatus.length; i++) {
                        if (modifyStatus[i]['available'] == item.modifyStatus)
                            return modifyStatus[i]['text']
                    }
                    return '<span title="' + $rootScope.escapeHtml(rowdata.modifyStatus) + '">' + $rootScope.escapeHtml(rowdata.modifyStatus) + '</span>';
                }
            }, {
                display: '使用状态',
                name: 'useStatus',
                render: function (item) {
                    if (item.useStatus == 'y') return '启用';
                    return '停用';
                }
            }, {
                display: '统计口径',
                name: 'description',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.metaTableName) + '">' + $rootScope.escapeHtml(item.metaTableName) + '</span>';
                }
            }, {
                display: '数据库',
                name: 'metaDbName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.metaDbName) + '">' + $rootScope.escapeHtml(item.metaDbName) + '</span>';
                }
            }, {
                display: '标签表',
                name: 'metaTableName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.metaTableName) + '">' + $rootScope.escapeHtml(item.metaTableName) + '</span>';
                }
            }, {
                display: '字段名',
                name: 'metaColumnName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.metaColumnName) + '">' + $rootScope.escapeHtml(item.metaColumnName) + '</span>';
                }
            }, {
                display: '更新周期',
                name: 'refreshCycle',
                render: function (rowdata) {
                    if (rowdata.refreshCycleName != null) {
                        return rowdata.refreshCycleName
                    } else {
                        return rowdata.refreshCycle
                    }
                }
            }, {
                display: '数据源',
                name: 'dataSource',
                render: function (rowdata) {
                    if (rowdata.dataSourceName != null) {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.dataSourceName) + '">' + $rootScope.escapeHtml(rowdata.dataSourceName) + '</span>';
                    } else {
                        return '<span title="' + $rootScope.escapeHtml(rowdata.dataSource) + '">' + $rootScope.escapeHtml(rowdata.dataSource) + '</span>';
                    }
                }
            }, {
                display: '创建人',
                name: 'createdUserName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.createdUserName) + '">' + $rootScope.escapeHtml(item.createdUserName) + '</span>';
                }
            }, {
                display: '修改人',
                name: 'modifiedUserName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.modifiedUserName) + '">' + $rootScope.escapeHtml(item.modifiedUserName) + '</span>';
                }
            }, {
                display: '创建时间',
                name: 'created',
                width: 130,
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.created) + '">' + $rootScope.escapeHtml(item.created) + '</span>';
                }
            }, {
                display: '修改时间',
                width: 130,
                name: 'modified',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.modified) + '">' + $rootScope.escapeHtml(item.modified) + '</span>';
                }
            }]

            load(columns);
        }

        /**
         * 显示列表
         * 刘大力
         * @param josnList
         */
        function load(josnList) {
           
            var H = document.documentElement.clientHeight;
            var pageN = '';

            if ($("span.current").text() == '') {
                pageN = 1

            } else {
                pageN = parseInt($("span.current").text().substr(0, 1))
            }
            var val = {
                pageSize: Math.floor((H - 250) / 40)>0?Math.floor((H - 250) / 40):1,
                pageNum: pageN
            };
            // $(function () {
            $scope.g = $("#tables_con_show").ligerGrid({
                columns: josnList,
                url: globalConfig.api.queryLabelsAdvance,
                root: "data",
                isScroll: false,
                headerRowHeight: 45,
                rowHeight: 40,
                pageParmName: 'pageNum',
                pagesizeParmName: 'pageSize',
                cssClass: "ligerClass-no-bg-color",
                isScroll: false,
                columnWidth: 120, //默认列宽度
                alternatingRow: false, //单双行差异去除
                parms: $.extend(val, $scope.highSearchOption, {deployed: false}), //设定查询条件为已部署
                onBeforeShowData: function (data) {
                    $('.l-panel-bar').remove()
                }
            });
            $("#pageloading").hide();
            // });
        }

        dataService.getData('queryLabelsAdvance', {deployed: false}).success(function (rs) {
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
        // 重新渲染列表
        function rerenderList() {
            g.set({
                parms: $scope.highSearchOption
            });
        }

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
                title: '自定义搜索',
                content: $("#diySearch")
            });
        }

        /**
         * 查询用户自定义查询标签配置数据
         */
        $scope.queryViewColumnData = function () {

            //访问数据库
            dataService.getData('queryViewColumn', {
                type: 'view_column_label_center',
                rn: (new Date()).getTime()
            }).success(function (rs) {
                if (rs.data.length == 0) { //判断数据是否为空
                    //保存重置初始数据
                    $scope.selectedOptionRAW = angular.copy($rootScope.defaultQueryViewColumnByCenter);
                    //使用默认自定义标签配置数据
                    $scope.selectedOption = angular.copy($rootScope.defaultQueryViewColumnByCenter);
                    var dataS = angular.copy($rootScope.defaultQueryViewColumn);

                    dataS = jQuery.grep(dataS, function (item, index) {
                        if (item.isSelected == 0) {
                            return false;
                        }
                        return true;
                    });

                    //保存列表查询参数
                    $scope.queryList = angular.copy(dataS);
                    //
                } else {
                    //保存列表查询参数
                    $scope.queryList = angular.copy(rs.data);
                    var data = [];
                    var dataS = angular.copy($rootScope.defaultQueryViewColumnByCenter);

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

                    //构建数据
                    $scope.selectedOption = angular.copy(data);

                    //保存重置初始数据
                    $scope.selectedOptionRAW = angular.copy(data);

                }

                //加载列表
                // $scope.loadList();
            });
        };

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
            var option = {};

            //获取下拉选择条件
            option[$('#mySelect').val()] = angular.copy($scope.mySelectVal);

            //赋值查询条件触发列表刷新
            $scope.highSearchOption = angular.copy(option);

            //重新加载列表
            //$scope.loadList();
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
                type: 'view_column_label_center'
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
            //$scope.loadList();

            //关闭弹窗
            $scope.closeAdvancedSearch();
        }

        /**
         * 自定义标签选择系统默认按钮
         */
        $scope.delftSelected = function () {
            $scope.selectedOption = null;
            $scope.selectedOption = angular.copy($rootScope.defaultQueryViewColumnByCenter);
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
         * 添加标题变化执行加载列表的函数
         */
        $scope.$watch('queryList', function (data) {
            if (!data)
                return;

            $scope.loadList();
        }, true);

        /**
         * 添加查询条件变化加载列表函数
         */
        $scope.$watch('highSearchOption', function (data) {
            if (!data)
                return;

            $scope.loadList();
        }, true);

        // 页面初始化配置
        $scope.page = {}

        $scope.queryAll();
    }
]);