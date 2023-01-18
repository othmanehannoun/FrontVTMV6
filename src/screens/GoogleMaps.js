// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';


// import {
//   WebView
// } from 'react-native-webview'

// import html_script from '../constants/html_script'

// const App = () =>{

//   const refContainer = React.createRef(null);

// //   const _goToMyPosition = (lat, lon) => {
// //     refContainer.current?.injectJavaScript(`
// //       mymap.setView([${lat}, ${lon}], 10)
// //       L.marker([${lat}, ${lon}]).addTo(mymap)
// //     `)
// //   }
// //   render() {
//     return (
//       <>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView style={styles.Container}>
//           <WebView ref={refContainer} source={{html: html_script }} style={styles.Webview} />
//           <View style={styles.ButtonArea}>
//             <TouchableOpacity style={styles.Button} onPress={() => _goToMyPosition(30.422611, -9.600002)}>
//               <Text style={styles.ButtonText}>Belgrade</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.Button} onPress={() => _goToMyPosition(35.6804, 139.7690)}>
//               <Text style={styles.ButtonText}>Tokyo</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.Button} onPress={() => _goToMyPosition(40.4168, -3.7038)}>
//               <Text style={styles.ButtonText}>Madrid</Text>
//             </TouchableOpacity>
            
//           </View>
//         </SafeAreaView>
//       </>
//     );
// //   }
  
// };

// const styles = StyleSheet.create({
//   Container: {
//     flex:1,
//     padding: 10,
//     backgroundColor: 'grey'
  
//   },
//   Webview: {
//     flex: 2,
    
//   },
//   ButtonArea: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center'
//   },
//   Button: {
//     width: 80,
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: 'black',
//     alignItems: 'center'
//   },
//   ButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 14,
//   }
// });

// export default App;


// import { StyleSheet, Text, View, Button } from "react-native";
// import React, { useEffect } from "react";
// import { LatLng, LeafletView } from "react-native-leaflet-view";

// const DEFAULT_COORDINATE = { lat: 30.422611,  lng: -9.600002, };

// export default function Home({ navigation }) {
    

//   return (
//     <View style={styles.container}>
//       <View style={styles.myMap}>
//         <LeafletView
//          mapMarkers={[ { position: DEFAULT_COORDINATE, icon: '📍', size: [32, 32], },]}
//           mapCenterPosition={DEFAULT_COORDINATE}

//         //   mapLayers={[
//         //     {
//         //       baseLayerName: "MapTiler",
//         //       baseLayerIsChecked: "true",
//         //       baseLayer: "true",
//         //       url: "https://a.tile.openstreetmap.de/tiles/osmde/{30.422611}/{-9.600002}/{-9.600002}.png",
//         //     },
//         //   ]}
          
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffd",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   myMap: {
//     flex: 2,
//     backgroundColor: "white",
//     width: "100%",
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });







































import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {
  WebView
} from 'react-native-webview'

import html_script from '../constants/html_script'

const GoogleMaps = () =>{
  const [test, setTest] = useState(null);
   

  const onMessage = (data)=> {
    const userData = JSON.parse(data.nativeEvent.data)
    console.log(userData)
    setTest(userData);
  }

    return (
      <>
        <SafeAreaView style={{flex: 1}}>

            {
              test == null ?
              <Text>MMMMMM</Text>
              :
              <>
                <Text>lat: {test.val1}</Text>
                <Text>lng: {test.val2}</Text>
                <Text>Disance: {test.val3} KM</Text>
              </>
            }

            <WebView
               
                onMessage={onMessage}
                source={{
                html: ` 
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossorigin=""/>
                    <title>Document</title>
                
                    <style>
                       
                        #map {
                            height: 300px; 
                            width: 100%;
                        }
                    </style>
                </head>
                <body>
                <input id="aa" value=null>
                <input id="bb"  value=null>
                <input id="cc"  value=null>
                <div id="map"></div>
                <button
                onclick="sendDataToReactNativeApp()"
                style="
                    padding: 20;
                    width: 200;
                    font-size: 20;
                    color: white;
                    background-color: #6751ff;
                "
                >
                Send Data To React Native App
                </button>

                
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                  integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                  crossorigin=""></script>
                  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

                  <script>
                
                  const sendDataToReactNativeApp = async () => {

                    let val1 = document.getElementById("aa").value;
                    let val2 = document.getElementById("bb").value;
                    let val3 = document.getElementById("cc").value;

                    let UserData = {
                      val1: val1,
                      val2: val3,
                      val3: val3
                    }

                    window.ReactNativeWebView.postMessage(JSON.stringify(UserData));

                    
                  };
                </script>

                  <script>
                 
                    let currentLat
                    let currentLong
                    
                    navigator.geolocation.getCurrentPosition(function(position) {
                        currentLat = position.coords.latitude.toFixed(2);
                        currentLong = position.coords.longitude.toFixed(2);
                    
                    });
                    
                    var map = L.map('map').setView([30.403083, -9.528466], 13);
                    
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);
                  
                    
                    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) { 

                      var R = 6371; // Radius of the earth in km
                      var dLat = deg2rad(lat2-lat1);  // deg2rad below
                      var dLon = deg2rad(lon2-lon1); 
                      var a = 
                        Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2)
                        ; 
                      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
                      var d = R * c; // Distance in km
                      return d;
                    }
                    
                    function deg2rad(deg) {
                      return deg * (Math.PI/180)
                    }

                    var popup = L.popup();
                    
                    function onMapClick(e) {  
                                          
                      const distance = getDistanceFromLatLonInKm(e.latlng.lat, e.latlng.lng, 30.403083, -9.528466)
                        // alert("AA:" + e.latlng.lat + "BB:" + e.latlng.lng + "CC:" + distance)

                        document.getElementById("aa").value = e.latlng.lat;
                        document.getElementById("bb").value = e.latlng.lng;
                        document.getElementById("cc").value = distance;
                        

                        let data = {
                          aa : e.latlng.lat,
                          bb : e.latlng.lng,
                          cc : distance,
                        }

                        // alert(JSON.stringify(data))

                    
                      
                    
                        popup
                            .setLatLng(e.latlng)
                            .setContent("You clicked the map at " + e.latlng.toString())
                            .openOn(map);
                    }
                    
                    map.on('click', onMapClick);
                      </script>
                    </body>
                    </html>     
                    `,
                    }}
            />
    </SafeAreaView>
      </>
    );

};

export default GoogleMaps
// const styles = StyleSheet.create({
//   Container: {
//     flex:1,
//     padding: 10,
//     backgroundColor: 'grey'
  
//   },
//   Webview: {
//     flex: 2,
    
//   },
//   ButtonArea: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center'
//   },
//   Button: {
//     width: 80,
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: 'black',
//     alignItems: 'center'
//   },
//   ButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 14,
//   }
// });