(function() {
  var app = angular.module("services");
  app.factory("UtilService", ["$log", "$sce", function($log, $sce) {
    $log.debug("UtilService init ...");
    var service = {}; //创建服务对象

    //定义服务的方法

    //字符串去空
    service.trim = function(str) {
      if (!str) { //不存在就返回空字符串
        return "";
      }
      if (typeof str !== "string") { //不是字符串就返回值自身
        return str;
      }
      //去掉头尾空格
      return str.replace(/(^[\s]*)|([\s]*$)/g, "");
    };

    var weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    //格式化日期
    service.formatDate = function(timestamp, format) {
      var date = new Date();
      if (timestamp) {
        date.setTime(timestamp);
      }
      if (!format) { // 默认格式
        format = "y-M-d h:m:s";
      }
      var year = date.getFullYear() + "";
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var day = date.getDate();
      day = day < 10 ? "0" + day : day;
      var hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour + "";
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute + "";
      var seconds = date.getSeconds();
      seconds = seconds < 10 ? "0" + seconds : seconds + "";
      var result = format.replace("y", year);
      result = result.replace("M", month);
      result = result.replace("d", day);
      result = result.replace("h", hour);
      result = result.replace("m", minute);
      result = result.replace("s", seconds);
      result = result.replace("w", weeks[date.getDay()]);
      return result;
    };

    return service;
  }]);


})();