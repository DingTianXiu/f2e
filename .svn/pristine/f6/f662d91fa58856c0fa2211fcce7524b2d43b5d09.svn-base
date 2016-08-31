/**
 * 标签表管理
 */
app.controller('modifyTagConfigCtrl', ['$scope', 'globalConfig', 'dataService',
  function($scope, globalConfig, dataService) {
    /**
     * 页面初始化加载
     */
      $scope.queryAll = function(){
          //查询用户自定义查询标签配置数据
          $scope.queryViewColumn();
      }
      /*
      标签中心加载列表
       */
      $scope.queryViewColumn=function(){
        //访问接口
          dataService.getData('getLabelGroup', {
              id: 'view_column_label_center'
          }).success(function (rs) {
              if(rs.data){

              }else{

              }
          });
      }

      // 页面初始化配置
      $scope.page = {}
      $scope.queryAll();
  }]);
