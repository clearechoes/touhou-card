define([], function(){
  
  function HomeController($root, $scope, $location, $timeout){
    $root.pageclass = 'home';
    $root.keyEvents = {};
    
    $scope.reveal();
    
    $timeout(function(){
      $( "a" ).click(function() {
        $('#audioVisualizer').trigger('audio:stop');
        var snd = new Audio("assets/s_effect/poi.ogg"); // buffers automatically when created
        snd.play();
      });
    }, 0);
     
    //win.showDevTools();
  }
  
  HomeController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return HomeController;
});