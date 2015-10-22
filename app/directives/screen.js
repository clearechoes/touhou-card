define([], function(){
  function screen($root, $location){
    
    var bindMouseEvents = function(elem){
      // mouse events
      return elem;
    };
    var bindKeyEvents = function(elem){
      var modifierKey = "", actualKey = "", func = null;
      
      elem.on('keydown', function(e){
        if( $root.keyEvents['*'] ){
          $root.keyEvents['*'].call();
        }
        if (e.ctrlKey) modifierKey = "CTRL+"
        if (e.shiftKey) modifierKey = "SHIFT+"
        if (e.altKey) modifierKey = "ALT+"
        if (e.metaKey) modifierKey = "META+"
        
        actualKey = String.fromCharCode(e.keyCode);
        func = $root.keyEvents[modifierKey+actualKey];
        if(!func){
          func = $root.keyEvents[modifierKey+e.keyCode];
        }
        if(!func){
          // console.log(modifierKey, e.keyCode)
        }
        
        if(func) func(e);
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