/**
 * 标签表管理
 */
app.controller('dialogDeployCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', '$cookies', 'dataService', 'FileUploader', 'toaster',
    function ($scope, globalConfig, $rootScope, $stateParams, $cookies, dataService, FileUploader, toaster) {
        // 页面初始数据
        $scope.iniData = {
            deployServer: [],//部署服务器
            deployPath: '', // 部署目录
            startScriptFileUid: '',//启动命令
            labelGroupId: $stateParams.id
        };
        // 上传状态等
        $scope.upload = {
          uploadScrpit: {
            status: 0, // 上传前，上传失败 0， 上传中 1， 上传成功 2
            progress: 0,
            fileName: ''
          }
        }
        // 获得服务器列表
        function deployServer() {
            dataService.getData('queryByParentId', {
                parentId: 32
            }).success(function (rs) {
                $scope.iniData.deployServerList = rs.data;
                $scope.iniData.deployServer = rs.data[0]['id'];
            });
        };
        deployServer();
        //取消按钮
        $scope.closeWindow = function () {
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
        }

        // // 上传脚本文件
        // $scope.uploadScrpit = function (file) {
        //     Upload.upload({
        //         url: globalConfig.api.uploadFile,
        //         data: {
        //             file: file,
        //             'username': $scope.username
        //         }
        //     }).then(function (resp) {
        //         $scope.upload.uploadScrpit.status = true; // 上传完成
        //         $scope.upload.uploadScrpit.fileName = resp.config.data.file.name; // 文件名
        //         $scope.iniData.startScriptFileUid = resp.data.data.uid;
        //     }, function (resp) {
        //         //   console.log('Error status: ' + resp.status);
        //     }, function (evt) {
        //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //         $scope.upload.uploadScrpit.progress = progressPercentage;
        //     });
        // };
        // 删除上传脚本
        $scope.delUploadScrpit = function () {
            $scope.upload.uploadScrpit.status = false;
            $scope.upload.uploadScrpit.progress = 0;
            $scope.upload.uploadScrpit.fileName = '';
            $scope.iniData.startScriptFileUid = '';
        }

        // 上传启动脚本
        var uploaderStartScript = $scope.uploaderStartScript = new FileUploader({
          url: globalConfig.api.uploadFile +'?type=start_script' ,
          autoUpload: true,
          queueLimit: 1,
          headers: {
            ticket: $cookies.get('auth')
          },
          removeAfterUpload: true,
          onWhenAddingFileFailed: function(item, filter, options) { // 上传前失败
            toaster.clear();
            if (filter.name == 'enforceMaxFileSize') {
              toaster.pop({
                type: 'error',
                title: '',
                body: '上传文件大小超过20M',
                showCloseButton: false
              });
            }

            if (filter.name == 'scriptfileType') {
              toaster.pop({
                type: 'error',
                title: '',
                body: '文件格式应为sh中的一种',
                showCloseButton: false
              });
            }
            $('#uploaderStartScriptid').val('');
          },
          onProgressItem: function(item, progress) {
            $scope.upload.uploadScrpit.status = 1;
          },
          onSuccessItem: function(item, response, status, headers) { // 上传成功
            if (status === 200 && response.status === 200) {
              $scope.upload.uploadScrpit.status = 2; // 上传完成
              $scope.upload.uploadScrpit.fileName = response.data.name; // 文件名
              $scope.iniData.startScriptFileUid = response.data.uid;
              $('#uploaderStartScriptid').val('');
            } else if (status === 200 && response.status === 503) {
              $scope.upload.uploadScrpit.status = 0; // 上传完成
              toaster.clear();
              toaster.pop({
                  type: 'error',
                  title: '',
                  body: response.msg,
                  showCloseButton: false
              });
              $('#uploaderStartScriptid').val('');
            }
          }
        });
        uploaderStartScript.filters.push({
          'name': 'enforceMaxFileSize',
          'fn': function(item) {
            return item.size <= 20971520; // 20 MiB to bytes
          }
        });
        uploaderStartScript.filters.push({
          'name': 'scriptfileType',
          'fn': function(item) {
            return /^.*?\.(sh)$/.test(item.name)
          }
        });

        // 保存数据并跳转
        $scope.saveCreateTag = function () {
          $scope.submited = true;

          if ($scope.deployForm.$valid) {


            var params = {
                deployServer: $scope.iniData.deployServer,
                deployPath: $scope.iniData.deployPath,
                startScriptFileUid: $scope.iniData.startScriptFileUid,
                labelGroupId: $scope.iniData.labelGroupId
            };

            //发送请求
            dataService.postData('deploy', params).success(function (rs) {
                // console.log(rs);
                if (rs.status == 200) {
                    window.parent.location.reload();
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else {


                    // var index = parent.layer.getFrameIndex(window.name);
                    //  parent.layer.close(index);
                    // alert(rs.msg);
                    //  alert(rs.msg)
                    //window.parent.location.reload();

                }
            })

            }
        };


    }]);

/**
 * 弹窗通用方法抽取
 */
app.controller('dialogCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService', '$cookies',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService, $cookies) {
        $scope.indexOpen = parent.layer.getFrameIndex(window.name); //获取窗口索引

        /**
         * 加载下拉树
         */
        $scope.comboBoxInit = function (option) {
            $rootScope.safeApply(function () {
                $scope.comboBoxOption = {
                    url: option.url,
                    parms: option.parms || {rootId: 0,state:option.state},
                    width: option.width || 398,
                    delValue: option.delValue == 'undefined' ? 0 : option.delValue,
                    onSelected: option.onSelected

                }
            });

        }
        /**
         * 取消按钮
         */
        $scope.closeOpen = function () {
            parent.layer.close($scope.indexOpen);
        }

        /**
         *
         * @param rs 接口返回数据
         * @param msg 要返回的提示信息
         * @param data 要返回的数据
         */
        $scope.backInfo = function (rs, msg, data) {
            console.log(data);
            $rootScope.safeApply(function () {
                if (rs.status == 200) {
                    parent.layer.msg(msg + '成功!', {icon: 1});
                    parent.$("#closeOpen").val(JSON.stringify(data));
                    parent.$("#closeOpen").click();//触发回调函数
                    parent.layer.close($scope.indexOpen);
                } else {
                    parent.layer.msg(rs.msg == undefined ? msg + '失败!' : rs.msg, {icon: 2});
                    parent.layer.close($scope.indexOpen);
                }
            });
        }


    }]);

/**
 * 设为资源组弹窗
 * 20160321弃用  使用直接设为资源组的方式
 */
app.controller('tagSourceConfigSetGrounpCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {
        /**
         *  确定按钮
         */
        $scope.formatOpen = function () {

            $scope.option = {id: $scope.option.id, isGroup: false}
            dataService.getData('changeResGroup', $scope.option).success(function (rs) {
                //调用通用返回信息
                $scope.$parent.backInfo(rs, '设置资源组', '设为资源组');
            });
        }

        /**
         * 查询修改之前的数据
         */
        $scope.getUpdateData = function () {
            dataService.getData('sourceConfigById', {
                id: $scope.option.id
            }).success(function (rs) {
                $scope.option = rs.data;
            });
        };

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {};
            //读取数据id, name
            $scope.option.id = $stateParams.id;
            $scope.getUpdateData();//获取修改前数据
        }

        $scope.queryAll();//加载初始化函数
    }]);

/**
 * 编辑资源信息弹窗
 * 陈敬20160318
 */
app.controller('tagSourceConfigModifyCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {

        $(".l-box-select").css("width",218 +'px !important');
        /**
         * 加载修改下拉框
         */
        $scope.loadAdvanceSelect = function () {

            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;

            //使用状态下拉
            var statusHtml = [];
            $.each(selects.useStatus, function (index, item) {
                statusHtml.push({id: item[0], name: item[1]});
            });
            $scope.statusSelect = angular.copy(statusHtml);
        }

        /**
         *  确定按钮
         */
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            }
            delete $scope.option.code;//删除英文名称
            dataService.getData('sourceConfigModify', $scope.option).success(function (rs) {
                $scope.$parent.backInfo(rs, '编辑', '');
            });
        }

        /**
         * 查询修改之前的数据
         */
        $scope.getUpdateData = function () {
            dataService.getData('sourceConfigById', {
                id: $scope.option.id
            }).success(function (rs) {
                $scope.option.code = rs.data.code;
                $scope.option.name = rs.data.name;
                $scope.option.parentId = rs.data.parentId;
                $scope.option.status = rs.data.status;
                $scope.option.comment = rs.data.comment;
                $scope.$parent.comboBoxInit({url: 'resGetTree', delValue: rs.data.parentId});//加载下拉树
            });
        };

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {
                id: $stateParams.id,
                name: $stateParams.name
            };


            $scope.loadAdvanceSelect();//加载下拉
            $scope.getUpdateData();//获取修改前数据


        }
        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 新增资源信息弹窗
 * 陈敬20160318
 */
app.controller('tagSourceConfigAddCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {
        //字符过长提示
        $scope.maxLength = true;
        //监控输入字符
        $scope.$watch('option.comment', function (newValue) {
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
        /**
         * 加载修改下拉框
         */
        $scope.loadAdvanceSelect = function () {

            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;

            //使用状态下拉
            var statusHtml = [];
            $.each(selects.useStatus, function (index, item) {
                statusHtml.push({id: item[0], name: item[1]});
            });
            $scope.statusSelect = statusHtml;
            $scope.option.status = 'y';//设置默认选中

            //资源类型
            // var isLeafHtml = [];
            // isLeafHtml.push({id: 'y', name: '资源'});
            // isLeafHtml.push({id: 'n', name: '资源组'})
            // $scope.isLeafSelect = isLeafHtml;

        }


        /**
         *  确定按钮提交数据
         */
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            var selectedOption = window.location.hash.substr(window.location.hash.length-1,1);
            $scope.option.isLeaf = selectedOption;//设置默认选中
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            }
            if ($scope.option.isLeaf == 'y') {//选择资源时返回状态刷新相关列表
                data = $scope.option.parentId;
            }else{
                data = $scope.option;
            }
            console.log(data);
            dataService.getData('sourceConfigCreate', $scope.option).success(function (rs) {
                $scope.$parent.backInfo(rs, '新增', data);
            });
        }

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {};
            $scope.loadAdvanceSelect();//加载下拉
            $scope.$parent.comboBoxInit({url: 'resGetTree', delValue: $stateParams.parentId});//加载下拉树
        }
        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 新增权限弹窗(权限)
 */
app.controller('permissionsConfigAddCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {

        /**
         * 加载修改下拉框
         */
        $scope.loadAdvanceSelect = function () {

            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;

            //使用状态下拉
            var statusHtml = [];
            $.each(selects.useStatus, function (index, item) {
                statusHtml.push({id: item[0], name: item[1]});
            });
            $scope.statusSelect = statusHtml;
            $scope.option.status = 'y';//设置默认选中
        }


        /**
         *  确定按钮提交数据
         */
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            } else if (!$scope.addFlag) {
                layer.msg('权限只能添加在页面中!');
                return;
            }

            $scope.option.type = $rootScope.addPermissionsType['permission'].code;//设置权限类型

            dataService.getData('permissionCreate', $scope.option).success(function (rs) {
                $scope.$parent.backInfo(rs, '新增', $scope.option.parentId);
            });
        }

        //点击下拉树回调函数
        $scope.treeCallBackFun = function (id) {
            dataService.getData('permissionGet', {id: id}).success(function (rs) {
                    if (rs.data.type != $rootScope.addPermissionsType.page.code) {
                        layer.msg('权限只能添加在页面中!');
                        $scope.addFlag = false;
                    } else {
                        $scope.addFlag = true;
                    }
                }
            )
        }

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {};
            $scope.addFlag = false;
            $scope.loadAdvanceSelect();//加载下拉
            $scope.$parent.comboBoxInit({url: 'permissionGetTree', delValue: 0, onSelected: $scope.treeCallBackFun});//加载下拉树
        }
        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 新增权限弹窗(页面)
 */
app.controller('permissionsConfigAddByPageCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {
        /**
         *  确定按钮提交数据
         */
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            } else if (!$scope.addFlag) {
                layer.msg('页面只能添加在菜单中!');
                return;
            }

            $scope.option.type = $rootScope.addPermissionsType['page'].code;//设置权限类型
            $scope.option.status = 'y';//设置默认状态

            dataService.getData('permissionCreate', $scope.option).success(function (rs) {
                $scope.$parent.backInfo(rs, '新增', $scope.option.parentId);
            });
        }

        //点击下拉树回调函数
        $scope.treeCallBackFun = function (id) {
            dataService.getData('permissionGet', {id: id}).success(function (rs) {
                    if (rs.data.type != $rootScope.addPermissionsType.menu_group.code) {
                        layer.msg('页面只能添加在菜单组中!');
                        $scope.addFlag = false;
                    } else {
                        $scope.addFlag = true;
                    }
                }
            )
        }

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {};
            $scope.addFlag = false;
            $scope.$parent.comboBoxInit({url: 'permissionGetTree', delValue: 0, onSelected: $scope.treeCallBackFun});//加载下拉树
        }
        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 新增权限弹窗(菜单组)
 */
app.controller('permissionsConfigAddByNavGrounpCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {

        /**
         *  确定按钮提交数据
         */
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            } else if (!$scope.addFlag) {
                layer.msg('菜单组不能添加在页面或权限中!');
                return;
            }

            $scope.option.status = 'y';//设置默认状态
            $scope.option.type = $rootScope.addPermissionsType['menu_group'].code;//设置权限类型

            dataService.getData('permissionCreate', $scope.option).success(function (rs) {
                $scope.$parent.backInfo(rs, '新增', $scope.option.parentId);
            });
        }

        //点击下拉树回调函数
        $scope.treeCallBackFun = function (id) {
            if (id == 0) {//判断根节点
                $scope.addFlag = true;
                return;
            }
            dataService.getData('permissionGet', {id: id}).success(function (rs) {
                    if ((rs.data.type != $rootScope.addPermissionsType.menu_group.code) && (id != 0)) {
                        layer.msg('菜单组不能添加在页面或权限中!');
                        $scope.addFlag = false;
                    } else {
                        $scope.addFlag = true;
                    }
                }
            )
        }

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {};
            $scope.addFlag = true;
            $scope.$parent.comboBoxInit({url: 'permissionGetTree', delValue: 0, onSelected: $scope.treeCallBackFun});//加载下拉树
        }
        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 修改权限信息弹窗
 * 陈敬20160321
 */
app.controller('permissionsConfigModifyCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {

        /**
         * 加载修改下拉框
         */
        $scope.loadAdvanceSelect = function () {

            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;

            //使用状态下拉
            var statusHtml = [];
            $.each(selects.useStatus, function (index, item) {
                statusHtml.push({id: item[0], name: item[1]});
            });
            $scope.statusSelect = statusHtml;
            $scope.option.status = 'y';//设置默认选中
        }

        /**
         *  确定按钮
         */
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            }
            delete $scope.option.code;//删除英文名称
            delete $scope.option.type;//删除类型字段
            dataService.getData('permissionModify', $scope.option).success(function (rs) {
                $scope.$parent.backInfo(rs, '修改', $scope.option.parentId);
            });
        }

        /**
         * 查询修改之前的数据
         */
        $scope.getUpdateData = function () {
            dataService.getData('permissionGet', {
                id: $scope.option.id
            }).success(function (rs) {
                //$scope.option = rs.data;
                $scope.option.code = rs.data.code;
                $scope.option.id = rs.data.id;
                $scope.option.name = rs.data.name;
                $scope.option.comment = rs.data.comment;
                $scope.option.status = rs.data.status;
                $scope.option.type = rs.data.type;
                $scope.option.url = rs.data.url;
                $scope.$parent.comboBoxInit({url: 'permissionGetTree', delValue: rs.data.parentId});//加载下拉树
                $("#type").html('<option selected="selected" value="">' + $rootScope.addPermissionsType[rs.data.type].name + '</option>');
            });
        };

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {
                id: $stateParams.id
            };

            $scope.loadAdvanceSelect();
            $scope.getUpdateData();//获取修改前数据


        }
        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 新增角色信息弹窗
 */
app.controller('tagRoleConfigAddCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService', '$state',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService, $state) {
        /**
         * 加载新增下拉框
         */
        $scope.loadAdvanceSelect = function () {
            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;
            //使用状态下拉
            var statusHtml = [];
            $.each(selects.useStatus, function (index, item) {
                statusHtml.push({id: item[0], name: item[1]});
            });
            $scope.statusSelect = statusHtml;
            $scope.option.status = 'y';
        }

        /**
         *  确定按钮提交数据
         */
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            }
            dataService.getData('RoleConfigCreate', $scope.option).success(function (rs) {

                $scope.$parent.backInfo(rs, '新增', $scope.option.parentId);
            });

        }
        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {};
            $scope.loadAdvanceSelect();//加载下拉
            $scope.$parent.comboBoxInit({url: 'getRoleTree', delValue: $stateParams.parentId});//加载下拉树
        }
        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 编辑角色信息弹窗
 */
app.controller('tagRoleConfigModifyCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {
        // 页面初始数据
        $scope.iniData = {
            id: $stateParams.id,
            parentId: '',
            code: '',
            name: '',
            status: '',
            comment: ''
        };

        $scope.option = {};
        // 获取角色信息
        function getRoleById() {
            dataService.getData('getRoleById', {
                id: $scope.iniData.id
            }).success(function (rs) {
                $scope.option.id = rs.data.id;
                $scope.option.code = rs.data.code;
                $scope.option.name = rs.data.name;
                $scope.option.status = rs.data.status;
                $scope.option.comment = rs.data.comment;
                $scope.$parent.comboBoxInit({url: 'getRoleTree', delValue: rs.data.parentId});//加载下拉树
                $("#createSelectRole_val").val(rs.data.parentId)

            });
        }

        /**
         * 加载修改下拉框
         */
        $scope.loadAdvanceSelect = function () {
            //获取配置数据
            var selects = $rootScope.defaultAdvancedSearchSelect;

            //使用状态下拉
            var statusHtml = [];
            $.each(selects.useStatus, function (index, item) {
                statusHtml.push({id: item[0], name: item[1]});
            });
            $scope.statusSelect = angular.copy(statusHtml);
        }

        // 保存数据并跳转
        $scope.formatOpen = function () {
            $scope.option.parentId = $("#createSelectRole_val").val();//获取下拉树的值
            if (!$scope.typeLabelForm.$valid) {
                $scope.submited = true;
                layer.msg('请按照要求填写');
                return;
            } else if ($("#createSelectRole_val").val() == null || $("#createSelectRole_val").val() == '') {
                layer.msg('请选择父节点');
                return;
            }
            delete $scope.option.code;//删除英文名称
            var params = $scope.option;
            dataService.postData('roleConfigModify', $scope.option).success(function (rs) {

                $scope.$parent.backInfo(rs, '修改', $scope.option.parentId);
            });
        }

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            $scope.loadAdvanceSelect();//加载下拉
            getRoleById();////获取修改之前数据


        }

        $scope.queryAll();//加载初始化函数

    }]);

/**
 * 修改用户角色信息弹窗
 * 陈敬20160325
 */
app.controller('clientConfigModifyCtrl', ['$scope', 'globalConfig', '$rootScope', '$stateParams', 'dataService',
    function ($scope, globalConfig, $rootScope, $stateParams, dataService) {
        /**
         *  确定按钮
         */
        $scope.formatOpen = function () {
            $scope.option.roleIds = [$("#createSelectRole_val").val()];//获取下拉树的值
            //delete $scope.option.userName;
            //delete $scope.option.loginName;
            //delete $scope.option.departName;
            //delete $scope.option.job;
            dataService.getData('userCreateUserRoleRel', $scope.option).success(function (rs) {
                $scope.$parent.backInfo(rs, '保存', '');
            });
        }

        /**
         * 页面入口函数
         */
        $scope.queryAll = function () {
            //数据初始化
            $scope.option = {
                userId: $stateParams.userId,
                userName: $stateParams.userName,
                loginName: $stateParams.loginName,
                departName: $stateParams.departName,
                job: $stateParams.job,
                roleId: $stateParams.roleId
            };
            $("#departName").html('<option selected="selected" value="">' + $stateParams.departName + '</option>');
            $("#job").html('<option selected="selected" value="">' + $stateParams.job + '</option>');
            $scope.$parent.comboBoxInit({url: 'getRoleTree', delValue: $scope.option.roleId=='null'?'0':$scope.option.roleId,state:true});

        }
        $scope.queryAll();//加载初始化函数

    }]);
