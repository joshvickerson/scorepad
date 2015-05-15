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
                        {name: "Player 1", score: 0},
                    {name: "Player 2", score: 0}
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
      // find the scorepad with the chosen id
      for(var i = 0; i < $localStorage.scorepads.length; i++) {
          if($localStorage.scorepads[i].id == scorepadId) {
              return $localStorage.scorepads[i];
          }
      }
      console.log("ERROR: Scorepad not found");
    },
    create: function(data) {
        $localStorage.scorepads.push(data);
    },
    delete: function(scorepad) {
        $localStorage.scorepads.splice($localStorage.scorepads.indexOf(scorepad), 1);
    }
  };
});
