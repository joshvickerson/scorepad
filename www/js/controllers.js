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

    // function to handle interaction when a player taps on a player item
    $scope.playerTap = function(event) {
        var bar = event.target.parentNode.parentNode.getElementsByClassName('playerButtonBar')[0];
        if(bar.className === "playerButtonBar show") {
            bar.className = "playerButtonBar hidden";
        }
        else {
            bar.className = "playerButtonBar show";
        }
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
