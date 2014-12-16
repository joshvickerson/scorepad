angular.module('scorepad.services', ['ngStorage'])

/**
 * Scorepads service that keeps track of all scorepads.
 */
.factory('scorepads', function($localStorage) {

  // Some static test data
  if(!$localStorage.scorepads) {
      $localStorage.scorepads = [
          { id: 0, name: 'Sample Game', config: {
                    winScore: 500,
                    maxPlayers: 4,
                    scoreType: 'p'
                },
                games: [
                    {
                        name: "Game 1",
                        players: [
                        {name: "Player 1", score: 50},
                        {name: "Josh", score: 25}
                        ]
                    }
                ]
            }
        ]; // end scorepads array
    }

  return {
    all: function() {
      return $localStorage.scorepads;
    },
    get: function(scorepadId) {
      // Simple index lookup
      return $localStorage.scorepads[scorepadId];
    },
    create: function(data) {
        $localStorage.scorepads.push(data);
    },
    delete: function(scorepad) {
        $localStorage.scorepads.splice($localStorage.scorepads.indexOf(scorepad), 1);
    }
  }
});
