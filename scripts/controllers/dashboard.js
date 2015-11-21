/**
 * @ngdoc function
 * @name tourismApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the tourismApp
 */
angular.module('tourismApp')
  .controller('DashboardCtrl', function($scope,$state,$location) {
    'use strict';

    $scope.tabs = config().dashboard.tabs;
    
    $scope.$on('$locationChangeStart', function(event, next, current){            
    // Here you can take the control and call your own functions:
    //alert('Sorry ! Back Button is disabled');
    // Prevent the browser default action (Going back):
    event.preventDefault();            
  });
    
  });
