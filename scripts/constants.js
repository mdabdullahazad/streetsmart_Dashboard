angular.module('tourismApp')
  .constant('constants', {
    'host': 'http://54.169.81.215/rest/',
    'endpoints': {
	  'categoryid':'categoryid',
      'countryid':'countryid',
      'stateid':'stateid',
      'cityid':'cityid',
      'country':'country',
      'state':'state',
      'city':'city',
      'cluster':'cluster',
      'clusterid':'clusterid',
      'adduser':'adduser',  
      'category':'category',  
      'userenq':'userenq',
      'selectpoi':'selectpoi',
      'addevent':'addevent'
    },
    'alerts': {
      'generalError': 'Please try again later',
      'sessionOut': 'Session Expired. Please login to continue.',
      'noData': 'Temporary server error. Please try again later.',
      'loginFailed': 'Login Failed.',
      'fieldsMissing': 'Please fill the mandatory fields',
      'fileMissing': 'Please select a file to upload',
      'uploadSuccess': 'Uploaded Successfully',
      'countryMissing': 'Please select a country',
      'stateMissing': 'Please select a state',
      'hugeFile': 'Sorry, your attachment is too big. Maximum file size allowed: ',
      'uploadPromise': ' data will be submited once the selected images are uploaded successfully',
      'mapsTitle': 'Select your location',
      "rejectedImages": 'Following images cannot be selected. Their dimensions are bigger than expected.'
    },
    'modalTypes': {
      'alert': 'alert',
      'popup': 'popup',
      'tooltip': 'tooltip',
      'map': 'map'
    },
    'alertTypes': {
      'error': 'error',
      'notification': 'notification',
      'warning': 'warning',
      'default': 'default'
    },
    's3Info': {
      'region': '',
      'file_size_limit': 10000000,
      'server_encryption': 'AES256',
      'bucket': 'streetsmartb2/retailer_logo',
      'access_key': 'AKIAJDXDJWCIOP4DIBRA',
      'secret_key': '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',
      'randomString': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567898'
    },
    'general': {
      'toastTimeout': 4000,
      'ThumbnailImageWidth': 101,
      'ThumbnailImageHeight': 101,
    }
  });
