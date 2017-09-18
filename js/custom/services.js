<!-- LES SERVICES DE RECUPERATION DES -->

angular.module("mflServices", [])
.factory("getFacilitiesService", function($http){

//var URL = "https://dhis2.jsi.com/dss/api/";
var URL = "http://localhost:8080/api/";

return {

	getFacilities: function(ancestorId) { 

		if (ancestorId == 1) {
        var facilitiesURL = 'organisationUnits.json?filter=level:eq:4&fields=[id,displayName,coordinates]&paging=false';
			return $http.get(URL + facilitiesURL);
		}
		else{
		var facilitiesURL = 'organisationUnits.json?filter=level:eq:4&filter=path:like:'+ancestorId+'&fields=[id,displayName]&paging=false';
			return $http.get(URL + facilitiesURL);
			}
	},

}
})
.factory("getOrgUnitsService", function($http){

   // var URL = "https://dhis2.jsi.com/dss/api/";
    var URL = "http://localhost:8080/api/";

    return {

    	getOrganisationUnits: function(level, ancestorId) {

		var OrgUnitsURL = 'organisationUnits.json?filter=level:eq:'+level+'&filter=path:like:'+ancestorId+'&fields=[id,displayName,ancestors,coordinates]&paging=false';
			return $http.get(URL + OrgUnitsURL);

	},

    }
})
.factory("getRegionService", function($http) {

    var URL = "http://localhost:8080/api/";

    var coordinates = [{"id":"fxtOlL8b8mb","displayName":"Boké","coords":['-14.2795','11.15.67']},
                       {"id":"odY5MzWb1jc","displayName":"Conakry","coords":['-13.6549','9.5623']},
                       {"id":"QrHKMLcRSCA","displayName":"Faranah","coords":['-10.9506','10.9950']},
                       {"id":"D1rT7FToSE4","displayName":"Kankan","coords":['-9.2972','10.7090']},
                       {"id":"yTNEihLzQwC","displayName":"Kindia","coords":['-13.0710','10.1256']},
                       {"id":"zy5MQM2PlKb","displayName":"Labé","coords":['-12.1701','11.7489']},
                       {"id":"ZSEW310Xy6l","displayName":"Mamou","coords":['-12.0877','10.7468']},
                       {"id":"ysKioL4gVnV","displayName":"Nzérékoré","coords":['-8.8687','8.6732']}];

    return {
  
       getRegions: function(facilities) {

       var RegionURL = 'organisationUnits.json?filter=level:eq:2&fields=[id,displayName]&paging=false';

       var Regions = []; 
           console.debug(facilities);

       $http.get(URL + RegionURL).then(function(result){
      	   Regions = result.data.organisationUnits;
      	  // console.debug(Regions);
      });
      
       for (var i = 0; i < facilities.length; i++) {
       	
       	         for (var j = 0; j < Regions.length; j++) {
       	         	if (Regions[j].id == facilities[i].ancestors[1].id) {
                        Regions[j].count++;
       	         	} 
       	         }
       }

       for (var i = 0; i < Regions.length; i++) {
       	
       	 for (var j = 0; j < coordinates.length; j++) {
       	 	if (coordinates[j].id == Regions[i].id) {
                Regions[i].coords = coordinates[j].coords;
       	 	}
       	 }
       }
        
        //console.debug(Regions);
       return Regions;
        
       },
    }
});