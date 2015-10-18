define([], function(){
  function IntroController($root, $scope, $location, $timeout){
    $root.pageclass = 'intro';
    $root.keyEvents = {
      "*": function(e){
        $('.main-container').removeClass('loaded');
        $('video#bgvid').animate({volume: 0}, 1000, function(){
          $root.$apply(function(){
            $location.url('/home');
          });
        });
      }
    };
    
    $scope.reveal();
  }
  
  IntroController.$inject = ['$rootScope', '$scope', '$location', '$timeout'];
  return IntroController;
});