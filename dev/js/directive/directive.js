/**
 * Created by Administrator on 2016/3/16 0016.
 */

/**
 * LigerUi页面列表封装指令(用户权限配置)
 * Created by ArvinChen9539
 */
app.directive('getRolePermissions', ['$state', 'globalConfig', '$rootScope', 'dataService', '$compile',
    function ($state, globalConfig, $rootScope, dataService, $compile) {
        return {
            restrict: 'AE',
            scope: {
                ngModel: '=',
                pageData: '=',
                pageName: '@'
            },
            template: '' +
            '<div ng-repeat="item1 in pageDataOption"><!-- 标签组循环 -->' +

            '               <div class="page-permiss page-packup" ng-show="item1.isShow!=1" ng-if="item1.type==\'menu_group\'">' +
            '                   <button class="unfold-btn" ng-click="showHide(item1)">展开</button>' +
            '                   <div class="pages">' +
            '                       <div class="pages-option">' +
            '                           <h2>{{item1.name}}</h2>' +
            '                       </div>' +
            '                   </div>' +
            '               </div>' +

            '               <div class="page-permiss page-unfold" ng-show="item1.isShow==1" ng-if="item1.type==\'menu_group\'">' +
            '                   <button class="packup-btn" ng-click="showHide(item1)">收起</button>' +

            '                   <div class="pages">' +
            '                       <div class="pages-option">' +
            '                           <h2 title="{{item1.name}}">{{item1.name}}</h2>' +
            '                           <label for="d-{{item1.id}}"><input type="checkbox" date-link="allSources" name="{{pageName}}all{{item1.id}}" id="d-{{item1.id}}" value="{{item1.id}}" status="{{item1.status}}"/>全选</label>' +
            '                       </div>' +
            '                       <div ng-repeat="item2 in item1.children" id="box-{{item1.id}}"><!-- 页面循环 -->' +
            '                           <div class="pages-option" ng-if="item2.type==\'page\'" id="box-{{item2.id}}">' +
            '                               <h3>{{item2.name}}</h3>' +
            '                               <label for="d-{{item2.id}}"><input type="checkbox" date-link="allSources" name="{{pageName}}all{{item1.id}}-all{{item2.id}}"  id="d-{{item2.id}}" value="{{item2.id}}" status="{{item2.status}}"/>' +
            '                               全选</label>' +

            '                               <ul>' +

            '                                   <li ng-repeat="item3 in item2.children">' +
            '                                       <label for="d-{{item3.id}}"><input type="checkbox" name="{{pageName}}all{{item1.id}}-all{{item2.id}}-all{{item3.id}}" date-link="sources" date-ilink="sources2" value="{{item3.id}}" id="d-{{item3.id}}" status="{{item3.status}}"/>' +
            '                                       {{item3.name}}</label>' +
            '                                   </li>' +

            '                               </ul>' +

            '                           </div>' +
            '                       </div>' +
            '                   <get-role-permissions page-name="{{pageName}}all{{item1.id}}-" page-data="item1.children" ng-if="item1.children!=\'undefined\'"></get-role-permissions>' +
            '                   </div>' +
            '               </div>' +
            '</div>',
            link: function (scope, ele, attrs) {
                /**
                 * 列表展开与收缩
                 * @param item
                 */
                scope.showHide = function (item) {
                    if (item.isShow == 1) {
                        item.isShow = 0;
                    } else {
                        item.isShow = 1;
                    }
                }


                scope.$watch('ngModel', function (data) {
                    if (scope.ngModel != undefined) {
                        $rootScope.safeApply(function () {
                            scope.pageDataOption = angular.copy(scope.ngModel.pageOption);
                        });
                    } else if (scope.pageData != undefined) {
                        scope.pageDataOption = angular.copy(scope.pageData);
                    }
                })

            }

        };

    }]);


/**
 * LigerUi下拉树封装指令
 */
app.directive('myLigeruiComboBox', ['$state', 'globalConfig', '$rootScope', 'dataService',
    function ($state, globalConfig, $rootScope, dataService) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                labelText: '@',
                comboBoxId: '@',
                comboBoxClass: '@',
                rootText: '@',
                divClass: '@',
                ngModel: '='
            },
            template: '<div class="{{divClass}}"><input style="margin-left:0;width:218px;" id="{{comboBoxId}}" class="{{comboBoxClass}}"/></div>',
            link: function (scope, ele, attrs) {

                // 查询下拉树数据
                scope.queryRoleTree = function () {
                    dataService.getData(scope.ngModel.url, scope.ngModel.parms).success(function (rs) {
                        rs.data.name = scope.rootText ? scope.rootText : '根';
                        rs.data.code = 'root';
                        var tree = [];
                        tree.push($rootScope.treeDataUtil(rs.data));
                        scope.TreeData = tree;
                        scope.ngModel.treeData = tree;
                        scope.loadSelectTree();
                    });
                };
                /**
                 * 加载下拉树
                 */
                scope.loadSelectTree = function () {
                    var combo = $("#" + scope.comboBoxId).ligerComboBox({
                        width: 235,
                        selectBoxWidth: 200,
                        selectBoxHeight: 200,
                        checkbox: false,
                        treeLeafOnly: false,   //是否只选择叶子
                        valueField: scope.ngModel.valueField || 'id',
                        textField: scope.ngModel.textField || 'name',
                        //selectBoxPosYDiff : -3, //下拉框位置y坐标调整
                        tree: {
                            data: angular.copy(scope.TreeData),
                            checkbox: false,
                            textFieldName: scope.ngModel.textFieldName || 'name',
                            textFieldID: scope.ngModel.textFieldID || 'id'
                        },
                        onSelected: scope.ngModel.onSelected || ''

                    });
                    combo.selectValue(scope.ngModel.delValue);//默认选中值
                    // combo1.setId($scope.option.parentId);
                }

                scope.$watch('ngModel', function (data) {
                    if (scope.ngModel != undefined) {
                        scope.queryRoleTree()
                    }
                })

            }

        };

    }]);

/**
 * LigerUi树型菜单封装指令
 */
app.directive('myLigeruiTree', ['$state', 'globalConfig', '$rootScope', 'dataService',
    function ($state, globalConfig, $rootScope, dataService) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                rootText: '@',
                ngModel: '='
            },
            template: '<div class="res_label" id="groupTree">',
            link: function (scope, ele, attrs) {
                /**
                 * 获取树节点数据
                 */
                scope.queryDataZree = function () {
                    dataService.getData(scope.ngModel.url, scope.ngModel.parms).success(function (rs) {
                            if (rs.data == null) {
                                return;
                            }
                            rs.data.name = scope.rootText ? scope.rootText : '根';
                            rs.data.id = 0;
                            rs.data.code = 'root';
                            var tree = [];
                            tree.push($rootScope.treeDataUtil(rs.data));//转换树数据特殊字符
                            scope.TreeData = tree;
                            scope.treeList();//加载树
                        }
                    );
                }

                /**
                 * 加载树图
                 */
                scope.treeList = function () {
                    $rootScope.safeApply(function () {
                        //$scope.delChildrenByNull();
                        $("#groupTree").ligerTree({
                            data: angular.copy(scope.TreeData),
                            checkbox: false,
                            slide: false,
                            attribute: ['id', 'name'],
                            textFieldName: 'name',
                            single: true,
                            nodeWidth: 120,
                            onClick: function (node) {
                                scope.ngModel.fun(node);
                            }
                        });
                    })
                }


                scope.$watch('ngModel', function (data) {
                    if (scope.ngModel != undefined) {
                        scope.queryDataZree();
                    }
                })

            }

        };

    }]);

/**
 * LigerUi页面列表封装指令
 */
app.directive('myLigeruiList', ['$state', 'globalConfig', '$rootScope', 'dataService',
    function ($state, globalConfig, $rootScope, dataService) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                ngModel: '='
            },
            template: ' <div id="tables_con_show" class="tables_con1-x"></div>',
            link: function (scope, ele, attrs) {
                scope.g = null;
                /**
                 * 加载列表
                 */
                scope.queryList = function () {
                    if (scope.g != null) {
                        scope.pageSize = $(".l-bar-selectpagesize select", scope.g.toolbar).val();
                    }
                    $(function () {
                        scope.g = $("#tables_con_show").ligerGrid({
                            columns: angular.copy(scope.ngModel.columns),
                            url: angular.copy(scope.ngModel.url),
                            root: "data",
                            record: "total",
                            pagesizeParmName: "pageSize",
                            pageParmName: "pageNum",
                            pageSize: scope.pageSize || 20,
                            headerRowHeight: scope.ngModel.headerRowHeight || "auto",
                            rowHeight: scope.ngModel.rowHeight || "auto",
                            method: "get",
                            dataAction: "server",
                            enabledSort: true,
                            sortnameParmName: 'property',        //页排序列名(提交给服务器)
                            sortorderParmName: 'direction',   //页排序方向(提交给服务器)
                            cssClass: "ligerClass",
                            isScroll: true,
                            columnWidth: angular.copy(scope.ngModel.columnWidth) || '',                      //默认列宽度
                            allowAdjustColWidth: true,
                            width: angular.copy(scope.ngModel.width) || angular.copy(scope.ngModel.width),
                            parms: $.extend(true,
                                {acf_ticket: Cookies.get('auth') || '',//登陆状态
                                 rn: (new Date()).getTime()//解决IE缓存问题
                                 },
                                angular.copy(scope.ngModel.params)),
                            onBeforeShowData:scope.ngModel.onBeforeShowData,
                            onContextmenu:scope.ngModel.onContextMenu||null
                        });
                        $("#pageloading").hide();
                    });
                }


                scope.$watch('ngModel', function (data) {
                    if (scope.ngModel != undefined) {
                        scope.queryList()
                    }
                })

            }

        };

    }]);

/**
 * 普通下拉框和两级联动下拉封装指令
 */
app.directive('mySelect', ['$state', 'globalConfig', '$rootScope', 'dataService',
    function ($state, globalConfig, $rootScope, dataService) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                selectClass: '@',
                selectCode: '@',
                doubleSelectId: '@',
                selectName: '@',
                selectId: '@',
                ngModel: '='
            },
            template: '<select class="{{selectClass}}" name="{{selectName}}" id="{{selectId}}"  ng-options="m.id as m.name for m in selectOptions">' +
            '<option value="">请选择</option></select>',
            link: function (scope, ele, attrs) {
                if (!scope.selectCode) {
                    return;
                }
                //根据id查询下拉列表
                dataService.getData('queryByParentId', {
                    parentId: scope.selectCode
                }).success(function (rs) {
                    /*console.log(rs.data);
                     console.log(scope.selectCode);*/
                    scope.selectOptions = rs.data;

                });

                //判断是否是联动下拉
                if (scope.doubleSelectId) {
                    scope.$watch('ngModel', function (data) {
                        if (!data) {
                            //清空联动下拉内容
                            $("#" + scope.doubleSelectId).html('<option value="">请选择</option>');
                            return;
                        }
                        dataService.getData('queryByParentId', {
                            parentId: data
                        }).success(function (rs) {

                            //根据scope.doubleSelectId选择页面的下拉框赋值
                            var selectHtml = '<option value="">请选择</option>';
                            $.each(rs.data, function (index, item) {
                                selectHtml += '<option value="' + item.id + '">' + item.name + '</option>';
                            });
                            $("#" + scope.doubleSelectId).html(selectHtml);
                        });

                    }, true);
                }

            }
        };
    }]);

app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});


//验证是不是整数
app.directive('integer',function(){
        /*使用方法：
        * <input type="tel" class="form-control" name="age" required ng-model="age" integer/>
        *  <div class="help-block" ng-show="MyForm.age.$error.integer">该项必须为整数</div>
        *  tips：
        * 自定义指令用来校验是不是整数，记得这个时候不要使用input的number不然你输入abc等值的时候无法触发watch可以改用tel，
        * 如果不想使用这个指令也可以使用ng-pattern配合正则完成
        * */
        return {
            restrict:"A",
            require:'ngModel',
            link: function (scope, iElement, iAttrs,ngController) {
                var reg = /^\-?\d*$/;
                scope.$watch(iAttrs.ngModel, function (newVal) {
                    if(!newVal) return;
                    if(!reg.test(newVal)){
                        ngController.$setValidity('integer', false);
                    }else{
                        ngController.$setValidity('integer', true);
                    }
                });
            }
        }
});

app.directive('even',function(){
        return {
            restrict:"A",
            require:"ngModel",
            link:function(scope,ele,attrs,ngModelController){
                ngModelController.$parsers.push(function(viewValue){
                    if(viewValue % 2 === 0){
                        ngModelController.$setValidity('even',true);
                    }else{
                        ngModelController.$setValidity('even',false);
                    }
                    return viewValue;
                });
            }
        }
    })
    .directive('ensureUnique', ['$http','$timeout','$window',function($http,$timeout,$window) {
        return {
            restrict:"A",
            require: 'ngModel',
            link: function(scope, ele, attrs, ngModelController) {
                scope.$watch(attrs.ngModel, function(n) {
                    if (!n) return;
                    $timeout.cancel($window.timer);
                    $window.timer = $timeout(function(){
                        $http({
                            method: 'get',
                            url: '/api/checkusername/', //根据换成自己的url
                            params:{
                                "username":n
                            }
                        }).success(function(data) {
                            ngModelController.$setValidity('unique', data.isUnique); //这个取决于你返回的，其实就是返回一个是否正确的字段，具体的这块可以自己修改根据自己的项目
                        }).error(function(data) {
                            ngModelController.$setValidity('unique', false);
                        });
                    },500);
                });
            }
        };
    }]);

app.directive('validateInput', ['$state',  'appUtils', function ($state,  appUtils) {
    return {
        restrict: 'AE',
        //replace: true,
        scope: {
            options: '=',
            valueName: '@',
            name:'='
        },
        template: '<input type="text" name="name" class="cus-select" ng-model="fieldName"/>' +
        '<span class="color-red" ng-show="options[\'required\']">*</span>' +
        '<p class="p-tips"><span ng-show="options[\'showMessage\']" class="color-red" >{{messageInfo}}</span></p>',
        link: function (scope, element, attr, ngModel) {
            //element.on('keyup',function(){
            //    if(scope.valueName.length>scope.options.maxLength){
            //        scope.messageInfo = '长度不能大于'+scope.options.maxLength;
            //        scope.options['showMessage'] = true;
            //        scope.valueName = scope.valueName.substr(0, scope.options.maxLength);
            //    }else{
            //        scope.messageInfo = '';
            //        scope.options['showMessage'] = false;
            //    }
            //});

            scope.$watch('fieldName',function(val){
                if(val && scope.options.maxLength){
                    if(val.length>scope.options.maxLength){
                        scope.messageInfo = '长度不能大于'+scope.options.maxLength;
                        scope.options['showMessage'] = true;
                        scope.fieldName = val.substr(0, scope.options.maxLength);
                    }else{
                        scope.messageInfo = '';
                        scope.options['showMessage'] = false;
                    }
                }
                if(scope.options.pattern){
                    scope.pattern = new RegExp(scope.options.pattern);
                    //验证不通过
                    if(!scope.pattern.test(scope.fieldName)){
                        scope.messageInfo = scope.options.patternMsg;
                        scope.options['showMessage'] = true;
                    }else{
                        scope.messageInfo = '';
                        scope.options['showMessage'] = false;

                    }
                }
                scope.name[scope.valueName] = angular.copy(scope.fieldName);
            });

        }
    };
}]);

//让某元素获得焦点
app.directive('focusMe', function($timeout) {
    return {
        scope: { trigger: '@focusMe' },
        link: function(scope, element) {
            scope.$watch('trigger', function(value) {
                if(value === "true") {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
        }
    };
});
/**
 * 点击编辑
 */
app.directive('shiftInput', ['$state',  'appUtils', function ($state,  appUtils) {
    return {
        restrict: 'AE',
        scope: {
            options: '=',
            valueName: '@',
            callFun:'=',
            indexType:'@',
            inputWidth:'@',
            toExamine:'@'
        },
        template: '<div ng-show="options[\'isShow\'+valueName]"><input type="text" ng-change="toExamineFun()" ' +
        'ng-class="options[\'isRed\'+valueName]?\'alarmInput red\':\'alarmInput\'" ' +
        'ng-model="options[valueName]" focus-me="{{options[\'isShow\'+valueName]}}" ' +
        'ng-blur="cancel(valueName,options,$event)" ' +
        '/><a ng-click="switchEditText(options,valueName,callFun,$event)">确定</a><a ng-click="cancel(valueName,options,$event)">取消</a></div>'+
        '<span ng-class="options[\'isRed\'+valueName]?\'red\':\'\'" ng-show="!options[\'isShow\'+valueName]" ng-click="switchEditText(options,valueName,undefined,$event)">{{options[valueName]?options[valueName]:\'未设置\'}}</span>',
        link: function (scope, element, attr, ngModel) {
            scope.initialData = angular.copy(scope.options[scope.valueName]);

            /**
             * 取消事件
             * @param resData
             * @param event
             */
            scope.cancel = function(type,flag,event){
                flag[type] = angular.copy(scope.initialData);
                console.log(scope.initialData);
                //还原列表
                flag['isShow'+type]=false;
                //阻止事件传播
                if(event){
                    event.stopPropagation();
                }
            }
            var re =new RegExp(scope.toExamine);
            element.find("input").attr("style","width:"+scope.inputWidth);
            /**
             * 列表编辑事件
             */
            scope.switchEditText = function (flag,type,callFun,event){
                flag['isShow'+type]=!flag['isShow'+type];

                if(!flag['isShow'+type]){
                    if(!scope.toExamineFun()){
                        appUtils.msg('非法数据');
                        return;
                    }
                }
                //验证通过替换初始值
                scope.initialData = angular.copy(scope.options[scope.valueName]);

                if(callFun&&scope.initialData!=scope.options[scope.valueName]){
                    callFun(scope.options);
                }
                //阻止事件传播
                if(event){
                    event.stopPropagation();
                }
            }
            scope.toExamineFun = function(){
                if(!scope.toExamine){
                    return true;
                }

                if(re.test(scope.options[scope.valueName])&&scope.options[scope.valueName]){
                    scope.options['isRed'+scope.valueName]=false;
                    return true;
                }else{
                    scope.options['isRed'+scope.valueName]=true;
                    return false;
                }
            }
            scope.toExamineFun();
        }
    };
}]);

/**
 * 点击编辑
 */
app.directive('shiftSelect', ['$state',  'appUtils', function ($state,  appUtils) {
    return {
        restrict: 'AE',
        scope: {
            options: '=',
            valueName: '@',
            callFun:'=',
            indexType:'@',
            inputWidth:'@',
            selectOptions:'=',
            toExamine:'@'
        },
        template: '<select ng-model="options[valueName+\'select\']" ng-change="toExamineFun()" ng-class="options[\'isRed\'+valueName]?\'red\':\'\'"' +
        '  ng-blur="switchEditText(options,valueName,callFun)" ng-show="options[\'isShow\'+valueName]" focus-me="{{options[\'isShow\'+valueName]}}"' +
        ' ng-options="y.name for y in selectOptions"></select>'+
        '<span ng-class="options[\'isRed\'+valueName]?\'red\':\'\'" ng-show="!options[\'isShow\'+valueName]" ng-click="switchEditText(options,valueName)">{{options[valueName+\'select\'].name?options[valueName+\'select\'].name:\'未设置\'}}</span>',
        link: function (scope, element, attr, ngModel) {
            var initialData = angular.copy(scope.options[scope.valueName]);
            var re =new RegExp(scope.toExamine);

            if(scope.selectOptions){
                $.each(scope.selectOptions,function(index,item){
                    if(item.code == scope.options[scope.valueName]){
                        scope.options[scope.valueName+'select'] = item;
                    }
                });
            }
            scope.getUUID = function() {
                var id = setTimeout('0');
                clearTimeout(id);
                return id;
            };

            element.find("select").attr("style","width:"+scope.inputWidth);
            /**
             * 列表编辑事件
             */
            scope.switchEditText = function (flag,type,callFun){
                if(scope.options[scope.valueName+'select']){
                    scope.options[scope.valueName] = angular.copy(scope.options[scope.valueName+'select'].code);
                }

                flag['isShow'+type]=!flag['isShow'+type];

                if(!flag['isShow'+type]){
                    if(!scope.toExamineFun()){
                        appUtils.msg('非法数据');
                        return;
                    }
                }
                if(callFun&&initialData!=scope.options[scope.valueName]){
                    callFun(scope.options);
                }
                initialData = angular.copy(scope.options[scope.valueName]);
            }

            scope.toExamineFun = function(){
                if(!scope.toExamine){
                    return true;
                }

                if(re.test(scope.options[scope.valueName])&&scope.options[scope.valueName]){
                    scope.options['isRed'+scope.valueName]=false;
                    return true;
                }else{
                    scope.options['isRed'+scope.valueName]=true;
                    return false;
                }
            }
            scope.toExamineFun();
        }
    };
}]);

/**
 * 点击编辑
 */
app.directive('shiftDatePicker', ['$state',  'appUtils', function ($state,  appUtils) {
    return {
        restrict: 'AE',
        scope: {
            options: '=',
            valueName: '@',
            callFun:'=',
            indexType:'@',
            inputWidth:'@',
            toExamine:'@'
        },
        template: '<input date-picker type="text" ng-change="toExamineFun()" ' +
        'ng-class="options[\'isRed\'+valueName]?\'dateon red\':\'dateon\'" ' +
        'ng-model="options[valueName]" ' +
        'ng-blur="switchEditText(options,valueName,callFun)" ' +
        'ng-show="options[\'isShow\'+valueName]" options="datePickerOptions"/>'+
        '<span ng-class="options[\'isRed\'+valueName]?\'red\':\'\'" ng-show="!options[\'isShow\'+valueName]" ng-click="switchEditText(options,valueName)">{{options[valueName]?options[valueName]:\'未设置\'}}</span>',
        link: function (scope, element, attr, ngModel) {
            var initialData = angular.copy(scope.options[scope.valueName]);
            var re =new RegExp(scope.toExamine);
            element.find("input").attr("style","width:"+scope.inputWidth);
            /**
             * 列表编辑事件
             */
            scope.switchEditText = function (flag,type,callFun){
                //获取焦点
                if(flag['isShow'+type]){
                    element.find("input")[0].click();
                }
                flag['isShow'+type]=!flag['isShow'+type];

                if(!flag['isShow'+type]){
                    if(!scope.toExamineFun()){
                        appUtils.msg('非法数据');
                        return;
                    }
                }

                if(callFun&&initialData!=scope.options[scope.valueName]){
                    callFun(scope.options);
                }
            }
            scope.toExamineFun = function(){
                if(!scope.toExamine){
                    return true;
                }

                if(re.test(scope.options[scope.valueName])&&scope.options[scope.valueName]){
                    scope.options['isRed'+scope.valueName]=false;
                    return true;
                }else{
                    scope.options['isRed'+scope.valueName]=true;
                    return false;
                }
            }
            scope.toExamineFun();
        }
    };
}]);

/**
 * 悬浮提示
 */
app.directive('toolTips', ['$state', '$rootScope', '$compile',
    function ($state, $rootScope, $compile) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<a class="relteP" style="z-index: 999999;"><img class="alert" src="/public/images/alert.png">' +
            '<div class="absoluP" >' +
            '<div class="boxDivtip"></div>' +
            '</div>' +
            '</a>',
            // require: '?ngModel',
            scope: {
                ngModel: '='
            },
            link: function (scope, ele, attrs) {

                //绑定事件
                ele.bind('mouseover', function () {
                    $(this).find('.absoluP').show();
                });
                ele.bind('mouseleave', function () {
                    $(this).find('.absoluP').hide();
                });

                //填充文字内容
                var fill = function (data) {
                    // console.log(ele.html());
                    ele.find('.boxDivtip').text(data);

                }

                scope.$watch('ngModel', function (data) {
                    fill(data);
                }, true);
            }
        };
    }]);