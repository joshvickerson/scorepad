angular.module('scorepad.controllers', [])

.controller('scorepadsCtrl', function($scope, $location, scorepads) {
  $scope.scorepads = scorepads.all();
  $scope.submitHidden = 'show';

  // function to handle the delete action for scorepads
  $scope.swipeToDelete = function(scorepad) {
      scorepads.delete(scorepad);
  };

  // function for the creation of new scorepads
  $scope.submit = function(data) {
      // determine id for new scorepad
      var newID = 0;
      if($scope.scorepads.length > 0) {
          newID = $scope.scorepads[$scope.scorepads.length-1].id + 1;
      }
      if(data.winScore == undefined) {
        data.winScore = 0;
      }
      // make the scorepad structure
      var newScorepad =
      { id: newID,
        name: data.name,
        config: {
          winScore: data.winScore,
          scoreType: 'p'
        },
        players: []
      };
      // parse player data
      newScorepad.players.push({name:data.player1, score: 0});
      if(data.player2) {
        newScorepad.players.push({name:data.player2, score: 0});
      }
      if(data.player3) {
        newScorepad.players.push({name:data.player3, score: 0});
      }
      if(data.player4) {
        newScorepad.players.push({name:data.player4, score: 0});
      }
      // store the scorepad
      scorepads.create(newScorepad);
      // go back to scorepads
      $location.path("/scorepads");
  };
})

.controller('gameDetailCtrl', function($scope, $stateParams, $ionicPopup, scorepads) {

    // this function gets the relevant game object from the scorepad
    function gameDetails($stateParams) {
        var games = '';
    }

    // add the game to the scope
    $scope.game = scorepads.get($stateParams.scorepadId);

    $scope.selectedPlayer = null;

    // function to handle interaction when a player taps on a player item
    $scope.playerTap = function(event) {
      var allPlayers = document.getElementsByClassName('player');
      for(var i = 0; i < allPlayers.length; i++) {
        // move all players and their bars back
        allPlayers[i].style.transform = "translateY(0px)";
        allPlayers[i].children[1].style.transform = 'translateY(0px)';
      }
      // lets open the relevant bar
      var bar = event.target.parentNode.parentNode.getElementsByClassName('playerButtonBar')[0];
      // if we tapped a different player than before, open the bar
      if($scope.selectedPlayer != bar.id) {
        $scope.selectedPlayer = bar.id;
        bar.style.transform = 'translateY(64px)';
        // move the players below this down
        var movePlayer = parseInt(bar.id) + 1;
        while(movePlayer < 4) {
          console.log("moving player: " + movePlayer);
          var player = document.getElementById(movePlayer).parentNode;
          player.style.transform = "translateY(46px)";
          movePlayer++;
        }
      }
      // other wise, we tapped the same player leave it alone and clear selected player
      else {
        $scope.selectedPlayer = null;
      }
    };

    $scope.scoreChangeButtonHandler = function(action, playerID) {

        // get the points from the input
        var points = parseInt(document.getElementById(playerID).getElementsByClassName('numberInput')[0].value);

        // if a valid number entered, do the math
        if(!isNaN(points)){
            switch(action) {
                case 'add':
                    $scope.game.players[playerID].score += points;
                    break;
                case 'sub':
                    $scope.game.players[playerID].score -= points;
                    break;
                case 'set':
                    $scope.game.players[playerID].score = points;
                    break;
            }
            if($scope.game.players[playerID].score > 0 &&
               $scope.game.players[playerID].score >= scorepads.get($stateParams.scorepadId).config.winScore) {
                   $ionicPopup.alert({
                       title: 'Winner!',
                       template: $scope.game.players[playerID].name + ' wins!'
                   });
               }
        }

        // reset the input
        document.getElementById(playerID).getElementsByClassName('numberInput')[0].value = "";

    };

    // function to reset the score of all players
    $scope.resetGame = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Reset',
            template: 'Are you sure you want to set all scores to 0?',
            buttons: [
            {   text: 'No'},
            {   text: 'Yes',
                type: 'button-balanced',
                onTap: function() {
                    for(var i = 0; i < $scope.game.players.length; i++) {
                        $scope.game.players[i].score = 0;
                    }
                }
            }
            ]
        });
    };

})

.directive('detectGestures', function($ionicGesture) {
    return {
        link: function($scope,$element,attr) {
        switch(attr.gestureType) {
            case 'tap':
                $ionicGesture.on('tap', $scope.playerTap, $element);
                break;
        } // switch
        } // link
    }; // return
});
