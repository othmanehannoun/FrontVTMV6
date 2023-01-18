import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar , Image} from 'react-native';
import { WHITE, YELLOW_COLOR } from '../constants/StyleColor';
import pizza from '../../assets/images/pizza.png'


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Buy one get one free',
    image: require('../../assets/images/promo1.png')
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Get free delivery on next order',
    image: require('../../assets/images/promo1.png')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Buy one get one free',
    image: require('../../assets/images/promo1.png')
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Buy one get one free',
    image: require('../../assets/images/promo1.png')
  },
];

const Item = ({ data }) => (
    
  <View style={styles.item} key={data.id}>
    <View style={{padding: 10,width: '80%', position:'absolute'}}>
    <Text style={styles.title}>{data.title}</Text>
    </View>
        <Image source={data.image} 
        style={{width:120, 
          height: 200, 
          borderBottomLeftRadius:20,
          borderBottomRightRadius: 20
          }}
          />
       
    </View>
);

const Promo = () => {
  const renderItem = ({ item }) => (
    <Item data={item} />
  );

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
    backgroundColor: YELLOW_COLOR,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    color: WHITE,
  },
});

export default Promo;