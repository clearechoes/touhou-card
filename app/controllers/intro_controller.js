define([], function(){
  function IntroController($root, $scope, $location, $timeout){
    $root.pageclass = 'intro';
    $root.keyEvents = {
      "*": function(e){
        $('video#bgvid').animate({volume: 0, opacity:0}, 1000, function(){
          $root.$apply(function(){
            $location.url('/home');
          });
        });
      }
    };
    
    $scope.tracks.active = -1;
    $scope.reveal();
  }
  
  IntroController.$inject = ['$rootScope', '$scope', '$location', '$timeout'];
  return IntroController;
});