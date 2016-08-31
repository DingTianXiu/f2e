
app.directive('table-list', ['$state', 'globalConfig', '$rootScope', 'dataService', '$compile',
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
