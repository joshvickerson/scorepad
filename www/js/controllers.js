angular.module('scorepad.controllers', [])

.controller('scorepadsCtrl', function($scope, $location, scorepads) {
  $scope.scorepads = scorepads.all();

  // function to handle the delete action for scorepads
  $scope.swipeToDelete = function(scorepad) {
      scorepads.delete(scorepad);
  };

  // function for the creation of new scorepads
  $scope.submit = function(data) {
      // parse and submit form data
      var newID = 0;
      if($scope.scorepads.length > 0) {
          newID = $scope.scorepads[$scope.scorepads.length-1].id + 1;
      }
      var newScorepad =
      { id: newID, name: data.name, config: {
              winScore: data.winScore,
              maxPlayers: 4,
              scoreType: 'p'
          },
          games: []
      };
      // store the scorepad
      scorepads.create(newScorepad);
      // go back to scorepads
      $location.path("/scorepads");
  };
})

.controller('scorepadDetailCtrl', function($scope, $stateParams, scorepads) {

    $scope.scorepad = scorepads.get($stateParams.scorepadId);

    // function for the creation of new games
    $scope.submit = function(data) {

        var players = [];
        players.push({name:data.player1, score: 0});
        if(data.player2) {
            players.push({name:data.player2, score: 0});
        }
        if(data.player3) {
            players.push({name:data.player3, score: 0});
        }
        if(data.player4) {
            players.push({name:data.player4, score: 0});
        }

        var newGame =
        {
            name: data.name,
            players: players
        };
        // add the new game to the games array
        $scope.scorepad.games.push(newGame);
        // go back to the games list
        window.history.back();
    };

    // function to handle swipe to delete a game
    $scope.swipeToDelete = function(game) {
        $scope.scorepad.games.splice($scope.scorepad.games.indexOf(game), 1);
    };
})

.controller('gameDetailCtrl', function($scope, $stateParams, $ionicPopup, scorepads) {

    // this function gets the relevant game object from the scorepad
    function gameDetails($stateParams, scorepads) {
        var games = scorepads.get($stateParams.scorepadId).games;

        for(var i = 0; i < games.length; i++) {
            if(games[i].name === $stateParams.gameName) {
                return games[i];
            }
        }
    }

    // add the game to the scope
    $scope.game = gameDetails($stateParams, scorepads);

    // default to selecting the first player in the list
    $scope.selectedPlayer = 0;

    // function to handle interaction when a player taps on a player item
    $scope.playerTap = function(event) {
        var bar = event.target.parentNode.parentNode.getElementsByClassName('playerButtonBar')[0];
        if(bar.className === "playerButtonBar show") {
            bar.className = "playerButtonBar hidden";
        }
        else {
            bar.className = "playerButtonBar show";
            $scope.selectedPlayer = bar.id; // select the player
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
