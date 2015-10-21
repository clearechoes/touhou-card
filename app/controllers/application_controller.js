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
    $scope.soundtrackSetting = function(options){
      Object.keys(options).forEach(function(key){
        $scope.tracks[key] = options[key];
      });
    };
    
    $scope.poi = function(){
      $('#audioVisualizer').trigger('audio:stop');
      var snd = new Audio("assets/s_effect/poi.ogg"); // buffers automatically when created
      snd.play();
    };
    
  }
  ApplicationController.$inject = ['$scope', '$location', '$timeout', 'dummies', 'tracks'];
  return ApplicationController;
});