// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ia10', ['ionic', 'ia10.controllers', 'ia10.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaStatusbar, $window) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $cordovaStatusbar.overlaysWebView(true);
    $cordovaStatusbar.style(1);
  //$scope.tema = $window.localStorage.appTheme;
    if($window.localStorage.appTheme == "assertive"){
      $cordovaStatusbar.styleHex('#EF473A');
      console.log('assertive');
    }else if ($window.localStorage.appTheme == "energized") {
      $cordovaStatusbar.styleHex('#FFC900');
      console.log('energized');
    }else if ($window.localStorage.appTheme == "royal"){
      $cordovaStatusbar.styleHex('#886AEA');
      console.log('ini pengecualian');
    }else if ($window.localStorage.appTheme == "balanced"){
      $cordovaStatusbar.styleHex('#33CD5F');
    }else if ($window.localStorage.appTheme == "calm"){
      $cordovaStatusbar.styleHex('#11C1F3');
    }else if ($window.localStorage.appTheme = "dark"){
      $cordovaStatusbar.styleHex('#444444');
    }else if ($window.localStorage.appTheme = "positive"){
      $cordovaStatusbar.styleHex('#387EF5');
    }else if ($window.localStorage.appTheme = "stable"){
      $cordovaStatusbar.styleHex('#F8F8F8');
    }else if ($window.localStorage.appTheme = "light"){
      $cordovaStatusbar.styleHex('#FFFFFF');
    }else{
      $cordovaStatusbar.styleHex('#EF473A');
    }

    // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3

    // supported names: black, darkGray, lightGray, white, gray, red, green,
    // blue, cyan, yellow, magenta, orange, purple, brown
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      console.log('test');
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
   //controller: 'AppCtrl'
  })

  .state('app.dashboard',{
    url: "/dashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard.html",
        controller: "dashboard"
      }
    }
  })

  .state('app.jam', {
    url: "/jam",
    views: {
      'menuContent': {
        templateUrl: "templates/jam.html"
      }
    }
  })

  .state('app.jadwal',{
    url: "/jadwal",
    views: {
      'menuContent': {
        templateUrl: "templates/jadwal.html"
      }
    }
  })

  .state('app.tugas',{
    url: "/tugas",
    views: {
      'menuContent': {
        templateUrl: "templates/tugas.html",
        controller: "daftartugas"
      }
    }
  })

  .state('app.converter', {
    url: "/converter",
    views: {
      'menuContent': {
        templateUrl: "templates/converter.html"
      }
    }
  })

  .state('app.setting', {
    url: "/setting",
    views: {
      'menuContent': {
        templateUrl: "templates/pengaturan.html"
      }
    }
  })

  .state('app.tambahtugas', {
    url: "/tambahtugas",
    views: {
      'menuContent': {
        templateUrl: "templates/tambahtugas.html",
        controller: "tambahtugas"
      }
    }
  })

  .state('app.detail',{
    url: "/detail/:idtugas",
    views: {
      'menuContent': {
        templateUrl: "templates/detail.html",
        controller: "detailtugas"
      }
    }
  })

  .state('app.ilab', {
      url: "/ilab",
      views: {
        'menuContent': {
          templateUrl: "templates/ilab.html",
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});
