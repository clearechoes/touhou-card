define([], function(){
  
  function DashboardController($root, $scope, $location, $timeout){
    $root.pageclass = 'dashboard';
    $root.keyEvents = {};
    
    $scope.reveal();
    
    $timeout(function(){
      $scope.soundtrackSetting({
        active: -1,
        autoNext: false, 
        loop: true
      });
    }, 0);
    //win.showDevTools();
  }
  
  DashboardController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return DashboardController;
});