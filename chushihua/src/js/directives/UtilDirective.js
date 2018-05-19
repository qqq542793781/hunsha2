(function() {
  var app = angular.module("directives");

  app.directive("formatDate", ["$log", "UtilService", function($log, UtilService) {
    $log.debug("format-date init...");

    return {
      scope: {
        formatDate: "@"
      },

      link: function($scope, element, attr) {
        $log.debug("format-date date", $scope.formatDate);
        // var ts=parseInt($scope.formatDate.replace("/^\D/g",""));
        //  element.html(UtilService.formatDate(ts,"y-M-d h:m:s w"));

        var watch = $scope.$watch("formatDate", function(nv, ov) {
          $log.debug("format-date watch", nv);
          var ts = parseInt(nv.replace("/^\D/g", ""));
          element.html(UtilService.formatDate(ts, "y-M-d h:m:s w"));
        });

        $scope.$on("$destroy", function() {
          $log.debug("format-date destroy...");
          watch();
        });
      }
    };

  }]);


  app.directive("myCarousel", ["$log", function($log) {
    $log.debug("directive my-carousel...");

    return {
      "restrict": "AE",
      "link": function($scope, element, attr) {
        $scope.$on("$destroy", function() {
          $log.debug("directive my-carousel destroy...");
        });

        $log.debug("directive my-carousel init==>", element);
        $(element).carousel({
          //定制间隔时间
          "interval": 5 * 1000
        });

      }
    };
  }]);

})();