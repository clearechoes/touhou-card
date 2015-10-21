define([], function(){
  function ApplicationController($scope, $location, $timeout, dummies, tracks){
    $scope.apptitle = dummies.apptitle;
    $scope.reveal = function(){
      $timeout(function(){
        $('.main-container').addClass('loaded');
      }, 200);
    };
    
    $scope.$on("$locationChangeStart", function(){
      $('#audioVisualizer').trigger('audio:stop');
      Pace.start();
    });
    $scope.$on('$locationChangeSuccess', function(){
      Pace.stop();
    });
    
    $scope.ExitGame = function(){
      win.close();
    };
    
    $scope.tracks = tracks;
    
  }
  ApplicationController.$inject = ['$scope', '$location', '$timeout', 'dummies', 'tracks'];
  return ApplicationController;
});