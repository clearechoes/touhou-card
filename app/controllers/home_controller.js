define([], function(){
  
  function HomeController($root, $scope, $location, $timeout){
    $root.pageclass = 'home';
    $root.keyEvents = {};
    
    $scope.reveal();
    
    $timeout(function(){
      $('.main-menu a').on('click', $scope.poi);
          
      $scope.soundtrackSetting({
        active: 0,
        autoNext: true, 
        loop: false
      });
    }, 0);
  }
  
  HomeController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return HomeController;
});