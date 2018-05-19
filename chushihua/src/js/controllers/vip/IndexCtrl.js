// vip/IndexCtrl.js
(function() {
  var ctrls = angular.module("controllers");
  ctrls.controller("VipIndexCtrl", ["$scope", "$log",
    "DialogService", "DataService", VipIndexCtrl
  ]);

  function VipIndexCtrl($scope, $log, DialogService, DataService) {
    $log.debug("VipIndexCtrl init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("VipIndexCtrl destroy...");
    });

    //所有对话框的标准标题设置（不是必须）
    DialogService.setDialogTitle("Vip卡管理");
    //设置服务器根路径（不是必须）
    DataService.setServer("http://localhost:6286/");

    $scope.query = function() {
      DialogService.showWaitDialog("数据查询中...");
      DataService.send("/VipCard/Query", {}, function(err, data) {
        DialogService.hideWaitDialog();
        if (err) {
          DialogService.showAlertDialog("服务器忙...");
          $log.error(err);
          return;
        }
        $scope.vips = data.Datas.list;
      });
    };

    $scope.add = function() {
      DialogService.showCustomDialog(
        "/templates/vip/add.html");
    };

    $scope.query();

  }

})();