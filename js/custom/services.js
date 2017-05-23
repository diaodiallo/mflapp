<!-- LES SERVICES DE RECUPERATION DES -->

angular.module("mflServices", [])
.factory("getFacilitiesService", function($http){

var URL = "https://dhis2.jsi.com/dss/api/";

return {

	getFacilities: function(ancestorId) { 

		var facilitiesURL = 'organisationUnits.json?filter=level:eq:6&filter=ancestors.id:eq:'+ancestorId+'&fields=[id,displayName]&paging=false';
			return $http.get(URL + facilitiesURL);
	},

}
})
.factory("getOrgUnitsService", function($http){

    var URL = "https://dhis2.jsi.com/dss/api/";

    return {

    	getOrganisationUnits: function(level, ancestorId) {

		var OrgUnitsURL = 'organisationUnits.json?filter=level:eq:'+level+'&filter=ancestors.id:eq:'+ancestorId+'&fields=[id,displayName]&paging=false';
			return $http.get(URL + OrgUnitsURL);

	},

    }
});