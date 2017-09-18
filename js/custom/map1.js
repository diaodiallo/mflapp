
 function initMap() {
	//Map Options
    var options = {
    	center: {
             lat: 10,
             lng: -11
    	},
    	zoom: 6,
    	mapTypeId: 'terrain'
    },
  
    element = document.getElementById('map1'),
	//Map
	map = new google.maps.Map(element, options),

	URL = "http://localhost:8080/api/organisationUnits.json?filter=level:eq:4&fields=[id,displayName,coordinates]&paging=false",

	json;
	console.debug("1 : Options et var crees ");

	map.data.loadGeoJson('js/custom/guinea.json');

     $.getJSON(URL, function(response){
	 //$.getJSON('js/custom/facilities.json', function(response){
	 	console.debug("2 : Debut de chargement des structures ");
       json = response;          

     for (var i = 0; i < json.organisationUnits.length; i++) {
            
          var str = json.organisationUnits[i].coordinates;

          if (typeof str != 'undefined' && str) {
            
            console.debug("1 : " + str);
            var test = str.substring(1, str.length-1);
            console.debug("2 : " + test);
            var coords = test.split(",");
            console.debug("3 : " + coords);
            console.debug("Lat : " + coords[1]);
            console.debug("Ln : " + coords[0]);
                     
                var la = parseFloat(coords[1]);
                var ln = parseFloat(coords[0]);
                var facility = {lat: la, lng: ln};
                var marker = new google.maps.Marker({
                     position: facility,
                     map: map
                     });
          }
      }
      console.debug("3 : Fin de chargement des structures ");

       }); 
	 console.debug("4 : Fin de la const du Map ");

}

 
  