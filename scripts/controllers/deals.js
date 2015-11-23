/**
 * @ngdoc function
 * @name tourismApp.controller:AccommodationCtrl
 * @description
 * # AccommodationCtrl
 * Controller of the tourismApp
 */
angular.module('tourismApp')
  .controller('dealsCtrl', function($scope , $http,$httpParamSerializer, $httpParamSerializerJQLike, $rootScope, S3Uploader, appService, constants, $timeout , $mdDialog,$interval,$location, $anchorScroll,$filter,$window) {
    
    'use strict';
    
     
    $scope.deals = {
        "campaignName": "",
        "startDate": "",
        "endDate": "",
        "dealType": "",
        "dealDescription": "",
        "company": "",
        "category": "",
        "subcategory": "",
        "brand": "",
        "product": "",
        "price": "",
        "percentage": ""
      };
    
    $scope.dealLocation = {
         "cityname": "",
         "cityid": "",
         "address": "",
         "mallname": "",
         "mallid": "",
         "geonotify": "",
         "pushnotify": "",
         "emailnotify": "",
         "smsnotify": "",
         "areaname": "",
         "areaid": "",
         "retailerlogo": ""
    };
    
    $scope.latLong = {
             "latitude" : "",
             "longitude" :  ""
    };
    
    $rootScope.retailerlogo = "";
    
    $scope.combyretailist = [];
    
          var retaileridd = $window.localStorage && $window.localStorage.getItem('retaileridd');
          var logstatusval = $window.localStorage && $window.localStorage.getItem('logstatusid');
          var username = $window.localStorage && $window.localStorage.getItem('username');
    
          if(logstatusval == 1)
		  {
			  $scope.retaileriddeall = $window.localStorage && $window.localStorage.getItem('retaileridd');
              
              
              
               var dealpackagerUrl = "http://54.169.81.215/streetsmartadmin4/shopping/dealpackage1/";
                   dealpackagerUrl = dealpackagerUrl + $scope.retaileriddeall + "/" + logstatusval;
              
               var dealpackagerUrlSuccess = function(data) {
                                 //$scope.dealLocation = data;
                   
                                 $scope.dealLocation.geonotify = data[0].geonotify;
								 $scope.dealLocation.pushnotify = data[0].pushnotify;
								 $scope.dealLocation.emailnotify = data[0].emailnotify;
								 $scope.dealLocation.smsnotify = data[0].smsnotify;
								 $scope.dealLocation.cityname = data[0].cityname;
								 $scope.dealLocation.cityid  = data[0].cityid;
								 $scope.dealLocation.mallname = data[0].mallname;
								 $scope.dealLocation.mallid = data[0].mallid;
								 $scope.dealLocation.address = data[0].address;
								 $scope.dealLocation.retailerlogo = data[0].retailerlogo;
								 $scope.dealLocation.areaname = data[0].areaname;
								 $scope.dealLocation.areaid = data[0].areaid;
                   
                                    $rootScope.retailerlogo = data[0].retailerlogo;
                                    console.log(data[0].retailerlogo);
                                    console.log($rootScope.retailerlogo);
                   
                               $scope.$emit('logo', { message: data[0].retailerlogo });
                };
              
              appService.getData(dealpackagerUrl).then(dealpackagerUrlSuccess, $scope.printServiceError);
   
              
              
		  } 
         
         else if(logstatusval == 2)
         {
              
                $scope.retaileriddeall = $window.localStorage && $window.localStorage.getItem('retaileridd');
              
                var displaycompanyretailerlistUrl = "http://54.169.81.215/streetsmartadmin4/shopping/displaycompanyretailerlist1";
   
                $http({
                        method: 'POST',
                        url: displaycompanyretailerlistUrl,
                        data: $httpParamSerializerJQLike({
                        "company_id" : $scope.retaileriddeall
                    }),
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                    }}).then(function(result) {
                        $rootScope.showAlert(result.data.result.message, constants.alertTypes.notification);
                    }, function(error) {
                        $rootScope.showAlert(error.data.message, constants.alertTypes.warning);
                        });

                        $event.preventDefault();
          } 
          else
          {
                $rootScope.showAlert("Something Went Wrong", constants.alertTypes.warning);
          }
    
    
        	
		/**** Category Data List ****/
    
         var getCategoryrUrl = "http://54.169.81.215/streetsmartadmin4/shopping/getretailercategory/";
         getCategoryrUrl = getCategoryrUrl + $scope.retaileriddeall;
         var getCategoryrUrlSuccess = function(data) {
            $scope.category = data;
         };
         appService.getData(getCategoryrUrl).then(getCategoryrUrlSuccess, $scope.printServiceError);
   
    
         var latLongUrl = "http://54.169.81.215/streetsmartadmin4/shopping/dealpackage2/";
             latLongUrl = latLongUrl + retaileridd + "/" + logstatusval;
         var latLongUrlSuccess = function(data) {
             $scope.latLong.latitude = data[0].latitude;
             $scope.latLong.longitude = data[0].longitude;
         };
         appService.getData(latLongUrl).then(latLongUrlSuccess, $scope.printServiceError);
    
    
    
    
    
    
    
   
//        var getCategoryrUrl = "http://54.169.81.215/streetsmartadmin4/shopping/categorylist";
//        var getCategoryrUrlSuccess = function(data) {
//        $scope.category = data;
//        };
//        appService.getData(getCategoryrUrl).then(getCategoryrUrlSuccess, $scope.printServiceError);
//   
//    
    
   
   /*  Display Sub Category  */ 
     $scope.displaysubcategory = function($event) {
       
        var displaysubcategoryUrl = "http://54.169.81.215/streetsmartadmin4/shopping/subcategoryretailer";
   
        $http({
            method: 'POST',
            url: displaysubcategoryUrl,
            data: $httpParamSerializerJQLike({
                "retailerid" : $scope.retaileriddeall,
                "categoryid" : $scope.deals.category
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function(result) {
            //$rootScope.showAlert(result.data.result.message, constants.alertTypes.notification);
           // console.log(result);
            $scope.subCategory = result.data;
            //$scope.getAllDriver();
       }, function(error) {
           $rootScope.showAlert("error", constants.alertTypes.warning);
       });

      //$event.preventDefault();
         
    };
    
    
//    $scope.displaysubcategory = function(){
//        var getCategoryrUrl = "http://54.169.81.215/streetsmartadmin4/shopping/displaysubcategory/";
//            getCategoryrUrl = getCategoryrUrl + $scope.deals.category;
//        var getCategoryrUrlSuccess = function(data) {
//        $scope.subCategory = data.Subcategory;
//        };
//        appService.getData(getCategoryrUrl).then(getCategoryrUrlSuccess, $scope.printServiceError);
//    };
   
    
    
     $scope.getBrands = function($event) {
       
        var getBrandsUrl = "http://54.169.81.215/streetsmartadmin4/shopping/getretailerbrand";
   
        $http({
            method: 'POST',
            url: getBrandsUrl,
            data: $httpParamSerializerJQLike({
                "retailerid" : $scope.retaileriddeall,
                "subcat_id" : $scope.deals.subcategory
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function(result) {
            //$rootScope.showAlert(result.data.result.message, constants.alertTypes.notification);
           // console.log(result);
            $scope.brand = result.data;
            //$scope.getAllDriver();
       }, function(error) {
           $rootScope.showAlert("error", constants.alertTypes.warning);
       });

      //$event.preventDefault();
         
    };
    
   
    $scope.getproduct = function($event) {
       
        var getproductUrl = "http://54.169.81.215/streetsmartadmin4/shopping/getretailerproduct";
   
        $http({
            method: 'POST',
            url: getproductUrl,
            data: $httpParamSerializerJQLike({
                "retailerid" : $scope.retaileriddeall,
                "brandid" : $scope.deals.brand
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function(result) {
            $scope.product = result.data;
       }, function(error) {
           $rootScope.showAlert("error", constants.alertTypes.warning);
       });

      //$event.preventDefault();
         
    };
    
    
     $scope.addDeals = function($event) {
        
//          var retaileridd = $window.localStorage && $window.localStorage.getItem('retaileridd');
//          var type = $window.localStorage && $window.localStorage.getItem('usertype');
//          var type = $window.localStorage && $window.localStorage.getItem('usertype');
//         
         console.log("ADDED");
       // alert($scope.bookDriver.DriverEmailId);
        var addDealsUrl = "http://54.169.81.215/streetsmartadmin4/shopping/deal3";
   
        $http({
            method: 'POST',
            url: addDealsUrl,
            data: $httpParamSerializerJQLike({
                "retailerid" : localStorage.getItem('retaileridd'),
                "campaignname" : $scope.deals.campaignName,
                "sdate" : $scope.deals.startDate,
                "edate" : $scope.deals.endDate,
                "category_id" : $scope.deals.category,
                "subcategory_id" : $scope.deals.subcategory,
                "brand_id" : $scope.deals.brand,
                "product_id" : $scope.deals.product,
                "service_id" : 0,
                "offername" : "offer name",
                "promotext" : "promo text",
                "offerimage" : $scope.sliderImages[0].destUrl,
                "offerthumbnails" : $scope.thumbnail.destUrl,
                "price" : $scope.deals.price,
                "percentage" : $scope.deals.percentage,
                "dealtype" : $scope.deals.dealType,
                "dealdescription" : $scope.deals.dealDescription,
                "creditpoint" : 0,
                "tandc" : 1,
                "location" : $scope.dealLocation.cityid,
                "address" : $scope.dealLocation.address,
                "mall_id" : $scope.dealLocation.mallid,
                "keywords" : "keywords",
                "gender" : "both",
                "agefrom" : 0,
                "ageto" : 100,
                "occupation_id" : 9,
                "geofence" : $scope.dealLocation.geonotify,
                "push" : $scope.dealLocation.pushnotify,
                "emailnotify" : $scope.dealLocation.emailnotify,
                "sms" : $scope.dealLocation.smsnotify,
                "emi" : 0,
                "cashod" : 0,
                "creditcard" : 0,
                "refund" : 0,
                "noexchange" : 0,
                "timming" : "9 Am to 9 Pm",
                "area_id" : $scope.dealLocation.areaid,
                "retailerlogo" : $scope.dealLocation.retailerlogo,
                "bankid" : 0,
                "cardid" : 0,
                "privilageid" : 0,
                "cardpromotext" : 0,
                "cardcondition" : 1,
                "retailername" : username,
                "latitude" : $scope.latLong.latitude,
                "longitude" : $scope.latLong.longitude
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function(result) {
            $rootScope.showAlert(result.data[0].Deal, constants.alertTypes.notification);
            
             $scope.deals.campaignName = "",
             $scope.deals.startDate = "",
             $scope.deals.endDate = "",
             $scope.deals.category = "",
             $scope.deals.subcategory = "",
             $scope.deals.brand = "",
             $scope.deals.product = "",
             $scope.deals.percentage = "",
             $scope.deals.dealType = "",
             $scope.deals.dealDescription = ""
            //$scope.getAllDriver();
       }, function(error) {
           $rootScope.showAlert(error.data.message, constants.alertTypes.warning);
       });

      $event.preventDefault();
         
                
    };
    
    
    
























    
     var sliderImagesS3Url = [];
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
    
    
    
    
//    
//    $scope.deals = {
//        "campaignName": "",
//        "startDate": "",
//        "endDate": "",
//        "dealType": "",
//        "dealDescription": "",
//        "category": "",
//        "subcategory": "",
//        "brand": "",
//        "product": "",        
//        "price": "",        
//        "startDate": "",        
//        "endDate": "",        
//
//      };
//    
//    
//    $scope.getCategory = function(){
//        var getCategoryrUrl = appService.generateURL("http://54.169.81.215/streetsmartadmin4/shopping/displaysubcategory/")
//            getCategoryrUrl = getCategoryrUrl + $scope.categoryList.company;
//        var getCategoryrUrlSuccess = function(data) {
//        $scope.category = data;
//        };
//        appService.getData(getCategoryrUrl).then(getCategoryrUrlSuccess, $scope.printServiceError);
//    };
//    
//    $scope.getSubCategory = function(){
//        var getSubCategoryrUrl = appService.generateURL(constants.endpoints.displaydrivers)
//        var getAllDriverSuccess = function(data) {
//        $scope.users = data;
//        };
//        appService.getData(getAllDriverUrl).then(getAllDriverSuccess, $scope.printServiceError);
//    };
//    
//    $scope.getBrand = function(){
//        var getBrandUrl = appService.generateURL(constants.endpoints.displaydrivers)
//        var getAllDriverSuccess = function(data) {
//        $scope.users = data;
//        };
//        appService.getData(getAllDriverUrl).then(getAllDriverSuccess, $scope.printServiceError);
//    };
//    
//    
//    $scope.getProduct = function(){
//        var getProductUrl = appService.generateURL(constants.endpoints.displaydrivers)
//        var getAllDriverSuccess = function(data) {
//        $scope.users = data;
//        };
//        appService.getData(getAllDriverUrl).then(getAllDriverSuccess, $scope.printServiceError);
//    };
//    
//    
//    
//     $scope.addCategory = function($event) {
//        
//       // alert($scope.bookDriver.DriverEmailId);
//        var addCategoryUrl = "http://54.169.81.215/streetsmartadmin4/shopping/retailercategory1";
//   
//        $http({
//            method: 'POST',
//            url: addCategoryUrl,
//            data: $httpParamSerializerJQLike({
//                "retailerid" : localStorage.getItem('retaileridd'),
//                "category" : $scope.categoryList.category,
//                "subcategory" : $scope.categoryList.subcategory,
//                "brand" : $scope.categoryList.brand,
//                "product" : $scope.categoryList.product,
//                "service" : 0,
//                "companyid" : $scope.categoryList.company
//    }),
//    headers: {
//        'Content-Type': 'application/x-www-form-urlencoded'
//    }}).then(function(result) {
//            $rootScope.showAlert(result.data.result.message, constants.alertTypes.notification);
//            //$scope.getAllDriver();
//       }, function(error) {
//           $rootScope.showAlert(error.data.message, constants.alertTypes.warning);
//       });
//
//      $event.preventDefault();
//         
//                $scope.categoryList.category = "";
//                $scope.categoryList.subcategory = "";
//                $scope.categoryList.brand = "";
//                $scope.categoryList.product = "";
//                $scope.categoryList.company = "";
//    };
//    
//    
//    
//    
//    
//    
//   
    
    
    
    
    
    
    
    $scope.bookDriver = {};
    $scope.paginationBar = true; 
    $scope.users = [{"id":"1","name":"Fabio"},{"id":"2","name":"Leonardo"}];
    
    /* get all driver */
    $scope.getAllDriver = function(){
        
        $scope.loading = true;    //loading code
        
        var getAllDriverUrl = appService.generateURL(constants.endpoints.displaydrivers)
        getAllDriverUrl = getAllDriverUrl + "/0" ;
        
        var getAllDriverSuccess = function(data) {
        $scope.users = data;
        
        $scope.loading = false;          //loading code
        $scope.paginationBar = true;     //paginationBar code
        
        console.log($scope.users);
        };
        
        appService.getData(getAllDriverUrl).then(getAllDriverSuccess, $scope.printServiceError);
    };
    
  $scope.getAllDriver();  
    
     /**********************************************************************************/
     $scope.currentPage = 0;
     $scope.pageSize = 8;
     $scope.numberOfPages=function(){
        //return Math.ceil($scope.users.length/$scope.pageSize);  
          var myFilteredData = $filter('filter')($scope.users,$scope.searchs);
          return Math.ceil($scope.users.length/$scope.pageSize);  
    }
    
    
    /**********************************************************************************/
    
    
    
    
    $scope.sourceEditAddr = "HAL";
    $scope.destEditAddr = "Marathalli";
    
      $scope.thumbnail = {
      "fileName": "",
      "src": ""
    };
    
     $scope.setThumbnail = function(element) {
      
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

    var uploadThumbnail = function() {
      S3Uploader.upload($scope.thumbnail);
    };

    $scope.removeThumbnail = function() {
      $scope.thumbnail = {
        "fileName": "",
        "src": ""
      };
    };
    
    
    $scope.showFirstForm = function(clearValues, $event) {
      $scope.currentSectionIndex = 0;
   
      $scope.currentSectionIndex = 0;
      $event.preventDefault();
    };

    $scope.showNextForm = function($event) {
      $scope.currentSectionIndex += 1;
      $event.preventDefault();
    };
    
    $scope.showAllRide = function($event) {
      $scope.currentSectionIndex -= 1;

      $event.preventDefault();
    };
    
    
    $scope.showAddNewRide = function($event) {
      $scope.currentSectionIndex -= 1;

      $event.preventDefault();
    };
    $scope.showAllRides = function($event) {
      $scope.currentSectionIndex -= 2;

      $event.preventDefault();
    };
    
     $scope.addRide = function($event) {
        
       // alert($scope.bookDriver.DriverEmailId);
        var addDriverUrl = appService.generateURL(constants.endpoints.driverregister);
   
        $http({
            method: 'POST',
            url: addDriverUrl,
            data: $httpParamSerializerJQLike({
                "email" : $scope.bookDriver.DriverEmailId,
                "password" : $scope.bookDriver.DriverPasswd,
                "name" : $scope.bookDriver.DriverName,
                "mobile" : $scope.bookDriver.ContactNumber,
                "address" : $scope.bookDriver.driver_Address,
                "area" : $scope.bookDriver.DriverArea,
                "gender" : $scope.bookDriver.driver_gender,
                "age" : $scope.bookDriver.DriverAge,
                "license" : $scope.bookDriver.LicenseNumber,
                "photo" : "www.google.com"
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}).then(function(result) {
            $rootScope.showAlert(result.data.result.message, constants.alertTypes.notification);
            $scope.getAllDriver();
       }, function(error) {
           $rootScope.showAlert(error.data.message, constants.alertTypes.warning);
       });

      $event.preventDefault();
         
                $scope.bookDriver.DriverEmailId = "";
                $scope.bookDriver.DriverPasswd = "";
                $scope.bookDriver.DriverName = "";
                $scope.bookDriver.ContactNumber = "";
                $scope.bookDriver.driver_Address = "";
                $scope.bookDriver.DriverArea = "";
                $scope.bookDriver.driver_gender = "";
                $scope.bookDriver.DriverAge = "";
                $scope.bookDriver.LicenseNumber = "";
                $scope.thumbnail.destUrl = "";
    };
    
    
    
     $scope.showEdit = function($event,user) {
         console.log(user);
      $scope.currentSectionIndex += 2;
         $scope.testData = user;
         $scope.DName = user.name;
         $scope.DAdress = user.address;
         $scope.DAge = parseInt(user.age);
         $scope.DEmail = user.email;
         $scope.DGender = user.gender;
         $scope.DContactNumber = parseInt(user.mobile);
         $scope.DLicNumber = user.license;
         $scope.DArea = user.area;
         $scope.thumbnail.srcUrl = user.photo;

      $event.preventDefault();
    };
    
    
     $scope.deleteDriver = function(ev,user,index){
    var confirm = $mdDialog.confirm()
          .title('Are you sure , to delete')
          .content('')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Confirm')
          .cancel('Cancel');

        $mdDialog.show(confirm).then(function()
       {
            console.log(user);
		var deleteDriverUrl = appService.generateURL(constants.endpoints.deletedriver);
		$http({
			method: 'POST',
			url: deleteDriverUrl,
			data: $httpParamSerializerJQLike({
                "user_id" : user.user_id
            }),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}}).then(function(result) {
                    var node = document.getElementById(index);
                    node.remove();
					$rootScope.showAlert(result.data.message, constants.alertTypes.notification);
                    $location.hash('top');
                    $anchorScroll();
                    //$scope.getAllDriver();
				}, function(error) {
					$rootScope.showAlert(result.data.message, constants.alertTypes.error);
					});

		 $event.preventDefault();
      
            
        }, function() {
            console.log("You canceled");
            });
 };
    
    
      
   $scope.viewDriver = function(ev,userID) {
      // alert(userID);
       $scope.testdata = userID;
    $mdDialog.show({
      locals:{dataToPass: $scope.testdata}, 
      controller: viewDialogController,
      templateUrl: "views/viewdrivertemplate.html",
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
    
    
function viewDialogController($scope, $mdDialog,dataToPass) {
   // alert(dataToPass);
    $scope.DName = dataToPass.name;
    $scope.DAdress = dataToPass.address;
    $scope.DAge = dataToPass.age;
    $scope.DEmail = dataToPass.email;
    $scope.DGender = dataToPass.gender;
    $scope.DContactNumber = dataToPass.mobile;
    $scope.DLicNumber = dataToPass.license;
    $scope.DArea = dataToPass.area;
    
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        alert("cancel");
        $mdDialog.cancel();
    };

  };
    
  
  /*  
     $scope.viewRide = function(ev) {
    $mdDialog.show({
      controller: viewRideController,
      templateUrl: "views/viewRidetemplate.html",
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
    
    
function viewRideController($scope, $mdDialog) {
    $scope.DName = "Pratap Batullah";
    $scope.DAdress = "Tata Elxsi Bangalore";
    $scope.DAge = "25";
    $scope.DGender = "Male";
    $scope.DContactNumber = "+91 987654321";
    $scope.DLicNumber = "LIC-08-564";
    $scope.DLicEXD = "2020/1/1";
    
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

  };
    
    */

    /*------------------------------------------------------------------------------------------------------------------*/
   
    
   
    
  
  }).filter('startFrom', function() {
    return function(input, start) {
        start = parseInt(+start); //parse to int
        return input.slice(start);
    }
}).directive("startDateCalendar", [
  function() {
    return function(scope, element, attrs) {
      
    scope.$watch("deals.endDate", (function(newValue, oldValue) {
      element.datepicker("option", "maxDate", newValue);
    }), true);

      
      return element.datepicker({
        dateFormat: "yy-mm-dd",
        numberOfMonths: 1,
        minDate: new Date(),
        maxDate: scope.deals.endDate,
        onSelect: function(date) {
          scope.deals.startDate = date;
          scope.$apply();
        }
      });
    };
  }

]).directive("endDateCalendar", [
  function() {
    return function(scope, element, attrs) {
    scope.$watch("deals.startDate", (function(newValue, oldValue) {
      element.datepicker("option", "minDate", newValue);
    }), true);

      return element.datepicker({
        dateFormat: "yy-mm-dd",
        numberOfMonths: 1,
        minDate: scope.deals.startDate,
        defaultDate: scope.deals.endDate,
        onSelect: function(date) {
          scope.deals.endDate = date;
          return scope.$apply();
        }
      });
    };
  }

]);
