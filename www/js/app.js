// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'scorepad' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'scorepad.services' is found in services.js
// 'scorepad.controllers' is found in controllers.js
angular.module('scorepad', ['ionic', 'scorepad.controllers', 'scorepad.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSplashscreen) {

    setTimeout(function() {
        $cordovaSplashscreen.hide();
    }, 2000);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('scorepads', {
        url: '/scorepads',
        templateUrl: 'templates/scorepads.html',
        controller: 'scorepadsCtrl'
    })

    .state('new-scorepad', {
        url: '/scorepads/new',
        templateUrl: 'templates/new-scorepad.html',
        controller: 'scorepadsCtrl'
    })

    .state('scorepad-detail', {
        url: '/scorepad/:scorepadId',
        templateUrl: 'templates/scorepad-detail.html',
        controller: 'scorepadDetailCtrl'
    })

    .state('new-game', {
        url: '/scorepad/:scorepadId/new',
        templateUrl: 'templates/new-game.html',
        controller: 'scorepadDetailCtrl'
    })

    .state('game-detail', {
        url: '/scorepad/:scorepadId/:gameName',
        templateUrl: 'templates/game-detail.html',
        controller: 'gameDetailCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/scorepads');

});
