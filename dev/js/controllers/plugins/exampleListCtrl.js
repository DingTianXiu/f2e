//实例列表
app.controller('exampleListCtrl', ['$scope', '$cookies', 'globalConfig', 'dataService', '$rootScope', '$state', '$location','toaster',
    function ($scope, $cookies, globalConfig, dataService, $rootScope, $state, $location,toaster) {
        //设置表头
        var adminListTpl = {
            headerRowHeight: 35,
            columns: [{
                display: 'ID',
                name: 'id',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.id) + '">' + $rootScope.escapeHtml(item.id) + '</span>';
                }
            }, {
                display: '实例名称',
                name: 'name',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.name) + '">' + $rootScope.escapeHtml(item.name) + '</span>';
                }
            }, {
                display: '控件名称',
                name: 'widgetName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.widgetName) + '">' + $rootScope.escapeHtml(item.widgetName) + '</span>';
                }
            }, {
                display: '控件底层库',
                name: 'widgetLibNames',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.widgetLibNames) + '">' + $rootScope.escapeHtml(item.widgetLibNames) + '</span>';
                }
            }, {
                display: '实例说明',
                name: 'comment',
                // width: 460,
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.comment) + '">' + $rootScope.escapeHtml(item.comment) + '</span>';
                }
            }, {
                display: '最近修改人',
                name: 'modifiedUserName',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.modifiedUserName) + '">' + $rootScope.escapeHtml(item.modifiedUserName) + '</span>';
                }
            }, {
                display: '修改时间',
                name: 'modified',
                render: function (item) {
                    return '<span title="' + $rootScope.escapeHtml(item.modified) + '">' + $rootScope.escapeHtml(item.modified) + '</span>';
                }
            }, {
                display:"操作<i class='cz_ico'>",
				frozen:true,
                render: function (row) {
                    // var h = "";
                    // //					if ($rootScope.checkListPermission('permissions.role.modify')) {
                    // h += "<a href='javascript:updateExamp(" + row.id + ")'>修改</a> ";
                    // //					}
                    // //					if ($rootScope.checkListPermission('permissions.role.modify')) {
                    // h += "<a target='_blank' href='/#/preview/" + row.id + "' style='margin-right:5px;margin-left:5px;'>预览</a>";
                    // //					}
                    // //					if ($rootScope.checkListPermission('permissions.role.modify')) {
                    // h += "<a href='javascript:delExamp(" + row.id + ")'>删除</a>";
                    //					}
                    return "<a >...</a>";
                }
            }]
        };
        //加载...

        //页面初始化
        function queryAll() {
            //				$scope.queryList(); //加载列表

            $scope.mySelectLoad(); //普通下拉
            $scope.loadAdvanceSelectFalg = 0;
            //				 $scope.g=null//列表对象
        }

        //所有查询选项
        $rootScope.exampleAllSeect = {
            status: [ //弹窗搜索
                ['y', '启用'],
                ['n', '停用']
            ],
            mySelect: [ //页面搜索
                ['id', 'ID'],
                ['name', '实例名称'],
                ['widgetName', '控件名称']
            ]

        };

        //普通下拉框
        $scope.mySelectLoad = function () {

            var selects = $rootScope.exampleAllSeect;
            //更新周期
            var mySelectHtml = '';
            $.each(selects.mySelect, function (index, item) {
                mySelectHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
            });
            $("#mySelect").html(mySelectHtml);
        };

        // 加载高级搜索下拉框
        $scope.loadAdvanceSelect = function () {

            //获取配置数据
            var selects = $rootScope.exampleAllSeect;

            //使用状态
            var useStatusHtml = '<option value="">请选择</option>';
            $.each(selects.status, function (index, item) {
                useStatusHtml += '<option value="' + item[0] + '">' + item[1] + '</option>';
            });
            $("#status").html(useStatusHtml);

            dataService.getData('widgetSimpleList', '').success(function (rs) {
                var widgetSimpleListHtml = '<option value="">请选择</option>';
                $.each(rs.data, function (index, item) {
                    widgetSimpleListHtml += '<option value="' + $rootScope.escapeHtml(item.name) + '">' + $rootScope.escapeHtml(item.name) + '</option>';
                });
                $("#widgetName").html(widgetSimpleListHtml);
            });
        };
        //点击高级搜索弹窗事件
        $scope.highSearch = function () {
            if ($scope.loadAdvanceSelectFalg != 1) {
                //加载高级搜索下拉框数据
                $scope.loadAdvanceSelect();
                //修改标识状态
                $scope.loadAdvanceSelectFalg = 1;
            }
            $scope.highSearchView = $rootScope.layerOpen({
                title: '高级搜索', //标题
                content: $("#highSearch")
            })
            $('.layui-layer-shade').remove();
        }
        //禁用页面点击事件
        document.onkeydown = function (event) {
            var target, code, tag;
            if (!event) {
                event = window.event; //针对ie浏览器
                target = event.srcElement;
                code = event.keyCode;
                if (code == 13) {
                    tag = target.tagName;
                    if (tag == "TEXTAREA") {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                target = event.target; //针对遵循w3c标准的浏览器，如Firefox
                code = event.keyCode;
                if (code == 13) {
                    tag = target.tagName;
                    if (tag == "INPUT") {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        };
        //页面搜索
        document.onclick = Hanlder;

        function Hanlder(e) {
            e = e || event;
            var tag = e.srcElement || e.target;
            if (tag.id == 'selectId') {
                var option = {};
                //获取下拉选择条件
                var sval = $("#mySelect").val();
                option[sval] = $("#mySelectVal").val();
                queryList(option);

            }
        };

        //高级弹窗确定按钮
        $scope.highSearchConfirm = function () {
            //清空普通搜索
            $('#mySelectVal').val('');
            $scope.mySelectVal = '';
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
            queryList(option);

            //关闭弹窗
            $scope.closeHighSearch();

        }
        //关闭弹窗按钮
        $scope.closeHighSearch = function () {
            layer.close($scope.highSearchView);
        }
        var menu;

        function getLigerMenu(items) {
            menu = $.ligerMenu({
                width: 100,
                items: items
            });
        }

        function itemclick(item) {
            if (item.text == '修改') {
                updateExamp($scope.parm.id)
            } else if (item.text == '预览') {
                $state.go('g.plugins.preview', {
                    id: $scope.parm.id
                })
            } else {
                delExamp($scope.parm.id)
            }
        }
        //批量操作
        $scope.getSelectedRows = function () {
            $('.some-select').show()
            $('.cz-select').hide()
            queryList(true)
        }
        //取消选择
        $scope.cancelSelect = function () {
            $('.some-select').hide()
            $('.cz-select').show()
            queryList(false);
        }
        //删除
        $scope.delRows = function () {
            var i = 0;
            var ids=[];
            var rows = $scope.g.getSelecteds();
            if(!(rows && rows.length>0)){
                toaster.pop({
                    type: 'error',
                    title: '',
                    body: '请至少勾选一个'
                });
                return;
            }
           $scope.index=layer.confirm('确认<span style="color:red">删除</span>控件集吗？', {
                // icon: 3
            },function(){
                angular.forEach(rows, function (data) {
                    ids.push(data.id)
                    ++i;
                })
                // $state.go('g.plugins.exampleList')
                if(i==rows.length){
                    dataService.getData('deleExample',{id:ids.join(',')}).success(function (res){
                        if(res.status==200){
                            toaster.pop({
                                type: 'success',
                                title: '',
                                body: '删除成功',
                                showCloseButton: false
                            });
                            //关闭弹窗
                            layer.close( $scope.index);
                            queryList();

                        }else{
                            toaster.pop({
                                type: 'error',
                                title: '',
                                body: '删除失败',
                                showCloseButton: false
                            });
                        }
                    })
                }
            })

        }
        
        //加载列表
        function queryList(test) {

            if (test == undefined) {
                queryAll();
            }
            var H = document.documentElement.clientHeight;

            var val = {
                pageSize: Math.floor((H - 250) / 40)>0?Math.floor((H - 250) / 40):1
            };
            $.extend(val, test);
            if(true==test||false==test){
                dataService.getData('widgetList', val).success(function (rs) {

                    $scope.g =  $("#tables_con_show").ligerGrid({
                        columns: adminListTpl.columns,
                        cssClass: "ligerClass",
                        isScroll: false,
                        headerRowHeight: 45,
                        checkbox: test,
                        frozenCheckbox: false,
                        rowHeight: 40,
                        pageParmName: 'pageNum',
                        pagesizeParmName: 'pageSize',
                        columnWidth: 170,
                        alternatingRow: false, //单双行差异去除
                        data: {
                            Rows: rs.data
                        },
                        record: rs.total,
                        onAfterShowData: function (data) {
                            var gird1Width = $('.l-frozen .l-grid1').width();
                            $('.l-grid2').css({right: gird1Width,left: '0px',width:'auto'});
                        },
                        onBeforeShowData: function (data) {
                            $('.l-panel-bar').remove()
                            if(rs.data.length==0){
                                $('.l-grid2').css('left','0px')
                            }
                        },
                        onContextmenu: function (parm, e) {
                            $scope.parm = parm.data;
                            var items = [{
                                text: '修改',
                                click: itemclick,
                            }, {
                                text: '预览',
                                click: itemclick,
                            }, {
                                text: '删除',
                                click: itemclick,
                            }];
                            getLigerMenu(items);
                            menu.show({
                                top: e.pageY,
                                left: 1250,
                            });
                            return false;
                        }
                    });
                });
            }else{
                dataService.getData('widgetList', val).success(function (rs) {

                    $("#tables_con_show").ligerGrid({
                        columns: adminListTpl.columns,
                        cssClass: "ligerClass",
                        isScroll: false,
                        headerRowHeight: 45,
                        rowHeight: 40,
                        pageParmName: 'pageNum',
                        pagesizeParmName: 'pageSize',
                        columnWidth: 170,
                        alternatingRow: false, //单双行差异去除
                        data: {
                            Rows: rs.data
                        },
                        record: rs.total,
                        onAfterShowData: function (data) {
                            var gird1Width = $('.l-frozen .l-grid1').width();
                            $('.l-grid2').css({right: gird1Width,left: '0px',width:'auto'});
                        },
                        onBeforeShowData: function (data) {
                            $('.l-panel-bar').remove()
                            if(rs.data.length==0){
                                $('.l-grid2').css('left','0px')
                            }
                        },
                        onContextmenu: function (parm, e) {
                            $scope.parm = parm.data;
                            var items = [{
                                text: '修改',
                                click: itemclick,
                            }, {
                                text: '预览',
                                click: itemclick,
                            }, {
                                text: '删除',
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
            }


        }

        dataService.getData('widgetList', '').success(function (rs) {
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
                $('.l-panel-bar').remove()
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
                    queryList(val)

                }
            });
        })

        queryList();

        $scope.exampleCtrlPageUpdata = function (id) {
            $state.go('g.plugins.editexample', {
                id: id
            });
        }

    }
]);
//============================================操作==================================
//修改实例
function updateExamp(id) {
    var scope = angular.element($("#tables_wrap")).scope();
    scope.exampleCtrlPageUpdata(id)
};
//删除实例
function delExamp(id) {
    var scope = angular.element($("#tables_wrap")).scope();
    scope.$apply(function () {
        layer.confirm('你确定要删除该实例吗?', {
            // icon: 3
        }, function (index) {
            var params = {
                id: id,
            };
            $.ajax({
                type: 'GET',
                headers: {
                    'ticket': Cookies.get('auth') || ''
                },
                url: '/wlgfapi/widget/deleteWidgetSample',
                data: params,
                dataType: "json"
            }).done(function (data) {
                if (data.status == 200) {
                    layer.msg('删除成功!');
                    scope.queryAll(); //重新加载页面数据
                } else {
                    layer.msg('删除失败!');
                }
            }).fail(function () {
                layer.msg('删除失败!');
            });
        })
    });
}