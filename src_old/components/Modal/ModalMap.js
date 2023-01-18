// import React,{useEffect, useState} from 'react'
// // import { StyleSheet, Text, View,Modal,TextInput,TouchableWithoutFeedback, Dimensions } from 'react-native'
// import { PRIMARY_COLOR } from '../../constants/StyleColor'
// import Button from '../Button'
// import Input from '../Input'
// import {
//   StyleSheet, 
//   Modal,
//   TouchableWithoutFeedback,
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Pressable
// } from 'react-native';

// import {
//   WebView
// } from 'react-native-webview'

// import html_script from '../../constants/html_script'
// import GoogleMaps from '../../screens/GoogleMaps'
// const ModalMap = ({isOpenedModal, setIsOpenedModal}) => {

//   const refContainer = React.createRef(null);

//     return (
//       <Modal
//         visible={isOpenedModal}
//         transparent
//         animationType="fade"
//         onRequestClose={() => {
//           setIsOpenedModal(false);
          
//         }}
//       >
//       <View style={styles.centredModel}>
//         <View style={[styles.modalContainer]}>
//           <View
//             style={{
//               position: "absolute",
//               right: 10,
//               top: 10,
//             }}
//           >
//             <TouchableOpacity
//               onPress={() => {
//                 setIsOpenedModal(false);
                
//               }}
//               //style={{ backgroundColor: "red" }}
//             >
//               <View>
//                 <Text>hh</Text>
//                 {/* <Icon name="times-circle" size={30} color={PRIMARY_COLOR} /> */}
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View>
//             <Text>jjjjjjjj</Text>
//             <GoogleMaps />
//           </View>
//         </View>
//       </View>
//     </Modal>


//       //   <Modal
//       //       visible={isOpenedModal}
//       //       transparent
//       //       onRequestClose={() => setIsOpenedModal(false)}
//       //   >
//       //     <Text>heloooo</Text>
//       //   {/* <TouchableWithoutFeedback
//       //     onPress={() => {
//       //       setIsOpenedModal(false);
//       //     }}
//       //   >
//       //      <View style={{
//       //       flex : 1,
//       //       backgroundColor: "#000000AF",
//       //       justifyContent: 'flex-end',

//       //       }}>

//       //       <View style={styles.modalContainer}>



//       //       <View style={styles.centeredView}>

//       //         <GoogleMaps />
                   
           

//       //       <Button 
//       //       // title={!isLoading ? 'Ajouter' : 'Loading ...'}
//       //       title={'Valider'}
//       //       // onPress={handelValidate}
//       //       />
                        
                     
//       //        </View>
//       //       </View>
//       //     </View>
//       //   </TouchableWithoutFeedback> */}
//       // </Modal>
//     )
// }

// export default ModalMap

// const styles = StyleSheet.create({
//     //------------------ Modal -------------------------
//     modalContainer: {
//       padding: 10,
//       borderRadius: 30,
//       flexDirection: "column",
//       justifyContent: "center",
//       backgroundColor: 'red',
//       width: "95%",
//       height: "95%",
//     },
//     centredModel: {
//       flex: 1,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#00000070",
//     },
  
//     headerText: {
//       alignSelf: "center",
//       alignItems: "center",
//     },
  
//     buttonText: {
//       color: 'red',
//       fontWeight: "bold",
//     },
//     generatePDFButton: {
//       alignSelf: "center",
//       alignItems: "center",
//       justifyContent: "center",
//       borderRadius: 50,
//       paddingVertical: 10,
//       paddingHorizontal: 30,
//       marginHorizontal: 10,
//       marginVertical: 10,
//       backgroundColor: 'blue',
//     },

// })


import React, {useState, useEffect} from 'react';
import { View, Button, Modal, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import html_script from '../../constants/html_script'

const ModalMap = ({isOpenedModal, setIsOpenedModal, setDataClinet}) => {

    const [test, setTest] = useState(null);
   
    const onMessage = async(data)=> {
        const userData = JSON.parse(data.nativeEvent.data)
        // console.log(userData)
        await setDataClinet(userData);
        setIsOpenedModal(false)
    }

    
//   const handelValidate = () =>{
//     setIsOpenedModal(false)
//   }
   
        return(
            <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>

                <Modal visible={isOpenedModal}
                    transparent
                    onRequestClose={() => setIsOpenedModal(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
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
                   <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    
                   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                   crossorigin=""/>
                   <link rel="stylesheet" href="leaflet-routing-machine.css" />
                   <title>Document</title>
               
                   <style>
                      
                       #map {
                        width: 100%;
                        height: 630px;
                       }
                   </style>
               </head>
               <body>
               <input type="hidden" id="aa" value=null>
               <input type="hidden" id="bb"  value=null>
               <input type="hidden" id="cc"  value=null>
               <div id="map"></div>
               <button
               onclick="sendDataToReactNativeApp()"
               style="
                   padding: 10px;
                   width: 200;
                   font-size: 20;
                   color: white;
                   background-color: #6751ff;
               "
               >
               Accepter
               </button>

               
               <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                 integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                 crossorigin=""></script>
                 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                 <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
                 <script src="leaflet-routing-machine.js"></script>
                <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>

                 <script>
               
                 const sendDataToReactNativeApp = async () => {

                   let lat = document.getElementById("aa").value;
                   let lng = document.getElementById("bb").value;
                   let val3 = document.getElementById("cc").value;
                   let min_distance = val3 * 3

                   let UserData = {
                     lat: lat,
                     lng: lng,
                     distance: min_distance.toFixed(2)
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
                   
                   var map = L.map('map').setView([30.422611, -9.600002], 16);
                   
                   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   }).addTo(map);
                   var geocoder = L.Control.geocoder({
                    defaultMarkGeocode: false
                  })
                    .on('markgeocode', function(e) {
                      var bbox = e.geocode.bbox;
                      var poly = L.polygon([
                        bbox.getSouthEast(),
                        bbox.getNorthEast(),
                        bbox.getNorthWest(),
                        bbox.getSouthWest()
                      ]).addTo(map);
                      map.fitBounds(poly.getBounds());
                    })
                    .addTo(map);

                   
                   var marker = L.marker([30.422611, -9.600002]).addTo(map);

                  

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
                                         
                     const distance = getDistanceFromLatLonInKm(e.latlng.lat, e.latlng.lng, 30.422611, -9.600002)
                       // alert("AA:" + e.latlng.lat + "BB:" + e.latlng.lng + "CC:" + distance)

                       document.getElementById("aa").value = e.latlng.lat;
                       document.getElementById("bb").value = e.latlng.lng;
                       document.getElementById("cc").value = distance;
                    
                   
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

                            {/* <Button 
                              title='Ajouter'
                              onPress={handelValidate}
                            /> */}
                           
                        </View>
                        
                    </View>
                </Modal>
            </View>
        )
}
const styles = StyleSheet.create({
    modal : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer : {
        backgroundColor : 'white',
        width : '95%',
        height : '95%',
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
})
export default ModalMap
