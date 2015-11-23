/**
 * @ngdoc function
 * @name tourismApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the tourismApp
 */
angular.module('tourismApp')
  .controller('DashboardCtrl', function($scope,$rootScope,$state,$location,$window) {
    'use strict';

    $scope.tabs = config().dashboard.tabs;
    
    $scope.$on('logo', function (event, args) {
        $scope.retailerlogo = args.message;
    });
    
    
    
    $scope.$on('$locationChangeStart', function(event, next, current){            
    // Here you can take the control and call your own functions:
    //alert('Sorry ! Back Button is disabled');
    // Prevent the browser default action (Going back):
        event.preventDefault();            
    });
    
     $scope.logout = function() {
     $window.localStorage && $window.localStorage.setItem('retaileridd', "null");
     $window.localStorage && $window.localStorage.setItem('username', "null");
     $window.localStorage && $window.localStorage.setItem('logstatusid', "null");
     $state.go("login"); 
    };
    
  });
