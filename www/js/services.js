angular.module('scorepad.services', [])

/**
 * Scorepads service that keeps track of all scorepads.
 */
.factory('scorepads', function() {

  // Some static test data
  var scorepads = [
    { id: 0, name: 'Rummy', config: {
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
        },
        {
            name: "Game 2",
            players: [
            {name: "Alex", score: 200},
            {name: "Josh", score: 400}
            ]
        }
    ]}, // end rummy
    { id: 1, name: 'Scrabble',

    config: {
        winScore: 0,
        maxPlayers: 4,
        scoreType: 'p'
    },
    games: [
        {
            name: "Awesome Game",
            players: [
            {name: "Jon", score: 92},
            {name: "Jimmy", score: 76}
            ]
        }
    ]
} // end scrabble
]; // end scorepads array

  return {
    all: function() {
      return scorepads;
    },
    get: function(scorepadId) {
      // Simple index lookup
      return scorepads[scorepadId];
    }
  }
});
