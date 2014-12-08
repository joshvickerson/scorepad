// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'scorepad' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'scorepad.services' is found in services.js
// 'scorepad.controllers' is found in controllers.js
angular.module('scorepad', ['ionic', 'scorepad.controllers', 'scorepad.services'])

.run(function($ionicPlatform) {
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

    // Each tab has its own nav history stack:

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('tab.scorepads', {
        url: '/scorepads',
        views: {
            'tab-scorepads': {
                templateUrl: 'templates/scorepads.html',
                controller: 'scorepadsCtrl'
            }
        }
    })

    .state('tab.scorepad-detail', {
        url: '/scorepad/:scorepadId',
        views: {
            'tab-scorepads': {
                templateUrl: 'templates/scorepad-detail.html',
                controller: 'scorepadDetailCtrl'
            }
        }
    })

    .state('tab.game-detail', {
        url: '/scorepad/:scorepadId/:gameName',
        views: {
            'tab-scorepads': {
                templateUrl: 'templates/game-detail.html',
                controller: 'gameDetailCtrl'
            }
        }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/scorepads');

});
