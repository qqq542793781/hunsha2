// vip/AddCtrl.js
(function() {
  var ctrls = angular.module("controllers");
  ctrls.controller("VipAddCtrl", ["$scope", "$log",
    "DialogService", "DataService", VipAddCtrl
  ]);

  function VipAddCtrl($scope, $log, DialogService, DataService) {
    $log.debug("VipAddCtrl init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("VipAddCtrl destroy...");
    });

    $scope.formdata = {};

    $scope.close = function() {
      DialogService.hideCustomDialog();
    };

    $scope.add = function() {
      DialogService.showWaitDialog("开卡中。。。");
      DataService.send("/VipCard/add", $scope.formdata,
        function(err, data) {
          DialogService.hideWaitDialog();
          if (err) {
            DialogService.showAlertDialog("服务器忙。。。");
            $log.debug(err);
            return;
          }
          if (data.Success) {
            DialogService.showAlertDialog("开卡成功", function() {
              DialogService.hideCustomDialog();
            });
            return;
          }
          DialogService.showAlertDialog(data.ServerMessage);
        });
    };
  }

})();