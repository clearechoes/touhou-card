if( typeof glob_concats == "undefined" ){
  glob_concats = [];
}

define([
  'angular',
  // Configurations
  'config/config',
  'config/values',
  'config/filters',
  'config/user_config',
  // Loaders
  'glob4r!services/*.js',
  'glob4r!directives/*.js',
  'glob4r!controllers/*.js'
  ],
  function(ng, config, values, filters, userConfig, services, directives, controllers){
    var app = angular.module('myApp', ['ngRoute', 'ngSanitize','oc.lazyLoad']);

    app.config(config);
    values(app);
    filters(app);
    
    var parsedName, parsedFunc;
    glob_concats.forEach(function(modName){
      parsedName = modName.replace(/_([a-zA-Z])/g, function(a,b){ return b.toUpperCase() });
      switch(true){
        case modName.indexOf("_controller") > 0:
          parsedName = parsedName[0].toUpperCase() + parsedName.substring(1);
          parsedFunc = controllers ? controllers[modName] : requirejs('controllers/'+modName+'.js');
          app.controller(parsedName, parsedFunc);
          break;
        case modName.indexOf("_service") > 0:
          parsedName = parsedName[0].toUpperCase() + parsedName.substring(1);
          parsedFunc = services ? services[modName] : requirejs('services/'+modName+'.js');
          app.service(parsedName, parsedFunc);
          break;
        case modName.indexOf("_factory") > 0:
          parsedName = parsedName[0].toUpperCase() + parsedName.substring(1);
          parsedFunc = factories ? factories[modName] : requirejs('factories/'+modName+'.js');
          app.factory(parsedName, parsedFunc);
          break;
        default: // directives
          parsedFunc = directives ? directives[modName] : requirejs('directives/'+modName+'.js');
          app.directive(parsedName, parsedFunc);
          break;
      }
    });
    
    userConfig(app);

    return app;
  }
);
