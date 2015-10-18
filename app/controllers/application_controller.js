define([], function(){
  function ApplicationController($scope, $location, $timeout, dummies){
    $scope.apptitle = dummies.apptitle;
    $scope.reveal = function(){
      $timeout(function(){
        $('.main-container').addClass('loaded');
      }, 200);
    };
    
    $scope.$on("$locationChangeStart", function(){
      Pace.start();
    });
    $scope.$on('$locationChangeSuccess', function(){
      Pace.stop();
    });
    
    $scope.ExitGame = function(){
      win.close();
    };
    
  }
  ApplicationController.$inject = ['$scope', '$location', '$timeout', 'dummies'];
  return ApplicationController;
});