define([],function(){
  function config($routeProvider, $controllerProvider, $locationProvider, $compileProvider) {
    $routeProvider
      .when('/intro', {
        templateUrl: 'views/intro.html'
        /*resolve: {
          // I will cause a 1 second delay
          delay: function($q, $timeout) {
            var delay = $q.defer();
            $timeout(delay.resolve, 1000);
            return delay.promise;
          }
        }*/
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
	  .when('/dashboard', {
        templateUrl: 'views/dashboard.html'
      })
	  .when('/options', {
        templateUrl: 'views/options.html'
      })
	  
	  
	  
	  .when('/loadgame', {
        templateUrl: 'views/loadgame.html'
      })
	  .when('/savegame', {
        templateUrl: 'views/savegame.html'
      })
	  
	  
	  
	  .when('/quest', {
        templateUrl: 'views/quest.html'
      })
	  .when('/achievement', {
        templateUrl: 'views/achievement.html'
      })
	  
	  //---------- BattleCard ---------//
	  .when('/pre_battle', {
        templateUrl: 'views/pre_battle.html'
      })
	  .when('/boardgame', {
        templateUrl: 'views/boardgame.html'
      })
	  //---------- End BattleCard ---------//
	  
	  
	  //---------- Develop New Card ---------//
	  .when('/deck', {
        templateUrl: 'views/deck.html'
      })
	  .when('/summon', {
        templateUrl: 'views/summon.html'
      })
	  .when('/spellcard', {
        templateUrl: 'views/spellcard.html'
      })
	  //---------- End Develop New Card ---------//
	  
      .otherwise("/home");

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|app):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|app):|data:image\//);
    //
    // NOTE: if you enable this line, all .scope() call will return "undefined"
    $compileProvider.debugInfoEnabled(false);
    // 
    // Without server side support html5 must be disabled.
    return $locationProvider.html5Mode(false);
  };

  config.$inject=['$routeProvider', '$controllerProvider', '$locationProvider', '$compileProvider'];

  return config;
});
