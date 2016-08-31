/**
 * 支付相关服务
 */

/**
 * 全局401验证
 * @return {[type]}                  [description]
 */

app.factory('httpInterceptor', ['$location', '$q', '$injector', '$rootScope', '$cookies', '$localStorage',
    function ($location, $q, $injector, $rootScope, $cookies, $localStorage) {
        return {
            request: function (config) {
                var _tikect = $cookies.get('acf_ticket') || '';
                config.headers['ticket'] = _tikect;
                return config;
            },

            'response': function (response) {
                if (response.data.status == 401 || response.status === 401) {
                  window.top.location.reload();
                  $('.layui-layer-shade').remove();
                  $('.layui-layer').remove();
                    $injector.get('$state').transitionTo('login');
                    $cookies.remove('auth');
                    $cookies.remove('acf_ticket');
                    $localStorage.$reset();
                    //return $q.reject(response);
                } else if (response.data.status > 450) {
                    $rootScope.$broadcast("xhrError", response.data.msg);
                    //return $q.reject(response);
                }

                return response || $q.when(response);
            },

            'responseError': function (rejection) {

                if (rejection.data.status == 401 || rejection.status === 401) {
                  window.top.location.reload();
                  $('.layui-layer-shade').remove();
                  $('.layui-layer').remove();
                    $injector.get('$state').transitionTo('login');
                    $cookies.remove('auth');
                    $cookies.remove('acf_ticket');
                    $localStorage.$reset();
                    return $q.reject(rejection);
                } else if (rejection.data.status > 450) {
                    $rootScope.$broadcast("xhrError", response.data.msg);
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);

            }

        };
    }
]);

/**
 * 获取当前登录用户信息
 * @return {}
 */
app.service('userService', ['$q', '$http', 'globalConfig', 'userData',
    function ($q, $http, globalConfig, userData) {
        var user = {};
        var promise;
        // 已经存在用户数据
        // if (!!userData.userId) {
        //     user = userData;
        // } else {
        // var r = Math.random()
        //     var _acf_ticket = $.cookie('auth');
        //     promise = $http.get(globalConfig.api.getUser + '?_='+r, {'headers': { "acf-ticket": _acf_ticket}, cache: false})
        //         .then(function(data, status) {
        //             user.userInfo = data.data.data;
        //             userData.userInfo = data.data.data;
        //         });
        // }


        return {
            promise: promise,
            getUserInfo: function () {
                return user;
            },

        };
    }
]);

/**
 * key value 方式提交表单
 * @param  {[type]} "transformRequestAsFormPost" [description]
 * @param  {[type]} function(                    [description]
 * @return {[type]}                              [description]
 */
app.factory(
    "transformRequestAsFormPost",
    function () {

        // I prepare the request data for the form post.
        function transformRequest(data, getHeaders) {

            var headers = getHeaders();

            headers["Content-type"] = "application/x-www-form-urlencoded; charset=utf-8";

            return (serializeData(data));

        }


        // Return the factory value.
        return (transformRequest);


        // ---
        // PRVIATE METHODS.
        // ---


        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData(data) {

            // If this is not an object, defer to native stringification.
            if (!angular.isObject(data)) {

                return ((data == null) ? "" : data.toString());

            }

            var buffer = [];

            // Serialize each key in the object.
            for (var name in data) {

                if (!data.hasOwnProperty(name)) {

                    continue;

                }

                var value = data[name];

                buffer.push(
                    encodeURIComponent(name) +
                    "=" +
                    encodeURIComponent((value == null) ? "" : value)
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join("&")
                .replace(/%20/g, "+");

            return (source);

        }

    }
);

/**
 * 操作数据
 *
 */
app.factory('dataService', ['$http', 'globalConfig', 'transformRequestAsFormPost', function ($http, globalConfig, transformRequestAsFormPost) {
    return {
        // 获取数据
        getData: function (apiname, params) {
            return $http.get(globalConfig.api[apiname], {
                params: params
            });
        },

        // 提交数据
        postData: function (apiname, params) {
            return $http.post(globalConfig.api[apiname], params, {
                transformRequest: transformRequestAsFormPost,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    };
}]);

