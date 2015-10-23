define([], function(){
  
  function HomeController($root, $scope, $location, $timeout){
    var menu, activeMenu;
    
    $root.pageclass = 'home';
    $root.keyEvents = {
      'ALT+13': /* enter */ function(){
        win.toggleFullscreen();
      },
      '38': /* UP */ function(){
        menu.trigger('menu:up');
      },
      '40': /* UP */ function(){
        menu.trigger('menu:down');
      },
    };
    
    $scope.reveal();
    
    $timeout(function(){
      menu = $('.main-menu');
      $('a', menu).on('click', $scope.poi);
      menu.bind('menu:up', function(){
        activeMenu = $('li.active', this);
        var prevMenu = activeMenu.prev();
        if(prevMenu.get(0)){
          activeMenu.removeClass('active');
          prevMenu.addClass('active');
        }
      }).bind('menu:down', function(){
        activeMenu = $('li.active', this);
        var nextMenu = activeMenu.next();
        if(nextMenu.get(0)){
          activeMenu.removeClass('active');
          nextMenu.addClass('active');
        }
      });
      $scope.soundtrackSetting({
        active: $scope.randomTrack(),
        autoNext: true, 
        loop: false
      });
      
    }, 0);

  }
  
  HomeController.$inject = ['$rootScope','$scope', '$location', '$timeout'];
  return HomeController;
});