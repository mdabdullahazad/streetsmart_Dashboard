/**
 * @ngdoc overview
 * @name tourismApp
 * @description
 * # tourismApp
 *
 * Main module of the application.
 */
angular
  .module('tourismApp', [
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngMaterial',
    'angular-md5',
    'angular-datepicker',
    'uiGmapgoogle-maps',
	'ngTouch', 
	'ui.grid',
	'ui.grid.edit', 
	'ui.grid.cellNav'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    'use strict';
    //
    // For any unmatched url, redirect to login
    $urlRouterProvider.otherwise('login');
    //
    // Now set up the states
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'LoginCtrl'
      })
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "views/dashboard.html",
        controller: 'DashboardCtrl'
      })
	  .state('createAccount', {
        url: "/createAccount",
        templateUrl: "views/createAccount.html",
        controller: 'createAccountCtrl'
      })
  })
  .config(function($mdThemingProvider, $httpProvider) {
    'use strict';
    $mdThemingProvider.theme('default');
    /*.primaryPalette('green')
      .accentPalette('orange')*/
    
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
   // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
  });
