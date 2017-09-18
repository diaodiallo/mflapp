<!-- Application -->

angular.module("mfl_app", ['ngRoute', 'mflServices'])
.config(function($routeProvider){
   $routeProvider
   .when("/dashboard", {
         templateUrl : "partials/dashboard.html"
   })
   .when("/map", {
         templateUrl : "partials/map.html"
   })
   .when("/param", {
         templateUrl : "partials/param.html"
   })
   .otherwise({
         redirectTo : "dashboard"
   });
})
.controller("OrganisationUnitsController", function($scope, getOrgUnitsService){
 
     // var countryId = "Hjw70Lodtf2";
      var countryId = "Ky2CzFdfBuO";

      $scope.regionLevel = 2;
      $scope.districtLevel = 3;
      //$scope.subDistrictLevel = 4;
      //$scope.areaLevel = 5;
      
      $scope.regions = null;
      $scope.districts = null;
      //$scope.subDistricts = null;
      //$scope.areas = null;
      $scope.facilities = null;

      $scope.getOrganisationUnits = function(level, ancestorId){

      getOrgUnitsService.getOrganisationUnits(level, ancestorId).then(function(result){

         if(level == 2){
         	$scope.regions = result.data.organisationUnits;
         	//console.debug($scope.regions);
         }
         else if(level == 3){
         	$scope.districts = result.data.organisationUnits;
         	//console.debug($scope.districts);
         }
         /*else if(level == 4){
         	$scope.subDistricts = result.data.organisationUnits;
         	console.debug($scope.subDistricts);
         }
         else if(level == 5){
         	$scope.areas = result.data.organisationUnits;
         	console.debug($scope.areas);
         }*/

         $scope.getFacilities(ancestorId);

      });

  };

  $scope.getFacilities = function(ancestorId){

      getOrgUnitsService.getOrganisationUnits(4, ancestorId).then(function(result){
      	$scope.facilities = result.data.organisationUnits;
      	//console.debug($scope.facilities);
      });
  };

      $scope.getOrganisationUnits(2, countryId);
      $scope.getFacilities(countryId);

})
.controller("MapController", function($scope, getOrgUnitsService, getRegionService){

      //VARIABLES
      var countryId = "Ky2CzFdfBuO";
      var facilities = [];
      var Regions = [{"id":"fxtOlL8b8mb","displayName":"Boké","count":0,"coords":['-14.2795','11.1567']},
                       {"id":"odY5MzWb1jc","displayName":"Conakry","count":0,"coords":['-13.6549','9.5623']},
                       {"id":"QrHKMLcRSCA","displayName":"Faranah","count":0,"coords":['-10.9506','10.9950']},
                       {"id":"D1rT7FToSE4","displayName":"Kankan","count":0,"coords":['-9.2972','10.7090']},
                       {"id":"yTNEihLzQwC","displayName":"Kindia","count":0,"coords":['-13.0710','10.1256']},
                       {"id":"zy5MQM2PlKb","displayName":"Labé","count":0,"coords":['-12.1701','11.7489']},
                       {"id":"ZSEW310Xy6l","displayName":"Mamou","count":0,"coords":['-12.0877','10.7468']},
                       {"id":"ysKioL4gVnV","displayName":"Nzérékoré","count":0,"coords":['-8.8687','8.6732']}];

      var Districts = [{"id":"q1zvw5TOnZF","displayName":"Beyla","count":0,"coords":['-8.305664','9.004452']},
                       {"id":"L1Gr2bAsR4T","displayName":"Boffa","count":0,"coords":['-14.073486','10.455402']},
                       {"id":"THgRhO9eF0I","displayName":"Boké Prefecture","count":0,"coords":['-14.359131','11.102947']},
                       {"id":"KnR8IiGoSxQ","displayName":"Coyah","count":0,"coords":['-13.348389','9.774025']},
                       {"id":"GUSZlo8f9t8","displayName":"Dabola","count":0,"coords":['-11.096191','10.800933']},
                       {"id":"mqBP8r7CwKc","displayName":"Dalaba","count":0,"coords":['-12.106934','11.027472']},
                       {"id":"IPv04VSahDi","displayName":"Dinguiraye","count":0,"coords":['-10.777588','11.684514']},
                       {"id":"gHO8qPxfLdl","displayName":"Dixinn","count":0,"coords":['-13.635750','9.608536']},
                       {"id":"VyZGMioVY5z","displayName":"Dubréka","count":0,"coords":['-13.513184','10.152746']},
                       {"id":"qmVkCsfziWM","displayName":"Faranah Prefecture","count":0,"coords":['-10.854492','10.120302']},
                       {"id":"CXHCAlP68L5","displayName":"Forécariah","count":0,"coords":['-13.128662','9.427387']},
                       {"id":"jiGkwTWpBeq","displayName":"Fria","count":0,"coords":['-13.546143','10.617418']},
                       {"id":"Motdz3Bql7L","displayName":"Gaoual","count":0,"coords":['-13.381348','11.781325']},
                       {"id":"khK0Ewyw0vV","displayName":"Guéckédou","count":0,"coords":['-10.294189','8.743936']},
                       {"id":"cbst9kz3DHp","displayName":"Kaloum","count":0,"coords":['-13.671799','9.544213']},
                       {"id":"Z71gNmPnc22","displayName":"Kankan Prefecture","count":0,"coords":['-9.261475','10.206813']},
                       {"id":"dkWnjo1bSrU","displayName":"Kérouané","count":0,"coords":['-9.096680','9.210560']},
                       {"id":"zmSjEUspuVL","displayName":"Kindia Prefecture","count":0,"coords":['-12.843018','10.163560']},
                       {"id":"VUj3PJpzty8","displayName":"Kissidougou","count":0,"coords":['-10.052490','9.308149']},
                       {"id":"HC3N6HbSdfg","displayName":"Koubia","count":0,"coords":['-11.909180','11.749059']},
                       {"id":"pChTVBEAPJJ","displayName":"Koundara","count":0,"coords":['-13.282471','12.447305']},
                       {"id":"kVULorkd7Vt","displayName":"Kouroussa","count":0,"coords":['-10.074463','10.768556']},
                       {"id":"E1AAcXV9PxL","displayName":"Labé Prefecture","count":0,"coords":['-12.348633','11.426187']},
                       {"id":"GuePjEvd6OH","displayName":"Lélouma","count":0,"coords":['-12.623291','11.609193']},
                       {"id":"QL7gnB6sSLA","displayName":"Lola","count":0,"coords":['-8.305664','7.961317']},
                       {"id":"TEjr8hbfz9a","displayName":"Macenta","count":0,"coords":['-9.360352','8.537565']},
                       {"id":"zJZspSfD06r","displayName":"Mali","count":0,"coords":['-12.260742','12.082296']},
                       {"id":"LyGsnnzEabg","displayName":"Mamou Prefecture","count":0,"coords":['-11.942139','10.314919']},
                       {"id":"ISZZ5m7PYAC","displayName":"Mandiana","count":0,"coords":['-8.668213','10.811724']},
                       {"id":"CoKlGkkiN4a","displayName":"Matam","count":0,"coords":['-13.629913','9.577392']},
                       {"id":"jIFb011EBWB","displayName":"Matoto","count":0,"coords":['-13.524170','9.604812']},
                       {"id":"yvJVq1GjI2A","displayName":"Nzérékoré Prefecture","count":0,"coords":['-8.822021','8.037473']},
                       {"id":"ASu054HjT5Y","displayName":"Pita","count":0,"coords":['-12.678223','10.951978']},
                       {"id":"D5WJbugzg9L","displayName":"Ratoma","count":0,"coords":['-13.534470','9.707703']},
                       {"id":"QZJuFnb2WZ6","displayName":"Siguiri","count":0,"coords":['-9.492188','11.727546']},
                       {"id":"C4dKrWoT5au","displayName":"Télimélé","count":0,"coords":['-13.502197','11.059821']},
                       {"id":"XraGmJ5tF7e","displayName":"Tougué","count":0,"coords":['-11.590576','11.544616']},
                       {"id":"PCa6e3khx5E","displayName":"Yomou","count":0,"coords":['-9.118652','7.591218']}];


      var options = {
      zoom: 6,
      center: new google.maps.LatLng(10, -11), 
      mapTypeId: google.maps.MapTypeId.TERRAIN
    },
  
    element = document.getElementById('map');
    var infoWindow = new google.maps.InfoWindow();
    var niveau = {
      "region":2,
      "district":3,
      "facility":4
    };
     $scope.markersRegion = [];
     $scope.markersFacility = [];
     $scope.markersDistrict = [];

    //CREER MARKER DES REGIONS / NETTOYER LE FICHIER DES PREFECTURES

     // Sets the map on all markers in the array.
      function mettreMarkerDansMap(map, niveau) {
            console.debug(niveau);
         if (niveau == 2) {
            console.debug($scope.markersRegion);
            console.debug(map);
            console.debug("Cacher Regions");
            for (var i = 0; i < $scope.markersRegion.length; i++) {
                $scope.markersRegion[i].setMap(map);
            }
        }
        else if(niveau == 3) {
            console.debug($scope.markersDistrict);
            console.debug(map);
            console.debug("Cacher Districts");
             for (var i = 0; i < $scope.markersDistrict.length; i++) {
                 $scope.markersDistrict[i].setMap(map);
             }
        }
        else if (niveau == 4) {
            console.debug($scope.markersFacility);
            console.debug(map);
            for (var i = 0; i < $scope.markersFacility.length; i++) {
                 $scope.markersFacility[i].setMap(map);
             }

        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function cacherMarkers(niveau) {
        mettreMarkerDansMap(null, niveau);
      }

      // Shows any markers currently in the array.
      function afficherMarkers(niveau) {
        mettreMarkerDansMap($scope.map, niveau);
      }


    var createMarkerRegion = function (region){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(region.coords[1], region.coords[0]),
                      title: region.displayName,
                      icon: 'img/icons/Guinea.png',
                      label: region.count.toString()
                     
                  });
                 // marker.content = '<div>' + region.count + '</div>';
                  
                 
                  google.maps.event.addListener(marker, 'click', function(){
                      //infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      //infoWindow.open($scope.map, marker);
                     $scope.map.setZoom(7);
                     $scope.map.setCenter(marker.position);
                     //MASQUER LES MARKER REGION AND AFFICHER LES MARKER DES PREFECTURES
                     cacherMarkers(niveau.region);

                     if(typeof $scope.markersDistrict !== 'undefined' && $scope.markersDistrict.length > 0){
                           afficherMarkers(niveau.district);
                     }
                     else {
                           for (var i = 0; i < Districts.length; i++){
                               createMarkerDistrict(Districts[i]);
                            }
                     }
                     
                  }); 

                  /*//AJOUTER LISTENER  POUR CHANGEMENT DU ZOOM / $scope.map.addListener
                  google.maps.event.addListener(map, 'zoom_changed', function(){
                     var zoom = $scope.map.getZoom();
                     cacherMarkers(niveau.district);
                     if(zoom == 6){                       
                       afficherMarkers(niveau.region);
                     }
                     //$scope.map.setCenter(marker.position);
               
                  });*/
                  
                  $scope.markersRegion.push(marker);
                  
              }
      //CREER MARKER DES PREFECTURES / DECHARGER LE FICHIER DES REGONS AND CHARGER LE FICHIER DES PREFECTURES
      var createMarkerDistrict = function (district){

                              
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(district.coords[1], district.coords[0]),
                      title: district.displayName,
                      icon: 'img/icons/Guinea.png',
                      label: district.count.toString()
                     });
                                   
                 
                  google.maps.event.addListener(marker, 'click', function(){
                     $scope.map.setZoom(8);
                     $scope.map.setCenter(marker.position);
                     //MASQUER LES MARKERS PREFECTURES AND AFFICHER LES MARKERS DES STRUCTURES
                     cacherMarkers(niveau.district); // 

                     if(typeof $scope.markersFacility !== 'undefined' && $scope.markersFacility.length > 0){
                        console.debug("Rentree 1 ");
                           afficherMarkers(niveau.facility);
                     }
                     else {
                         console.debug("Rentree 2 ");
                           for (var i = 0; i < facilities.length; i++){
                               createMarkerFacility(facilities[i]);
                            }
                     }
                     
                  });
                  //AJOUTER LISTENER  POUR CHANGEMENT DU ZOOM / $scope.map.addListener
                 /* google.maps.event.addListener(marker, 'zoom_changed', function(){
                     var zoom = $scope.map.getZoom();
                     cacherMarkers(niveau.district);
                     if(zoom == 6){                       
                       afficherMarkers(niveau.region);
                     }
                     //$scope.map.setCenter(marker.position);
               
                  }); */
                  
                  $scope.markersDistrict.push(marker);
                  
              }

      //CREER MAKER DES STRUCTURES EN UTILISANT facilities

      var createMarkerFacility = function (facility){

                              
                  var str = facility.coordinates;

          if (typeof str != 'undefined' && str) {
            
            console.debug("1 f: " + str);
            //Remove []
            var test = str.substring(1, str.length-1);
            console.debug("2 f: " + test);
            //Build Table
            var coords = test.split(",");
            console.debug("3 f: " + coords);
            console.debug("Lat : " + coords[1]);
            console.debug("Ln : " + coords[0]);
            //Parse values
                var la = parseFloat(coords[1]);
                var ln = parseFloat(coords[0]);
                
                var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(la, ln),
                      title: facility.displayName,
                      icon: 'img/icons/Facility.png'
                     });
               
          }
                                   
                  
                  
                  $scope.markersFacility.push(marker);
                  
              }
   
     //DATA
     // ALL Structures

     getOrgUnitsService.getOrganisationUnits(4, countryId).then(function(result){
         facilities = result.data.organisationUnits;
         console.debug(facilities);

         for (var i = 0; i < facilities.length; i++) {
         
               //COMPTER LES STRUCTURES DES REGIONS
                  for (var j = 0; j < Regions.length; j++) {
                     if (Regions[j].id == facilities[i].ancestors[1].id) {
                        Regions[j].count++;
                     } 
                  }
               //COMPTER LES STRUCTURES DES PREFECTURES
                  for (var k = 0; k < Districts.length; k++) {
                     if (Districts[k].id == facilities[i].ancestors[2].id) {
                        Districts[k].count++;
                     } 
                  }
       }
       console.debug(facilities);
       console.debug(Regions);
       console.debug(Districts);

        $scope.map = new google.maps.Map(element, options);

        $scope.map.data.loadGeoJson('js/custom/guinea.json');

        for (var i = 0; i < Regions.length; i++){
                  createMarkerRegion(Regions[i]);
                 }
         
         $scope.map.addListener('zoom_changed', function() {

                     var zoom = $scope.map.getZoom();
            
                     if (zoom == 6) {
                        // Afficher ou creer Region
                        // Cacher Prefecture et structure
                        cacherMarkers(niveau.district);

                        if(typeof $scope.markersRegion !== 'undefined' && $scope.markersRegion.length > 0){
                           afficherMarkers(niveau.region);
                         }
                        
                     } else if (zoom == 7) {
                        // Afficher ou creer Prefecture
                        // Cacher Region et structure 
                        if(typeof $scope.markersFacility !== 'undefined' && $scope.markersFacility.length > 0){
                           cacherMarkers(niveau.facility);
                        }                        
                        cacherMarkers(niveau.region);
                        
                        if(typeof $scope.markersDistrict !== 'undefined' && $scope.markersDistrict.length > 0){
                           afficherMarkers(niveau.district);
                        }
                        else {
                           for (var i = 0; i < Districts.length; i++){
                               createMarkerDistrict(Districts[i]);
                            }
                        }

                     } else if (zoom == 8) {
                        // Afficher ou creer Structure
                        // Cacher Prefecture et Region
                        cacherMarkers(niveau.district);

                        if(typeof $scope.markersFacility !== 'undefined' && $scope.markersFacility.length > 0){
                           afficherMarkers(niveau.facility);
                        }
                        else {
                           for (var i = 0; i < facilities.length; i++){
                               createMarkerFacility(facilities[i]);
                            }
                        }
                     }

                     });

     });

     // Regions and Number of structures

       


    /* var selectionRegion = function(facility){
         regions = getRegionService.getRegions(facility);
          //console.debug(regions);
            }; 

         selectionRegion(facilities);
           
     */

     //MAP 
   /*   var options = {
      zoom: 6,
      center: new google.maps.LatLng(10, -11), 
      mapTypeId: google.maps.MapTypeId.TERRAIN
    },
  
    element = document.getElementById('map'); */
   
  /* $scope.map = new google.maps.Map(element, options);

   $scope.map.data.loadGeoJson('js/custom/guinea.json');

   $scope.markers = [];

   var infoWindow = new google.maps.InfoWindow(); */

  /* var createMarker = function (region){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(region.coords[1], region.coords[0]),
                      title: region.displayName,
                      content: region.count
                  });
                 // marker.content = '<div>' + region.count + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  */
              
             /* for (var i = 0; i < Regions.length; i++){
                  createMarker(Regions[i]);
              } */

              /*$scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }*/


});