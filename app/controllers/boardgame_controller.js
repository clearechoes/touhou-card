define([], function(){
  function BoardgameController($root, $scope, $timeout, BoardGame){
    $root.pageclass = 'dashboard';
    $root.keyEvents = {
      'ALT+13': /* enter */ function(){
        win.toggleFullscreen();
      },
      'ALT+40': function(){
        win.showDevTools();
      }
    }
    
    $scope.reveal();
    
    $timeout(function(){
      $scope.soundtrackSetting({
        active: -1,
        autoNext: false, 
        loop: true
      });
    }, 0);
    
    var p1, p2;
    $scope.Deck = new BoardGame.Deck();
    $scope.Deck.addPlayers(
      p1 = new BoardGame.Player({ name: 'player1' }),
      p2 = new BoardGame.Player({ name: 'player2' })
    );
    $scope.Scores = new Array($scope.Deck.players.length);
    BoardGame.Card.Shuffle(5).forEach(function(card){
      p1.addCard(card);
    });
    BoardGame.Card.Shuffle(5).forEach(function(card){
      p2.addCard(card);
    });
    
    $scope.updatePlayerScore = function(){
      $scope.Deck.players.forEach(function(player, i){
        $scope.Scores[i] = { melee: 0, range: 0 }
        player.usedCards().forEach(function(card){
          $scope.Scores[i][card.att_type] += card.stats[0];
        });
      });
      $scope.$apply();
    };
  }
  BoardgameController.$inject = ['$rootScope','$scope', '$timeout', 'BoardgameService'];
  return BoardgameController;
});