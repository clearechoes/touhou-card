define([], function(){
  
  function BoardgameService(){
    var Deck = function(){
      this.players = [];
      this.usedCards = [];
    };
    Deck.prototype.addPlayers = function(){
      for(var i in arguments){
        if( typeof(arguments[i])=="function" ) return;

        var player = arguments[i];
        player.deck = this;
        this.players.push(player);
      }
    };
    
    var Player = function(options){
      this.name = options.name;
      this.deck = null;
      this.cards = [];
    };
    Player.prototype.addCard = function(card){
      card.player = this;
      this.cards.push(card);
    };
    Player.prototype.availCards = function(){
      return this.cards.filter(function(card){ return !card.used });
    }
    Player.prototype.usedCards = function( type ){
      return this.cards.filter(function(card){ 
        return card.used && (type ? card.att_type == type : true) 
      });
    };
    
    var Card = function(o){
      this.player = null;
      this.name = o.name;
      this.abilities = o.abilities;
      this.stats = o.stats;
      this.originalStats = angular.copy(o.stats);
      this.att_type = o.att_type;
      this.used = false;  
    };

    Card.prototype.use = function(){
      console.log("Card ", this.name, " is Added!");
      var deck = this.player.deck;
      deck.usedCards.push(this);
      this.used = true;
      this.abilities.forEach(function(ability){
        ability.actions.affect(deck.usedCards);
      });
    };

    Card.prototype.discard = function(){
      console.log("Card ", this.name, " is removed!");
      var deck = this.player.deck;
      deck.usedCards.push(this);
      this.used = false;
      this.abilities.forEach(function(ability){
        ability.actions.cancel(deck.usedCards);
      });
    };

    Card.prototype.toString = function(){
      return this.name + "(" + this.att_type[0].toUpperCase() + ")";
    };
    
    var CardAbility = function(options){
      this.name = options.name;
      this.actions = options.actions;
      this.type = options.type;
    };

    CardAbility.WEAKEN_TIER3 = new CardAbility({
      name: 'WEAKEN_TIER3',
      type: 'BUFF',
      actions: {
        affect: function(cards){
          cards.forEach(function(card){
            if( card.att_type == 'melee' ){
              console.log("Card ", card.name, " DMG is reduced to 1!");
              card.stats[0] = 1;
            }
          });
        },
        cancel : function(cards){
          cards.forEach(function(card){

            if( card.att_type == 'melee' ){
              console.log("Card ", card.name, " stats is restored!");
              card.stats = angular.copy(card.originalStats);
            }
          });
        }
      }
    })

    CardAbility.CLEAR_BUFF = new CardAbility({
      name: 'CLEAR_BUFF',
      type: 'CLEAR',
      actions: {
        affect: function(cards){
          var buffs = cards.filter(function(card){ 
            try{ return card.abilities[0].type == 'BUFF' }
            catch(ex){ return false }
          });
          if( buffs.length > 0 )
            buffs.forEach(function(card){ 
              card.discard(); 
            });
        }
      }
    }); 
    
    Card.Defs = {
      'Clear Weather': { 
        name: 'Clear Weather', att_type:'weather', stats: [0,0,0], abilities: [ CardAbility.CLEAR_BUFF ] 
      },
      'Torrential Rain': { 
        name: 'Torrential Rain', att_type:'weather', stats: [0,0,0], abilities: [ CardAbility.WEAKEN_TIER3 ] 
      },
      'Hakurei Reimu': { 
        name: 'Hakurei Reimu', att_type:'melee', stats: [14,3,1], abilities: [] 
      },
      'Kirisame Marisa': { 
        name: 'Kirisame Marisa', att_type:'melee', stats: [5,8,4], abilities: [] 
      },
      'Youmu Konpaku': { 
        name: 'Youmu Konpaku', att_type:'range', stats: [10,4,2], abilities: [] 
      },
      'Komachi Onizuka': { 
        name: 'Komachi Onizuka', att_type:'melee', stats: [8,4,3], abilities: [] 
      },
      'Nitori Kawashiro': { 
        name: 'Nitori Kawashiro', att_type:'melee', stats: [12,4,1], abilities: [] 
      },
      'Fujiwara no Mukou': { 
        name: 'Fujiwara no Mukou', att_type:'melee', stats: [5,4,1], abilities: [] 
      },
      'Aya Shameimaru': { 
        name: 'Aya Shameimaru', att_type:'melee', stats: [7,4,3], abilities: [] 
      },
      'Uts uho Reuji': { 
        name: 'Uts uho Reuji', att_type:'melee', stats: [8,5,4], abilities: [] 
      },
      'Alice Margatroid': { 
        name: 'Alice Margatroid', att_type:'range', stats: [4,8,8], abilities: [] 
      },
      'Kochiya Sanae': { 
        name: 'Kochiya Sanae', att_type:'melee', stats: [9,5,4], abilities: [] 
      },
      'Ran Yakumo': { 
        name: 'Ran Yakumo', att_type:'range', stats: [5,6,9], abilities: [] 
      },
      'Sakuya Izayoi': { 
        name: 'Sakuya Izayoi', att_type:'melee', stats: [12,6,3], abilities: []
      }
    };
    
    Card.Shuffle = function(num){
      var name = Object.keys(Card.Defs), out = [];
      var lastCard = "";
      var selectCard = function(){
        var rand = Math.floor(name.length * Math.random());
        if( name[rand] != lastCard )
          return lastCard = name[rand];
        else
          return selectCard();
      }
      
      for(i=0; i<num; i++){
        out.push(
          new Card(
            Card.Defs[selectCard()]
          )
        );
      }
      return out;
    };
    
    return {
      Deck: Deck,
      Player: Player,
      Card: Card,
      CardAbility: CardAbility
    };
  }
  
  return BoardgameService;
});