var config = function() {

  /*configure the tabs here. Tell what is the tab name and switch it active or inactive in UI*/
  this.dashboard = {
    "tabs": {
      "count": 6,
      "headers": [{
        "label": "Category",
        "template": "views/category.html",
        "isactive": true
      },{
        "label": "Deals",
        "template": "views/deals.html",
        "isactive": true
     }
//          ,{
//        "label": "Category - old",
//        "template": "views/location.html",
//        "isactive": true
//      }, {
//        "label": "Add Deal",
//        "template": "views/poi.html",
//        "isactive": true
//      }, {
//        "label": "View Deal",
//        "template": "views/events.html",
//        "isactive": true
//      }, {
//        "label": "Promo Code",
//        "template": "views/emergency_info.html",
//        "isactive": true
//      },{
//        "label": "User",
//        "template": "views/user.html",
//        "isactive": true
//      }
                 ]
    }
  };
  
 
  
  return this;
}
