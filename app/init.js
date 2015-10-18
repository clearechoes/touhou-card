requirejs([
  'angular',
  'angular-route','angular-resource','angular-sanitize', 'oclazyload', 
  'pace', 'app'
], function(){
  var pace = arguments[5];
  pace.start({
    document: false
  });
  angular.bootstrap(document, ['myApp']);
});