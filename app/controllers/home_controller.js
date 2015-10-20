define([], function(){
  
  function HomeController($root, $scope, $location, $timeout){
    $root.pageclass = 'home';
    $root.keyEvents = {};
    
    $scope.reveal();
    //$scope.$parent.bgm = 'broken_moon';
     
    //win.showDevTools();
  }
  
  HomeController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return HomeController;
});