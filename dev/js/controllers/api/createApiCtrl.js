/**
 * 保存api基本信息
 */
app.controller('createApiCtrl', ['$scope', '$state', '$cookies', 'globalConfig', 'dataService', 'toaster',
  function($scope, $state, $cookies, globalConfig, dataService, toaster) {

    $scope.initApiData = {
      validate:false,
      name:'',
      cname:'',
      version:'',
      comment:'',
      pathName:''
    }

    $scope.validateNameOption = {
      required:true,
      showMessage:false,
      maxLength:20,
      pattern:'^[A-Za-z]+$',
      patternMsg:'只支持英文和小数点'
    }
    $scope.validateCNameOption = {
      required:true,
      showMessage:false,
      maxLength:20
    }
    $scope.validateVersionOption = {
      required:true,
      showMessage:false,
      maxLength:20
    }

    /**
     * 初始化下拉树方法
     * @param option
     */
    $scope.comboBoxInit = function (option) {
      $scope.safeApply(function () {
        $scope.comboBoxOption = {
          url: option.url,
          parms: option.parms || {
            rootId: 0,
            state: option.state
          },
          width: option.width || 398,
          delValue: option.delValue == 'undefined' ? 0 : option.delValue,
          onSelected: option.onSelected
        }
      });
    };



    $scope.selectedNode = null;
    $scope.getSelectedOne = function (treeData, value, node) {
      if (!node) {
        angular.forEach(treeData, function (item) {
          if (value == item.id) {
            $scope.selectedNode = item;
          } else {
            if (item.children && !node) {
              $scope.getSelectedOne(item.children, value, node);
            }
          }
        });
      }
    };

    //点击下拉树回调函数
    $scope.categoryPath = '';
    $scope.treeCallBackFun = function (value) {
      $scope._categoryPath = '';
      $scope.selectedNode = {
        parentId: value
      };
      while ($scope.selectedNode.parentId != 1 && $scope.selectedNode.parentId) {
        var value = $scope.selectedNode.parentId
        $scope.selectedNode = null;
        $scope.getSelectedOne($scope.comboBoxOption.treeData, value, $scope.selectedNode);
        $scope._categoryPath = $scope._categoryPath === '' ? $scope.selectedNode.name : $scope.selectedNode.name + '>' + $scope._categoryPath;
      }
      angular.element('#creatCategory').text($scope._categoryPath);
      //$scope.initApiData.pathName = $scope._categoryPath
    };

    $scope.comboBoxInit({
      url: 'getCategoryTree',
      parms: {
        rootId: 24
      },
      onBeforeSelect: $scope.treeCallBackFun,
      onSelected: $scope.treeCallBackFun
    });

    //$scope.validate = function(){
    //  //(^[A-Za-z]+$)
    //  if($scope.initApiData.name.length>100){
    //    $scope.show_name = true;
    //    $scope.validate_name_info = '不能超过100字符';
    //    $scope.initApiData.name = $scope.initApiData.name.substr(0, 100);
    //    return;
    //  }else{
    //    $scope.show_name = false;
    //    $scope.validate_name_info = '';
    //  }
    //
    //}


    // 页面初始数据
    $scope.iniData = {
      categoryList: [],
      dataCategory: '',
      metaDbIdList: [], // 数据库名
      metaDbId: null,
      metaTableIdList: [], // 表名
      metaTableId: null,
      dataSourceList: [], // 数据源
      dataSource: null, // 数据源选中
      refreshCycleList: [], // 更新周期
      refreshCycle: null, // 更新周期选中项，
      scriptFileUid: '', // 脚本
      attachmentFileId: '', // 其他附件
      comment: '' // 表说明
    };

    //字符过长提示
    $scope.maxLength = true;



    // 设置高度
    $(".creat_wrap").css("height",$(window).height()-80);


    //取消按钮
    $scope.cancelTag = function() {
      $(".mask").show();
    };
    //继续设置
    $scope.next = function() {
      $(".mask").hide();
    };


    //监控输入字符
    $scope.$watch('iniData.comment', function (newValue) {
        if(newValue != null){
            $scope.textLength = newValue.length;
            if(newValue.length > 200){
                $scope.maxLength = false;
                $(".max-length").show();
            }else{
                $scope.maxLength = true;
                $(".max-length").hide();
            };
        }else{
            $scope.textLength = 0;
        }
        
    });
    // 保存数据并跳转
    $scope.saveCreateTag = function() {
      $scope.postData = {
        name:$scope.initApiData.name,
        cname:$scope.initApiData.cname,
        version:$scope.initApiData.version,
        comment:$scope.initApiData.comment,
        category: angular.element('#createSelectCategory').val()
      }
      $scope.postUrl= 'createApi';
      dataService.postData($scope.postUrl, $scope.postData).success(function (rs) {
          if(rs.status == 200){
            toaster.pop({
              type: 'success',
              title: '',
              body: rs.msg,
              timeout: 2000
            });

          }
      });

    };

  }
]);
