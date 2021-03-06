define([], function(){
  
  function DashboardController($root, $scope, $location, $timeout){
    $root.pageclass = 'dashboard';
    $root.keyEvents = {
      'ALT+13': /* enter */ function(){
        win.toggleFullscreen();
      }
    }
    
    $scope.reveal();
    
    $timeout(function(){
      $scope.soundtrackSetting({
        active: -1,
        autoNext: false, 
        loop: true
      });
    }, 0);
  }
  
  DashboardController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return DashboardController;
});