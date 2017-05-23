<!-- Application -->

angular.module("mfl_app", ['mflServices'])
.controller("OrganisationUnitsController", function($scope, getFacilitiesService, getOrgUnitsService){
 
      var countryId = "Hjw70Lodtf2";

      $scope.regionLevel = 2;
      $scope.districtLevel = 3;
      $scope.subDistrictLevel = 4;
      $scope.areaLevel = 5;
      
      $scope.regions = null;
      $scope.districts = null;
      $scope.subDistricts = null;
      $scope.areas = null;
      $scope.facilities = null;

      $scope.getOrganisationUnits = function(level, ancestorId){

      getOrgUnitsService.getOrganisationUnits(level, ancestorId).then(function(result){

         if(level == 2){
         	$scope.regions = result.data.organisationUnits;
         	console.debug($scope.regions);
         }
         else if(level == 3){
         	$scope.districts = result.data.organisationUnits;
         	console.debug($scope.districts);
         }
         else if(level == 4){
         	$scope.subDistricts = result.data.organisationUnits;
         	console.debug($scope.subDistricts);
         }
         else if(level == 5){
         	$scope.areas = result.data.organisationUnits;
         	console.debug($scope.areas);
         }

         $scope.getFacilities(ancestorId);

      });

  };

  $scope.getFacilities = function(ancestorId){

      getFacilitiesService.getFacilities(ancestorId).then(function(result){
      	$scope.facilities = result.data.organisationUnits;
      	console.debug($scope.facilities);
      });
  };

      $scope.getOrganisationUnits(2, countryId);
      $scope.getFacilities(countryId);

});