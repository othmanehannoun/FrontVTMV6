const html_script = `
<!DOCTYPE html>
<html>

<head>
	<title>Geolocation</title>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
	<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />

	<style>
		body {
			margin: 0;
			padding: 0;
		}
	</style>

</head>

<body>
	<div id="map" style="width:100%; height: 100vh"></div>
	<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"></script>
	<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>

	<script src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet/0.0.1-beta.5/esri-leaflet.js"></script>

    <script src="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.5/esri-leaflet-geocoder.css">


	<div id="map"></div>

	<script type="text/javascript">

	
	var map = L.map('map').setView([30.422611, -9.600002], 18);
	mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

	

	var marker = L.marker([30.422611, -9.600002]).addTo(map);


	// Control 2: This add a scale to the map
		L.control.scale().addTo(map);

	// Control 3: This add a Search bar
	
		var searchControl = new L.esri.Controls.Geosearch().addTo(map);

		var results = new L.LayerGroup().addTo(map);
		// alert(results)

		// searchControl.on('results', function(data){
		// 	// results.clearLayers();
		// 	for (var i = data.results.length - 1; i >= 0; i--) {
		// 	results.addLayer(L.marker(data.results[i].latlng));
		// 	alert(JSON.stringify(data.results[i]));
		// 	// var newMarker2 = L.marker([L.latLng(30.422611, -9.600002), data.results[i].latlng]).addTo(map);
		// 	L.Routing.control({
		// 		waypoints: [
		// 			L.latLng(30.422611, -9.600002),
		// 			data.results[i].latlng
		// 		],
		// 	}).addTo(map);

		// 	}
		// });

		// function getDistance(origin, destination) {
		// 	// return distance in meters
		// 	var lon1 = toRadian(origin[1]),
		// 		lat1 = toRadian(origin[0]),
		// 		lon2 = toRadian(destination[1]),
		// 		lat2 = toRadian(destination[0]);
		
		// 	var deltaLat = lat2 - lat1;
		// 	var deltaLon = lon2 - lon1;
		
		// 	var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
		// 	var c = 2 * Math.asin(Math.sqrt(a));
		// 	var EARTH_RADIUS = 6371;
		// 	return c * EARTH_RADIUS * 1000;
		// }
		// function toRadian(degree) {
		// 	return degree*Math.PI/180;
		// }
		// var distance = getDistance([32.300080, -9.229277], [32.297654, -9.227736])

		// alert(distance) 

		function distance(lat1,
			lat2, lon1, lon2)
{

			// The math module contains a function
			// named toRadians which converts from
			// degrees to radians.
			lon1 =  lon1 * Math.PI / 180;
			lon2 = lon2 * Math.PI / 180;
			lat1 = lat1 * Math.PI / 180;
			lat2 = lat2 * Math.PI / 180;

			// Haversine formula
			let dlon = lon2 - lon1;
			let dlat = lat2 - lat1;
			let a = Math.pow(Math.sin(dlat / 2), 2)
					+ Math.cos(lat1) * Math.cos(lat2)
					* Math.pow(Math.sin(dlon / 2),2);
				
			let c = 2 * Math.asin(Math.sqrt(a));

			// Radius of earth in kilometers. Use 3956
			// for miles
			let r = 6371;

			// calculate the result
			return(c * r);
			}

			// Driver code   
			
			let lat1 = 32.302370;
			let lat2 = 32.291183;
			let lon1 = -9.234320;
			let lon2 = -9.229994;
			alert(distance(lat1, lat2,
				  lon1, lon2) + " K.M");

		// alert(distance) 


</script>


</body>

</html>

`

export default html_script
