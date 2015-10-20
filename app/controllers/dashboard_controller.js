define([], function(){
  
  function DashboardController($root, $scope, $location, $timeout){
    $root.pageclass = 'dashboard';
    $root.keyEvents = {};
    
    $scope.reveal();
    $scope.$parent.$parent.bgm = 'broken_moon_vocal';
    
    win.showDevTools();
  }
  
  DashboardController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return DashboardController;
});