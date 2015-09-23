define([], function(){
  function ApplicationController($scope, dummies){
    $scope.apptitle = dummies.apptitle;
  }
  ApplicationController.$inject = ['$scope', 'dummies'];
  return ApplicationController;
});