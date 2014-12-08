angular.module('scorepad.controllers', [])

.controller('scorepadsCtrl', function($scope, scorepads) {
  $scope.scorepads = scorepads.all();
})

.controller('scorepadDetailCtrl', function($scope, $stateParams, scorepads) {
    $scope.scorepad = scorepads.get($stateParams.scorepadId);
})
.controller('gameDetailCtrl', function($scope, $stateParams, scorepads) {
    function gameDetails($stateParams, scorepads) {
        var games = scorepads.get($stateParams.scorepadId).games;

        for(var i = 0; i < games.length; i++) {
            if(games[i].name === $stateParams.gameName) {
                return games[i];
            }
        }
    }

    $scope.game = gameDetails($stateParams, scorepads);
});
