import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Text, ImageBackground, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator-v2';
import { windowHeight, windowWidth } from '../constants/Demonsions';
// import TrackOrder from '../../assets/images/TrackOrder.png'
import TrackOrder from '../../assets/images/masques.png'
import { PRIMARY_COLOR, SECONDARY_COLOR, LIGHT_COLOR, WHITE} from '../constants/StyleColor'

    const labels = ["Confirmed", "Cooking", "On The Way", "Dekivered", "Delivery"];
    const customStyles = {
        // stepIndicatorSize: 2,
        // currentStepIndicatorSize: 30,
        // separatorStrokeWidth: 2,
        // currentStepStrokeWidth: 3,
        // stepStrokeCurrentColor: '#fe7013',
        // stepStrokeWidth: 2,
        // stepStrokeFinishedColor: '#fe7013',
        // stepStrokeUnFinishedColor: '#aaaaaa',
        // separatorFinishedColor: '#fe7013',
        // separatorUnFinishedColor: '#aaaaaa',
        // stepIndicatorFinishedColor: '#fe7013',
        // stepIndicatorUnFinishedColor: '#ffffff',
        // stepIndicatorCurrentColor: '#ffffff',
        // stepIndicatorLabelFontSize: 13,
        // currentStepIndicatorLabelFontSize: 13,
        // stepIndicatorLabelCurrentColor: '#fe7013',
        // stepIndicatorLabelFinishedColor: '#ffffff',
        // stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        // labelColor: '#999999',
        // labelSize: 15,
        // currentStepLabelColor: '#fe7013'
        stepIndicatorSize: 25,
        currentStepIndicatorSize:30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013'
      }

export default function TrackYourOrder({navigation, route}){

    const data = route.params.order.status

    // useEffect(()=>{

    // }, [])
    
   const [currentPosition, setCurrentPosition] = useState(null)

   useEffect(()=>{

    //  onPageChange();
    //  console.log('ffff', data)

      if(data == 'null'){
        setCurrentPosition(0)
      }
      if(data == 'Confirmed'){
        setCurrentPosition(1)
      }
      if(data == "Cooking"){
        setCurrentPosition(2)
      }
      if(data == "On The Way"){
        setCurrentPosition(3)
      }
      if(data == "Dekivered"){
        setCurrentPosition(4)
      }
      if(data == "Delivery"){
        setCurrentPosition(5)
      }

   }, [data])


   const onPageChange = ()=>{
       if(data == 'Confirmed'){
        setCurrentPosition(0)
       }
       if(data == "Cooking"){
        setCurrentPosition(1)
       }
       if(data == "On The Way"){
        setCurrentPosition(2)
       }
       if(data == "Dekivered"){
        setCurrentPosition(3)
       }
       if(data == "Delivery"){
        setCurrentPosition(4)
       }
    // setCurrentPosition(position);
   }
    
      return (
          <View style={styles.container}>
              <ImageBackground source={TrackOrder} resizeMode={'cover'} style={styles.backgroundImage}>
                  <View>
                      <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: 20}}>Tracking</Text>
                       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                           <Text>Order number</Text>
                           <Text>2265Z487</Text>
                       </View>
                  </View>
                <View style={styles.indicatorStyle}>
                <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                        labels={labels}
                        direction= 'vertical'
                    />
                </View>

                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.bottomButton}
                    onPress={()=>{navigation.navigate('home')}}>
                       
                        <Text style={{color:WHITE, fontWeight: 'bold', fontSize: 18}}>HOME</Text>
                        
                    </TouchableOpacity>
                </View>

              </ImageBackground>
              
          </View>
       
      )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
    // justifyContent: 'center',
    // alignContent: 'center'
  },
  indicatorStyle: {
    flex: 1,
    // height: windowHeight - 150,
    // width: windowWidth - 30,
    padding: 60,
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#0000'
  },
  bottomView: {
    width: windowWidth,
    padding: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0, 
    },
    bottomButton:{
        padding: 15,
        borderRadius: 10,
        width: '100%',
        backgroundColor:LIGHT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#52006A',

    },
  backgroundImage:{
    flex: 1,
    padding: 20
    // backgroundColor: 'black',
    // opacity: 0.6
      
  }
});



