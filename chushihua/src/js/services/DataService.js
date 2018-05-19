/**
 * 数据服务
 */
(function() {
    var app = angular.module("services");

    app.factory("DataService", ["$rootScope","$log", "$http","$cookies","$window", DataService]);

    function DataService($rootScope,$log, $http,$cookies,$window) {
        $log.info("DataService init...");
        var server_url = "";
        var token_key="server_token";//本地token
        var token="";

        var service = {};

        service.setServer = function(server) {//请求的服务器
            server_url = server;
        };

        service.send = function(url, postdata, cb) {
            //获取本地保存的token
            token=$cookies.get(token_key);
            if (!token) {
                token="";
            }
            postdata.SessionToken=token;

            postdata.ajaxtimestamp = new Date().getTime(); // 自动加时间戳
            $http({
                "method": "POST",
                "url": server_url + url,
                "data": postdata
            }).then(function(data, status) {
                $log.debug("DataService.data:", data.data);
                //应答成功保存服务器的token
                $cookies.put(token_key,data.data.SessionToken);
                (cb || angular.noop)(null, data.data);
            }, function(data, status) {
                $log.error("DataService.send error:", data);
                (cb || angular.noop)(data, null);
            });
        };
        

        service.setUserInfo=function(user){
            $window.localStorage.user=JSON.stringify(user);
            $rootScope.loginuser=user;
        };

        service.removeUserInfo=function(){
            delete $window.localStorage.user;
            delete $rootScope.loginuser;
        };
        
        service.loadLocalUser=function(){
            var suser=$window.localStorage.user;
            if (!suser) {
                return;
            }
            try {
                $rootScope.loginuser=JSON.parse(suser);
            } catch(e) {}
        };

        return service;
    }

})();