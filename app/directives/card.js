define([], function(){

  function Card(){
    return {
      link: function($scope, elem, $attr){
        $(elem).on('dblclick', function(e){
          if( !$scope.card.used ){
            $scope.card.use();
            $scope.updatePlayerScore();
          }
        });
      }
    };
  }
  
  return Card;
});