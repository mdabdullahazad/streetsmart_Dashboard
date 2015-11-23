/**
 * @ngdoc function
 * @name tourismApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tourismApp
 */
angular.module('tourismApp')
  .controller('verifyCtrl', function($scope, $http, $httpParamSerializer, $httpParamSerializerJQLike,$rootScope, $state, appService, ngSessionStore, constants, md5, $window) {
    'use strict';
    
  //  $scope.credentials_username = "";
  //  $scope.credentials_password = "";
    
//    
//    var username = $scope.credentials_username;
//    var pass = $scope.credentials_password;
//    
//    $scope.registration = function(){
//        $state.go("registration");
//    };
//    
//    $scope.login = function($event) {
//       
//        var loginUrl = "http://54.169.81.215/streetsmartadmin4/shopping/login";
//   
//        $http({
//            method: 'POST',
//            url: loginUrl,
//            data: $httpParamSerializerJQLike({
//                "email" : $scope.credentials_username,
//                "password" : $scope.credentials_password
//    }),
//    headers: {
//        'Content-Type': 'application/x-www-form-urlencoded'
//    }}).then(function(result) {
//            $rootScope.showAlert(result.data.message, constants.alertTypes.notification);
//            
//            if(result.data.error == false)
//            {
//                $window.localStorage && $window.localStorage.setItem('retaileridd', result.data.RetailerID);
//                $window.localStorage && $window.localStorage.setItem('username', result.data.spoc_name);
//                $window.localStorage && $window.localStorage.setItem('logstatusid', result.data.status);
//                $state.go("dashboard");
//            } 
//            else if(result.data.error == true)
//            {
//               $rootScope.showAlert(result.data.message, constants.alertTypes.warning);
//            }
//            
//       }, function(error) {
//           $rootScope.showAlert(result.data.message, constants.alertTypes.warning);
//       });
//
//      $event.preventDefault();
//         
//                $scope.credentials_username = "";
//                $scope.credentials_password = "";
//    };
//    
   

  });
