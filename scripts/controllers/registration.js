/**
 * @ngdoc function
 * @name tourismApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the streetSmart_Dashboard
 */
angular.module('tourismApp')
  .controller('registerRetailerCtrl', function($scope, Map,$http, $httpParamSerializer, $httpParamSerializerJQLike,$rootScope, $state, appService, ngSessionStore, constants, md5, $window) {
    'use strict';
    
     $scope.place = {};
    
     $scope.loadMap = function() {
        Map.init();
    };
     
   
    
    $scope.noMall = false;
    $scope.register = {
        "type" : "",
        "retailerName" : "",
        "email" : "",
        "password" : "",
        "spocName" : "",
        "mobile" : "",
        "country" : "",
        "landline" : "",
        "website" : "",
        "package" : "",
        "storeType" : "",
        "country" : "",
        "city" : "",
        "area" : "",
        "mall" : "",
        "latitude" : "",
        "longitude" : "",
        "Address" : ""
    };
//	$scope.ca = {};
//	$scope.ca.latitude = 0;
//    $scope.ca.longitude = 0;
	
	//console.log("createAccountCtrl---------------");
	$scope.$on('$locationChangeStart', function(event, next, current){            
    // Here you can take the control and call your own functions:
    //alert('Sorry ! Back Button is disabled');
    // Prevent the browser default action (Going back):
    event.preventDefault();            
  });
  
  
  $scope.login = function() {
   $state.go("login");
    };
	
    $scope.thumbnail = {
      "fileName": "",
      "src": ""
    };
    $scope.sliderImages = [];

    $scope.setThumbnail = function(element) {
        
       /*
        console.log(element);
       var rejectedImages = []; 
        var resultCount = 0;
         var files = element.files[0];
        $scope.getImageDimensions(files, function(dimensions) {
         ++resultCount;
        if (dimensions.width < $rootScope.ThumbnailImageWidth && dimensions.height < $rootScope.ThumbnailImageWidth) {
              $scope.thumbnail = files;
            } else {
              rejectedImages.push(element.files[0].name);
            }

            if (resultCount === element.files.length && rejectedImages.length > 0) {
              $rootScope.$broadcast('onRejectedImagesFound', {
                "rejectedImages": rejectedImages
              });
            }
           });  */
        
      var files = element.files;  /* comment this line for upload error alert*/
      if (files[0] != undefined && files[0] != null) {
        var file = files[0];
        file.uniqueFileName = $scope.getUniqueString() + '-' + file.name;
        file.srcUrl = URL.createObjectURL(file);
        file.destUrl = $scope.getS3AssetUrl(file.uniqueFileName);
        $scope.thumbnail = file;
        $scope.$apply();
      }
    };

    $scope.setSliderImage = function(element) {
      var files = element.files;
      var rejectedImages = [];
     // var resultCount = 0;

      if (files != undefined && files != null) {
        angular.forEach(files, function(file) {
          file.uniqueFileName = $scope.getUniqueString() + '-' + file.name;
          file.srcUrl = URL.createObjectURL(file)
          file.destUrl = $scope.getS3AssetUrl(file.uniqueFileName);

        //  $scope.getImageDimensions(file, function(dimensions) {
         //   ++resultCount;
            $scope.sliderImages.push(file);
              
        /*    if (dimensions.width == $rootScope.sliderImageWidth && dimensions.height == $rootScope.sliderImageHeight) {
              $scope.sliderImages.push(file);
            } else {
              rejectedImages.push(file.name);
            }

            if (resultCount === files.length && rejectedImages.length > 0) {
              $rootScope.$broadcast('onRejectedImagesFound', {
                "rejectedImages": rejectedImages
              });
            }*/
            $scope.$apply();  
              
      //    });
        });
      }
    };

    var uploadSliderImages = function() {
      var total_image = $scope.sliderImages.length;

      for (var i = 0; i < total_image; i++) {
        S3Uploader.upload($scope.sliderImages[i]);
      }
    };

    var uploadThumbnail = function() {
      S3Uploader.upload($scope.thumbnail);
    };

    $scope.removeThumbnail = function() {
      $scope.thumbnail = {
        "fileName": "",
        "src": ""
      };
    };

    $scope.removeSliderImage = function(index) {
      $scope.sliderImages.splice(index, 1);
    };
	
	$scope.pickLatLng = function($event) {
      $rootScope.showMap(function(data) {
        $scope.ca.latitude = data.lat;
        $scope.ca.longitude = data.lng;
      });
      $event.preventDefault();
    };

	
	
	
	
	 $scope.showFirstForm = function(clearValues, $event) {
      $scope.currentSectionIndex = 0;
    /*  if (clearValues) {
        $scope.submitAccomodation($event);
        $timeout(resetForm, 500);
      } */
      $scope.currentSectionIndex = 0;
      $event.preventDefault();
    };

    $scope.showNextForm = function($event) {
      $scope.currentSectionIndex += 1;

      $event.preventDefault();
    };
    
   
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
//   

      
         var getCountryUrl = "http://54.169.81.215/streetsmartadmin4/shopping/countrylist";
         var getCountryUrlSuccess = function(data) {
            $scope.countryList = data;
         };
         appService.getData(getCountryUrl).then(getCountryUrlSuccess, $scope.printServiceError);
    
        $scope.getCity = function() {
             var getCityUrl = "http://54.169.81.215/streetsmartadmin4/shopping/specificcitylist/";
                 getCityUrl = getCityUrl + $scope.register.country;
            var getCitySuccess = function(data) {
                $scope.cityList = data;
            };
         appService.getData(getCityUrl).then(getCitySuccess, $scope.printServiceError);
    
        }; 
    
    
        $scope.getArea = function() {
             var getAreaUrl = "http://54.169.81.215/streetsmartadmin4/shopping/specificarealist/";
                 getAreaUrl = getAreaUrl + $scope.register.city;
            var getAreaSuccess = function(data) {
                $scope.areaList = data;
            };
         appService.getData(getAreaUrl).then(getAreaSuccess, $scope.printServiceError);
    
        };
    
    
    
    $scope.getMall = function() {
             var getMallUrl = "http://54.169.81.215/streetsmartadmin4/shopping/specificmalllist/";
                 getMallUrl = getMallUrl + $scope.register.area;
            var getMallSuccess = function(data) {
                
                if(data.error == true){
                    $scope.noMall = true;
                    $rootScope.showAlert("No malls in this area", constants.alertTypes.warning);   
                } else{
                    $scope.noMall = false;
                    $scope.mallList = data.message;
                }
                 
            };
         appService.getData(getMallUrl).then(getMallSuccess, $scope.printServiceError);
    
        };
    
    $scope.registerRetailer = function(){
             var registerUrl = "http://54.169.81.215/streetsmartadmin4/shopping/register2";
   
        $http({
            method: 'POST',
            url: registerUrl,
            data: $httpParamSerializerJQLike({
                "status" : $scope.register.type,
                "spoc_name" : $scope.register.spocName,
                "retailer_name" : $scope.register.retailerName,
                "mobile_num" : $scope.register.mobile,
                "landline_no" : $scope.register.landline,
                "username" : $scope.register.spocName,
                "email" : $scope.register.email,
                "password" : $scope.register.password,
                "country_id" : $scope.register.country,
                "city_id" : $scope.register.city,
                "area_id" : $scope.register.area,
                "mall_id" : $scope.register.mall,
                "address" : $scope.register.Address,
                "pack_id" : $scope.register.package,
                "logo_image" : $scope.thumbnail.destUrl,
                "type" : $scope.register.storeType,
                "website" : $scope.register.website,
                "latitude" : $scope.place.lat,
                "longitude" : $scope.place.lng,
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function(result) {
           // $rootScope.showAlert(result.data.message, constants.alertTypes.notification);
            
            if(result.error == 'false')
            {
                $rootScope.showAlert(result.message, constants.alertTypes.notification);
                $state.go("verify");
            } 
            else
            {
               $rootScope.showAlert(result.message, constants.alertTypes.warning);
            }
            
       }, function(error) {
           $rootScope.showAlert(result.message, constants.alertTypes.warning);
       });

      $event.preventDefault();
         
              
    };  
    
    
     $scope.search = function () {
        $scope.apiError = false;
        var spl = document.getElementById("google_places_ac").value;
        Map.search(spl).then(function (res) {
            Map.addMarker(res);
            $scope.place.name = res.name;
            $scope.place.lat = res.geometry.location.lat();
            $scope.place.lng = res.geometry.location.lng();
            console.log($scope.place.lat + "---" + $scope.place.lng);
        }, function (status) {
            $scope.apiError = true;
            $scope.apiStatus = status;
        });
        
        
    };
    
    
  }).directive('googlePlaces', function(){
                return {
                    restrict:'E',
                    replace:true,
                    // transclude:true,
                    scope: {location: '='},
                template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level" required/>',
                    link: function($scope, elm, attrs){
                        
                         var options = {
                types: [],
                //componentRestrictions: {country: 'MUS'}
            };
                        
                        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], options);
                        google.maps.event.addListener(autocomplete, 'place_changed', function() {
                            var place = autocomplete.getPlace();
                            $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                            $scope.$apply();
                        });
                    }
                }
            });



angular.module('tourismApp').service('Map', function ($q) {
    
    console.log(document.getElementById('map'));
    
    this.init = function () {
        var options = {
            center: new google.maps.LatLng(-20.244959,57.561768),
            zoom: 17,
            disableDefaultUI: true
        };
            this.map = new google.maps.Map(document.getElementById('map'), options);
            this.places = new google.maps.places.PlacesService(this.map);
        
    
    };
    
    
    this.search = function (str) {
        var d = $q.defer();
        this.places.textSearch({ query: str }, function (results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            } else
                d.reject(status);
        });
        return d.promise;
    };
   
    this.addMarker = function (res) {
        if (this.marker)
            this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this. marker.addListener('dragend', function(res) {
            var test = this.marker;
            placeMarker(event.latLng);
            console.log(res.latLng.lat());
            console.log(res.latLng.lng());
           
  });
          
        this.map.setCenter(res.geometry.location);
       
        console.log(this.marker.position);
    };
    
 function placeMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
     

}

     
});

