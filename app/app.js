// DO NOT TOUCH THIS FILE,
// UNLESS YOU KNOW WHAT YOU'RE GOING TO DO

define('app', [
  'angular',
  'glob4r!controllers/*.js',
  'glob4r!services/*.js',
  'glob4r!factories/*.js',
  'glob4r!directives/*.js',
  'config/filters.js',
  'config/values.js'
], function(){
  
  var _args = arguments;
  var filterConcats = function(arr, in_string){
    return arr.filter(function(item){
      return item.indexOf(in_string) >= 0;
    });
  };
  
  var funcNameFrom = function(name){
    name = name.replace(/\_([a-zA-Z0-9])/g, function(a,b,c){
      return b.toUpperCase();
    });
    name = name[0].toUpperCase() + name.substring(1);
    return name;
  };
  
  // angular
  var app = angular.module("myApp", []);
  
  // registers
  filterConcats(glob_concats, "_controller").forEach(function(name){
    try{
      app.controller(funcNameFrom(name), require("controllers/"+name+".js"));
    } catch(ex) {
      var controllers = _args[1];
      app.controller(funcNameFrom(name), controllers[name]);
    }
  });
  filterConcats(glob_concats, "_service").forEach(function(name){
    try{
      app.controller(funcNameFrom(name), require("services/"+name+".js"));
    } catch(ex) {
      var services = _args[2];
      app.service(funcNameFrom(name), services[name]);
    }
  });
  filterConcats(glob_concats, "_factory").forEach(function(name){
    try{
      app.controller(funcNameFrom(name), require("factories/"+name+".js"));
    } catch(ex) {
      var factories = _args[3];
      app.factory(funcNameFrom(name), factories[name]);
    }
  });
  filterConcats(glob_concats, "_directive").forEach(function(name){
    try{
      app.controller(funcNameFrom(name), require("directives/"+name+".js"));
    } catch(ex) {
      var directives = _args[4];
      app.directive(funcNameFrom(name), directives[name]);
    }
  });
  _args[5](app);
  _args[6](app);
  
  return app;
});