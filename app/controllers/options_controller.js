define([], function(){
  
  function OptionsController($root, $scope, $location, $timeout){
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
    // win.showDevTools();
  }
  
  OptionsController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return OptionsController;
});