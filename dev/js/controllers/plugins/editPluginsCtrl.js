/**
 * 新建控件
 */
app.controller('editPluginsCtrl', ['$scope', '$cookies', '$timeout', '$stateParams', 'globalConfig', 'dataService', 'FileUploader', 'toaster', '$state', 
  function($scope, $cookies, $timeout, $stateParams, globalConfig, dataService, FileUploader, toaster, $state) {

    var _id = $stateParams.id || ''; //id
    var _type = $stateParams.type || 'pre'; //id

    $scope.submited = false;

    //字符过长提示
    $scope.maxLength = true;
    // 页面配置
    $scope.pageData = {
      step: 1, // 步骤状态
      previewChartUrl: '/chartPreview.html',
      checkChart: '?',
      categoryList: [],
      baseLibList: [],
      sampleList: [],
      currentSample: null,
      currentSampleIndex: 0,
      currentSampleId: null
    }

    // 上传状态等
    $scope.upload = {
      uploadScrpit: {
        status: 0, // 上传前，上传失败 0， 上传中 1， 上传成功 2
        progress: 0,
        fileName: ''
      },
      uploadAttachment: {
        status: 0,
        progress: 0,
        fileName: ''
      },
      uploadDoc: {
        status: 0,
        progress: 0,
        fileName: ''
      },
      uploadThumbnail: {
        status: 0,
        progress: 0,
        fileName: ''
      }
    };
    
    // 设置高度
    $(".bq_wrap").css({"height":$(window).height(),"overflow-y":"auto"});
    $(".cb-h").css({"height":($(window).height()-325)/2,"overflow-y":"auto"});
    $(".CodeMirror-gutters").css("height",($(window).height()-325)/2);
    $("#chartPreviewIframe").css("height",$(window).height()-318);

    // 改变实例名称
    $scope.changeSampleVal = function() {
      // 根据id设置索引值
      var indexes = $.map($scope.pageData, function(obj, index) {
        if (obj.id == $scope.pageData.currentSampleId) {
          return index;
        }
      })
      //监控预览是否成功
      $scope.$watch('pageData.checkChart', function(data) {
        if(false==data){
          toaster.pop({
            type: 'error',
            title: '',
            body: '预览失败',
            showCloseButton: false
          });
        }
      });
      $scope.pageData.currentSampleIndex = indexes[0];

      $scope.formData.sampleStyle = $scope.sampleData[$scope.pageData.currentSampleIndex].sampleStyle;
      $scope.formData.sampleData = $scope.sampleData[$scope.pageData.currentSampleIndex].sampleData;

      document.getElementById('chartPreviewIframe').contentWindow.updatedata($scope.formData);
    };

    // 表单数据
    $scope.formData = {
      id: '',
      name: '',
      category: null,
      baseLibs: null,
      pluginFileUid: null,
      styleFileUid: null,
      docFileUid: null,
      widgetSampleName: '',
      thumbnailFileUid: null,
      sampleStyle: '',
      sampleDate: '',
      comment: '',
      modifyComment: ''
    }

    // 获取插件数据
    function getWigdetInfo(id) {
      // 获取控件数据
      var _postData = {
        modifyId: id
      };

      if (_type === 'done') {
        _postData = {
          id: id
        }
      }

      dataService.getData('getWidgetModifyAdaptive', _postData).success(function(rs) {
        $scope.formData = angular.copy(rs.data);

        if (rs.data.pluginFileUid) {
          // 设置扩展插件
          $scope.upload.uploadScrpit.status = 2;
          $scope.upload.uploadScrpit.progress = 100;
          $scope.upload.uploadScrpit.fileName = rs.data.pluginFileName;
        }

        if (rs.data.styleFileUid) {
          // 设置附件等信息
          $scope.upload.uploadAttachment.status = 2;
          $scope.upload.uploadAttachment.progress = 100;
          $scope.upload.uploadAttachment.fileName = rs.data.styleFileName;
        }

        if (rs.data.docFileUid) {
          // 设置开发文档等信息
          $scope.upload.uploadDoc.status = 2;
          $scope.upload.uploadDoc.progress = 100;
          $scope.upload.uploadDoc.fileName = rs.data.docFileName;
        }

        // 设置底层库
        var _tmpBaseLibs = [];
        var _baseLibs = rs.data.baseLibs.split(',');
        for (var i = 0; i < _baseLibs.length; i++) {
          _tmpBaseLibs.push(parseInt(_baseLibs[i]))
        }
        $scope.formData.baseLibs = _tmpBaseLibs;

      });
    }
    getWigdetInfo(_id);

    // 临时显示数据
    $scope.tempShowData = {
      thumbnail: null,
      previewTabIndex: 0
    }

    // 转化缩略图
    $scope.exchangeThumbnailUrl = function(uid) {
      if (uid) {
        return globalConfig.api.getres + '/' + uid + '?ticket=' + $cookies.get('auth');
      }
    }

    // 获取控件分类|底层库
    function getPluginCate() {
      // 获取控件分类
      dataService.getData('queryByParentId', {
        parentId: 193
      }).success(function(rs) {
        $scope.pageData.categoryList = rs.data;
        $scope.formData.category = rs.data[0]['id'] || '';
      });
      // 底层库
      dataService.getData('queryByParentId', {
        parentId: 188
      }).success(function(rs) {
        $scope.pageData.baseLibList = rs.data;
      });
    }
    getPluginCate();

    // 更新提交预览的状态
    $scope.updateValid = function(val) {
      $scope.pageData.checkChart = val;
      $scope.$apply();
    }
    //监控输入字符
    $scope.$watch('formData.modifyComment', function (newValue) {
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


    // 配置编辑器
    $scope.editorOptions = {
      lineWrapping: true,
      lineNumbers: true,
      lang: "js",
      // readOnly: 'nocursor',
      mode: {
        name: "javascript",
        json: true
      }
    };

    // 只读编辑器
    $scope.editorReadonlyOptions = {
      lineWrapping: true,
      lineNumbers: true,
      lang: "js",
      readOnly: 'nocursor',
      mode: {
        name: "javascript",
        json: true
      }
    };

    if (!_type == 'pre') {
      $scope.formData.id = _id;
    }

    // 上传扩展插件
    var uploaderScript = $scope.uploaderScript = new FileUploader({
      url: globalConfig.api.uploadFile + '?type=widget_plugin',
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
            body: '文件格式应为js中的一种',
            showCloseButton: false
          });
        }
        $('#uploaderScriptid').val('');
      },
      onProgressItem: function(item, progress) {
        $scope.upload.uploadScrpit.status = 1;
      },
      onSuccessItem: function(item, response, status, headers) { // 上传成功
        if (status === 200 && response.status === 200) {
          $scope.upload.uploadScrpit.status = 2; // 上传完成
          $scope.upload.uploadScrpit.fileName = response.data.name; // 文件名
          $scope.formData.pluginFileUid = response.data.uid;
          $('#uploaderScriptid').val('');
        } else if (status === 200 && response.status === 503) {
          $scope.upload.uploadScrpit.status = 0; // 上传完成
          toaster.clear();
          toaster.pop({
            type: 'error',
            title: '',
            body: response.msg,
            showCloseButton: false,
          });
          $('#uploaderScriptid').val('');
        }
      }
    });
    uploaderScript.filters.push({
      'name': 'enforceMaxFileSize',
      'fn': function(item) {
        return item.size <= 20971520; // 20 MiB to bytes
      }
    });
    uploaderScript.filters.push({
      'name': 'scriptfileType',
      'fn': function(item) {
        return /^.*?\.(js)$/.test(item.name)
      }
    });

    // 上传附加样式
    var uploaderAttachment = $scope.uploaderAttachment = new FileUploader({
      url: globalConfig.api.uploadFile + '?type=widget_style',
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
            body: '文件格式应为css,less,sass中的一种',
            showCloseButton: false
          });
        }
        $('#uploaderAttachmentid').val('');
      },
      onProgressItem: function(item, progress) {
        $scope.upload.uploadAttachment.status = 1;
      },
      onSuccessItem: function(item, response, status, headers) { // 上传成功
        if (status === 200 && response.status === 200) {
          $scope.upload.uploadAttachment.status = 2; // 上传完成
          $scope.upload.uploadAttachment.fileName = response.data.name; // 文件名
          $scope.formData.styleFileUid = response.data.uid;
          $('#uploaderAttachmentid').val('');
        } else if (status === 200 && response.status === 503) {
          $scope.upload.uploadAttachment.status = 0; // 上传失败
          toaster.clear();
          toaster.pop({
            type: 'error',
            title: '',
            body: response.msg,
            showCloseButton: false,
          });
          $('#uploaderAttachmentid').val('');
        }
      }
    });
    uploaderAttachment.filters.push({
      'name': 'enforceMaxFileSize',
      'fn': function(item) {
        return item.size <= 20971520; // 20 MiB to bytes
      }
    });
    uploaderAttachment.filters.push({
      'name': 'scriptfileType',
      'fn': function(item) {
        return /^.*?\.(css|less|sass)$/.test(item.name)
      }
    });

    // 上传开发文档
    var uploaderDoc = $scope.uploaderDoc = new FileUploader({
      url: globalConfig.api.uploadFile + '?type=widget_doc',
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
            body: '文件格式应为html、doc、docx、md中的一种',
            showCloseButton: false
          });
        }
        $('#uploaderDoc').val('');
      },
      onProgressItem: function(item, progress) {
        $scope.upload.uploadDoc.status = 1;
      },
      onSuccessItem: function(item, response, status, headers) { // 上传成功
        if (status === 200 && response.status === 200) {
          $scope.upload.uploadDoc.status = 2; // 上传完成
          $scope.upload.uploadDoc.fileName = response.data.name; // 文件名
          $scope.formData.docFileUid = response.data.uid;
          $('#uploaderAttachmentid').val('');
        } else if (status === 200 && response.status === 503) {
          $scope.upload.uploadDoc.status = 0; // 上传失败
          toaster.clear();
          toaster.pop({
            type: 'error',
            title: '',
            body: response.msg,
            showCloseButton: false,
          });
          $('#uploaderDoc').val('');
        }
      }
    });
    uploaderDoc.filters.push({
      'name': 'enforceMaxFileSize',
      'fn': function(item) {
        return item.size <= 20971520; // 20 MiB to bytes
      }
    });
    uploaderDoc.filters.push({
      'name': 'scriptfileType',
      'fn': function(item) {
        return /^.*?\.(html|doc|docx|md)$/.test(item.name)
      }
    });

    // 删除扩展插件
    $scope.delUploadScrpit = function() {
      $scope.upload.uploadScrpit.status = 0;
      $scope.upload.uploadScrpit.progress = 0;
      $scope.upload.uploadScrpit.fileName = '';
      $scope.formData.pluginFileUid = '';
    }

    // 删除附件
    $scope.delAttachment = function() {
      $scope.upload.uploadAttachment.status = 0;
      $scope.upload.uploadAttachment.progress = 0;
      $scope.upload.uploadAttachment.fileName = '';
      $scope.formData.styleFileUid = '';
    }

    // 删除开发文档
    $scope.delDoc = function() {
      $scope.upload.uploadDoc.status = 0;
      $scope.upload.uploadDoc.progress = 0;
      $scope.upload.uploadDoc.fileName = '';
      $scope.formData.docFileUid = '';
    }

    // 去第二步
    $scope.toStep2 = function() {
      $(".bq_wrap").css("overflow-y","hidden");
      $scope.submited = true;
      // 验证重名错误
      dataService.getData('verityByWidgetName', {
          id: $scope.formData.targetId,
          name: $scope.formData.name
        })
        .success(function(rs) {
          if (rs.data == false) {
            toaster.pop({
              type: 'error',
              title: '',
              body: '控件名称已存在，不能创建相同名称的控件！',
              showCloseButton: false
            });
            return false;
          } else {


            // 必填项
            if (!$scope.formData.name || !$scope.formData.category || !$scope.formData.baseLibs || !$scope.formData.pluginFileUid
                || !$scope.formData.docFileUid||$scope.formData.baseLibs=='') {
              toaster.pop({
                type: 'error',
                title: '',
                body: '有必填项未填写完成，请填写。',
                showCloseButton: false
              });
              return false;
            }

            // 必填项
            if ($scope.formData.name.length > 20) {
              toaster.pop({
                type: 'error',
                title: '',
                body: '控件名称长度超过20个字',
                showCloseButton: false
              });
              return false;
            }

            // 实例数据
            $scope.sampleData = [];

            // 获取实例
            dataService.getData('widgetListById', {
              widgetId: $scope.formData.targetId
            }).success(function(rs) {
              $scope.sampleData = rs.data;
              // // 实例下拉数据
              // for (var i = 0; i < rs.data.length; i++) {
              //   $scope.pageData.sampleList.push({
              //     id:rs.data.id,
              //     name:rs.data.name
              //   })
              // }
              // $scope.pageData.currentSample = $scope.pageData.sampleList[$scope.pageData.currentSampleIndex];
              var iframe = document.getElementById('chartPreviewIframe');
              iframe.contentWindow.location.reload();
              $timeout(function() {
                $scope.formData.ticket = $cookies.get('auth');
                $scope.formData.sampleStyle = rs.data[$scope.pageData.currentSampleIndex].sampleStyle;
                $scope.formData.sampleData = rs.data[$scope.pageData.currentSampleIndex].sampleData;
                $scope.pageData.currentSampleId = rs.data[$scope.pageData.currentSampleIndex].id;
                $scope.formData.thumbnailFileUid = rs.data[$scope.pageData.currentSampleIndex].thumbnailFileUid;
                document.getElementById('chartPreviewIframe').contentWindow.updatedata($scope.formData);
              }, 1000);
            });

            $scope.pageData.step = 2;
          }
        });
    }

    // 去第三步
    $scope.toStep3 = function() {
      // 验证错误
      // 必填项
      if (!$scope.formData.widgetSampleName || !$scope.formData.thumbnailFileUid || !$scope.formData.sampleDate || !$scope.formData.sampleStyle) {
        toaster.pop({
          type: 'error',
          title: '',
          body: '有必填项未填写完成，请填写。',
          showCloseButton: false
        });
        return false;
      }

      // 长度控制
      if ($scope.formData.widgetSampleName.length > 20) {
        toaster.pop({
          type: 'error',
          title: '',
          body: '实例名称长度超过20个字',
          showCloseButton: false
        });
        return false;
      }
      if ($scope.formData.comment.length > 20) {
        toaster.pop({
          type: 'error',
          title: '',
          body: '实例说明长度超过200个字',
          showCloseButton: false
        });
        return false;
      }

      $scope.pageData.step = 3;
      // $scope.pageData.previewChartUrl = '/chartPreview.html';

      $timeout(function() {
        $scope.formData.ticket = $cookies.get('auth');
        $('.CodeMirror').each(function(i, el) {
          el.CodeMirror.refresh();
          if (i == 0) {
            $scope.formData.sampleStyle = el.CodeMirror.getValue();
          }
          if (i == 1) {
            $scope.formData.sampleDate = el.CodeMirror.getValue();
          }
        });

        document.getElementById('chartPreviewIframe').contentWindow.updatedata($scope.formData);

      }, 10);

    }

    // 去第四步
    $scope.toStep4 = function() {
      if ($scope.pageData.checkChart!=true) {
        toaster.pop({
          type: 'error',
          title: '',
          body: '自动预览不成功，不能进行提交审核！',
          showCloseButton: false
        });
        return false;
      }

      var postData = {
          id: $scope.formData.id,
          targetId: $scope.formData.targetId,
          name: $scope.formData.name,
          category: $scope.formData.category,
          baseLibs: $scope.formData.baseLibs,
          pluginFileUid: $scope.formData.pluginFileUid,
          styleFileUid: $scope.formData.styleFileUid,
          docFileUid: $scope.formData.docFileUid,
          modifyComment: $scope.formData.modifyComment,

        }
        // 保存数据
      dataService.postData('modifyWidgetF', postData).success(function(rs) {
        if (rs.status === 200) {
          if (_type == 'pre') {
            $state.go('g.plugins.pre')
          } else {
            $state.go('g.plugins.done')
          }
        }

      });


    }
    
    
     $scope.cancelTag = function() {
      $(".mask").show();
    };
    //继续设置
    $scope.next = function() {
      $(".mask").hide();
    };
    $scope.back = function() {
      if (_type == 'pre') {
        $state.go('g.plugins.pre')
      } else {
        $state.go('g.plugins.done')
      }
    };
  }
]);
