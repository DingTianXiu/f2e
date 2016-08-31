/**
 * 登录
 */
app.controller('loginCtrl', ['$scope', '$http', '$q', '$cookies', '$cookieStore', '$state', '$window', '$timeout', '$templateCache', '$location', 'globalConfig', 'dataService', '$localStorage',
  function($scope, $http, $q, $cookies, $cookieStore, $state, $window, $timeout, $templateCache, $location, globalConfig, dataService, $localStorage) {

    var _isDev = true;
    var _location = $window.location.host;

    $('[name="sysCode"]').val("oss-yishang");
    $("#passwordTemp").removeAttr('disabled');


    $("#loginKey").removeClass("empty");
    $("#passwordTemp").removeClass("empty");
    $("#validateCode").removeClass("empty");

    $("form").submit(function(e) {

      //登录表单的空内容反馈
      $("form input").each(function() {
        if($(this).val() == ""){
            $(this).addClass("empty");
        };
        $(this).change(function() {
          if($(this).val() == ""){
            $(this).addClass("empty");
          }else{
            $(this).removeClass("empty");
          };
        });
      });

      var v = md5($("#passwordTemp").val());
      $("#password").val(v);

      $templateCache.removeAll();

      $('#errorBox').fadeOut(2000);
      return true;
    });

    //验证码的即时提示
    // $("#validateCode").change(function() {
    //   if($("#validateCode").val().length == 4){
    //     $("form").submit();
    //   };
    // });
    
   
    // 发送短信验证码
    $scope.setSmsCode = function() {
      dataService.getData('getSmsCode', {
        loginKey: angular.element('#loginKey').val(),
        password: md5(angular.element("#passwordTemp").val()),
        sysCode: 'wlgf'
      }).success(function(rs) {
        // console.log('rs', rs)
      })
    };

    var options = {
      formId: "fm1",
      fkId: "fk",
      ltId: "lt",
      vcId: "capt",
      localDomain: 'http://' + _location,
      loginSuccessCall: function() {

        $cookies.put("auth", arguments[0]);
        $cookies.put('acf_ticket', arguments[0]);

        var _acf_ticket = $cookies.get('auth');
        var r = Math.random();

        $http.get(globalConfig.api.getUser + '?_=' + r+'&acf_ticket='+_acf_ticket, {
            'headers': {
              "ticket": _acf_ticket
            },
            cache: false
          })
          .then(function(data, status) {
            if (data.data.data.userInfo.realName) {
              $localStorage.$default({
                userInfo: data.data.data
              });
              // $cookieStore.put('userInfo', data.data.data);
              // 获取当前用户的所有权限
              dataService.getData('queryPermissionCodes', {}).success(function(rs) {
                $localStorage.$default({
                  permissionCodes: rs.data
                });
                permissionCodes = rs.data;
                $state.go('g.welcome');
              });


            }

          });


      },
      loginFailCall: function(errorMsg) {
        $('#errorStr').text(errorMsg);
        
        if(errorMsg == "不存在该账号" || errorMsg == "密码错误"){
          $("#loginKey").addClass('empty');
          $("#passwordTemp").addClass('empty');
        };
        $("#loginKey").focus(function() {
          $(this).removeClass('empty');
        });
        $("#passwordTemp").focus(function() {
          $(this).val("");
          $(this).removeClass('empty');
        });
        if(errorMsg == "验证码不正确"){
          $("#validateCode").addClass("empty");
        }
        $("#validateCode").focus(function() {
          $(this).val("");
          $("#validateCode").removeClass("empty");
        });

        $('#J-loading').hide();
        $('#errorBox').fadeOut().fadeIn();
        setTimeout(function () {
          $('#errorBox').fadeOut();
          $('#J-submit').show();
        },3000);

        $("#passwordTemp").removeAttr('disabled');
        // $state.go('login');
      },
      beforeLoginCall: function() {

        $('#passwordText').text("").fadeOut();
        $('#J-loading').show();
        $('#J-submit').hide();
        $("#passwordTemp").removeAttr('disabled');
        return true;


      }
    };

    window['sso'] = new xd_sso(options);
  }
]);
