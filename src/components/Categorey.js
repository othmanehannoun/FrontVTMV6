import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity , Image} from 'react-native';
import { PRIMARY_COLOR, WHITE, YELLOW_COLOR } from '../constants/StyleColor';
import { windowHeight } from '../constants/Demonsions';
import { endPoint } from '../constants/GlobaleVariables';
// import { useDispatch, useSelector } from 'react-redux'


const Categorey = ({onPress, category}) => {
  // const {isLoading, category, subCategory, error} = useSelector(state => state.category);
 
  const renderItem = ({ item, index }) => (
   
    <>
     {/* {
      console.log('eeeeeeee', index)
    } */}
   <TouchableOpacity style={styles.box}
    onPress= {()=>{onPress(item._id, item.name, index)}}
   >
        <View style={styles.item}>
            <Image 
            source={{
              uri: `${endPoint}/${item.img}`,
            }}

            style={{width:100, 
              height: 100, 
              resizeMode: 'contain'
            }}
            />
            <Text style={{
              marginBottom: 10,
              fontSize: 18, 
              fontWeight: 'bold',
              textTransform: 'uppercase'
              }}
            >
              {item.name}
            </Text>
        </View>

   </TouchableOpacity>
   </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={category}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.65
  },
  box: {
    width: '50%',
    justifyContent: 'center',
    alignItem: 'center',
    borderRadius: 20,
    padding: 15
  },
  item: {
    flex: 1,
    justifyContent:'center', 
    alignItems:'center',
    borderRadius: 20,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
   
  },
  title: {
    fontWeight: 'bold',
    color: WHITE,
  },
});

export default Categorey;
