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

    	getOrganisationUnits: function(level, ancestorId, sets) {

            if (sets == null || sets.length == 0) {

            	var OrgUnitsURL = '25/organisationUnits.json?filter=level:eq:'+level+'&filter=path:like:'+ancestorId+'&fields=id,displayName,ancestors[id,name],organisationUnitGroups[id,name],coordinates&paging=false';

            } else if(sets.length == 1) {

            	var OrgUnitsURL = '25/organisationUnits.json?filter=level:eq:'+level+'&filter=path:like:'+ancestorId+'&filter=organisationUnitGroups.id:eq:'+sets[0].groupId+'&fields=id,displayName,ancestors[id,name],organisationUnitGroups[id,name],coordinates&paging=false';

            } else if(sets.length == 2) {

            	var OrgUnitsURL = '25/organisationUnits.json?filter=level:eq:'+level+'&filter=path:like:'+ancestorId+'&filter=organisationUnitGroups.id:in:['+sets[0].groupId+','+sets[1].groupId+']&fields=id,displayName,ancestors[id,name],organisationUnitGroups[id,name],coordinates&paging=false';

            }    
		
		//var OrgUnitsURL = 'organisationUnits.json?filter=level:eq:'+level+'&filter=path:like:'+ancestorId+'&fields=[id,displayName,ancestors,coordinates]&paging=false';
			return $http.get(URL + OrgUnitsURL);

	},

    }
})
.factory("getOrgUnitGroupSetsService", function($http){

   // var URL = "https://dhis2.jsi.com/dss/api/";
    var URL = "http://localhost:8080/api/"; 

    return {

    	getOrganisationUnitGroupSets: function() {
        
		var OrgUnitGroupSetsURL = '25/organisationUnitGroupSets.json?fields=id,displayName,organisationUnitGroups[id,displayName]&paging=false';
		//var OrgUnitsURL = 'organisationUnits.json?filter=level:eq:'+level+'&filter=path:like:'+ancestorId+'&fields=[id,displayName,ancestors,coordinates]&paging=false';
			return $http.get(URL + OrgUnitGroupSetsURL);

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
})
.factory("getDataService", function($http){

//var URL = "https://dhis2.jsi.com/dss/api/";
var URL = "http://localhost:8080/api/";

return {

	getDetails: function(id, period, facilityId) { 

	   var sections = [];
	   var groupElemURL = '25/dataElementGroupSets/'+id+'.json?fields=dataElementGroups[id,name]';
	   console.debug("Dans fonction");


          $.ajax({
			type: 'GET',
			url: URL + groupElemURL,
			success: function (response) { 
				//console.debug(response);
				$.each(response.dataElementGroups, function (i, item) {
                        
                        var section = [];
					    var elements = [];
					    var data = [];
					    var groupe = {
					    	"groupName":"",
					    	"section":[]
					    };
					    var elementsURL = '25/dataElements.json?filter=dataElementGroups.id:eq:'+item.id+'&paging=false';
                        var detailsURL = '25/dataValueSets.json?dataElementGroup='+item.id+'&period='+period+'&orgUnit='+facilityId+'&paging=false';
				         
				         $.ajax({ 
			                     type: 'GET',
			                     url: URL + elementsURL,
			                     success: function (response) {
				                 //Recuperer les elements du group
				                 //console.debug(response);
				                elements = response.dataElements;
				                 //console.debug(elements);

                                    $.ajax({ 
			                                 type: 'GET',
			                                 url: URL + detailsURL,
			                                 success: function (response) {
			                                 	//console.debug(response);
				                             //Recuperer les donnees du groupe
				                            data = response.dataValues;
				                             //console.debug(data);

				                                     for (var j = 0; j < elements.length; j++) {
				                                        var ligne = {
				                                        	"id":"",
				                                        	"dataElement":"",
				                                        	"value":""
				                                        };
                                                       if (typeof data !== 'undefined' && data !== null && data.length > 0) {
                                                          for (var k = 0; k < data.length; k++) {
                     
                                                              if (elements[j].id == data[k].dataElement) {
                     	                                      ligne.id = elements[j].id;
                                                              ligne.dataElement = elements[j].displayName;
                                                              ligne.value = data[k].value;
                                                              section.push(ligne);
                                                              // console.debug(section);
                                                              }
                                                          }
                                                       }
                                                    }

			                                 },
			                        error: function (response) {
                                    console.debug("Un probleme dans le chargement des donnees 1 groupe");
			                        }
		                            });


			                     },
			                      error: function (response) {
                                     console.debug("Un probleme dans le chargement des elements 1 groupe");
			                      }
		                });
                     
                                              

                      //Recuperer le groupe et les donnees
                      groupe.groupName = item.name;
                      groupe.section = section;
                      //console.debug(groupe);
                      sections.push(groupe);

					
				});
			},
			error: function (response) {
                console.debug("Un probleme dans les chargement des groupes elements");
			}
		});
        //console.debug(sections);
		return sections;
	},
}
});
/*
.factory("getDataService", function($http){

//var URL = "https://dhis2.jsi.com/dss/api/";
var URL = "http://localhost:8080/api/";
var groupElements = [];
var sections = [];

var getGroupElements = function(id){

	   var groupElemURL = '25/dataElementGroupSets/'+id+'.json?fields=dataElementGroups[id,name]';
			return $http.get(URL + groupElemURL);

}

var getElements = function(id){

	   var elementsURL = '25/dataElements.json?filter=dataElementGroups.id:eq:'+id+'&paging=false';
			return $http.get(URL + elementsURL);

}

var getDetails = function(id, period, facilityId){

	   var detailsURL = '25/dataValueSets.json?dataElementGroup='+id+'&period='+period+'&orgUnit='+facilityId+'&paging=false';
			return $http.get(URL + detailsURL);

}


return {

	getDetails: function(id, period, facilityId) { 

		groupElements = getElements(id);
		console.debug(groupElements);
		for (var i = 0; i < groupElements.length; i++) {
			var elements = getElements(groupElements[i].id);
			var donnees = getDetails(groupElements[i].id, period, facilityId);
            var section = [];
            var group = null;
            console.debug(elements);
            console.debug(donnees);
			for (var j = 0; j < elements.length; j++) {
				  var ligne = null;
                 
                  for (var k = 0; k < donnees.length; k++) {
                     
                     if (elements[j].id == donnees[k].dataElement) {
                     	 ligne.id = elements[j].id;
                         ligne.dataElement = elements[j].displayName;
                         ligne.value = donnees[k].value;
                         section.push(ligne);
                         
                     }
                  }
                  
             }
             group.group = groupElements[i].name;
             group.section = section;
             sections.push(group);
		}
		console.debug(sections);
		return sections;
	},

}
}); */

/*
.factory("getGroupElementService", function($http){

//var URL = "https://dhis2.jsi.com/dss/api/";
var URL = "http://localhost:8080/api/";

return {

	getGroupElements: function(ensGroupId) { 
         // Id du ens groupe OQbb6iRztf4
		//var elementsURL = '25/dataElements?filter=dataSetElements.dataSet.id:eq:qSYUcZkI1ig&fields=id,shortName,dataElementGroups[id,name]&paging=false';
		  var groupElemURL = '25/dataElementGroupSets/'+ensGroupId+'.json?fields=dataElementGroups[id,name]';
			return $http.get(URL + groupElemURL);
		
	},

}
})
.factory("getElementService", function($http){

//var URL = "https://dhis2.jsi.com/dss/api/";
var URL = "http://localhost:8080/api/";

//RECUPERER LES SECTION : PARAM OrgId, Period, deGroup RESULT section
  //25/analytics.json?dimension=dx:DE_GROUP-EA73MFyukEv&dimension=pe:2017&dimension=ou:kJRsUAiJnHZ&paging=false

return {

	getElements: function(groupId) { 

         //id d'un groupe YvDtXDZ8lIz
		//var detailsURL = '25/dataValueSets?dataSet=qSYUcZkI1ig&period=2017&orgUnit='+facilityId+'&paging=false';
		  var elementsURL = '25/dataElements.json?filter=dataElementGroups.id:eq:'+groupId+'&paging=false';
			return $http.get(URL + elementsURL);
		
	},

}
})
.factory("getDetailsService", function($http){

//var URL = "https://dhis2.jsi.com/dss/api/";
var URL = "http://localhost:8080/api/";

//RECUPERER LES SECTION : PARAM OrgId, Period, deGroup RESULT section
  //25/analytics.json?dimension=dx:DE_GROUP-EA73MFyukEv&dimension=pe:2017&dimension=ou:kJRsUAiJnHZ&paging=false

return {

	getDetails: function(groupId, period, facilityId) { 

		//var detailsURL = '25/dataValueSets?dataSet=qSYUcZkI1ig&period=2017&orgUnit='+facilityId+'&paging=false';
		 // var detailsURL = '25/analytics.json?dimension=dx:DE_GROUP-'+groupId+'&dimension=pe:'+period+'&dimension=ou:'+facilityId+'&paging=false';
		  var detailsURL = '25/dataValueSets.json?dataElementGroup='+groupId+'&period='+period+'&orgUnit='+facilityId+'&paging=false';
			return $http.get(URL + detailsURL);
		
	},

}
})*/
