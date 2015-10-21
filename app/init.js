requirejs([
  'jquery', 'angular',
  'angular-route','angular-resource','angular-sanitize', 'oclazyload', 
  'pace', 'bootstrap', 'app'
], function(){
  var pace = arguments[6];
  pace.start({
    document: false
  });
  angular.bootstrap(document, ['myApp']);
});