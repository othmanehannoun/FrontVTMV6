import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity , Image} from 'react-native';
import { LIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE, YELLOW_COLOR } from '../constants/StyleColor';
import pizza from '../../assets/images/pizza.png'
import { color } from 'react-native-reanimated';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Thai Planet',
    time: '20-30 min',
    title2: 'Assian-Salads-Spring rolls',
    image: require('../../assets/images/Rectangle.png')
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Thai Planet',
    time: '20-30 min',
    title2: 'Assian-Salads-Spring rolls',
    image: require('../../assets/images/Rectangle.png')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Thai Planet',
    time: '20-30 min',
    title2: 'Assian-Salads-Spring rolls',
    image: require('../../assets/images/Rectangle.png')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Thai Planet',
    time: '20-30 min',
    title2: 'Assian-Salads-Spring rolls',
    image: require('../../assets/images/Rectangle.png')
  },
];

const Item = ({ data, onPress}) => (
    
  <TouchableOpacity 
  onPress={onPress}
  style={styles.item} key={data.id}>
    <Image source={data.image} 
    style={{width:250, 
    height: 100, 
    borderTopLeftRadius:20,
    borderTopRightRadius: 20,
    }}
    />

   <View style={{padding: 10}}>
      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.titleInfo}>{data.time}</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={styles.titleInfo}>{data.title2}</Text> 
        <Text style={styles.titleInfo}>4.9</Text>
      </View>
    
       
   </View>
        
    </TouchableOpacity>
);

const Ussuals = ({onPress}) => {

  const renderItem = ({ item }) => (
    <Item data={item} onPress={onPress}/>
  );
console.log(onPress);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
//   container: {
//     marginTop: StatusBar.currentHeight || 0,
//   },
  item: {
    backgroundColor: WHITE,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  titleInfo:{
    color: LIGHT_COLOR,
    fontWeight: 'bold'
  }
});

export default Ussuals;