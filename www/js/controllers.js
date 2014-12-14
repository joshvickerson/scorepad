angular.module('scorepad.controllers', [])

.controller('scorepadsCtrl', function($scope, scorepads) {
  $scope.scorepads = scorepads.all();
})

.controller('scorepadDetailCtrl', function($scope, $stateParams, scorepads) {
    $scope.scorepad = scorepads.get($stateParams.scorepadId);
})

.controller('gameDetailCtrl', function($scope, $stateParams, scorepads) {

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
    }

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
        }

        // reset the input
        document.getElementById(playerID).getElementsByClassName('numberInput')[0].value = "";

    }

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
    } // return
});
