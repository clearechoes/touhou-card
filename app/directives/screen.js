define([], function(){
  function screen($root, $location){
    
    var bindMouseEvents = function(elem){
      // mouse events
      return elem;
    };
    var bindKeyEvents = function(elem){
      elem.on('keyup', function(e){
        if( $root.keyEvents['*'] ){
          $root.keyEvents['*'].call();
        }
      });
      // key events
      return elem;
    };
    return {
      link: function($scope, $elem, $attrs){
        scope = $scope;
        bindMouseEvents($elem);
        bindKeyEvents($elem);
      }
    };
  }
  
  screen.$inject = ['$rootScope', '$location'];
  return screen;
})