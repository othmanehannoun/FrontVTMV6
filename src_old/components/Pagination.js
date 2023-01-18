import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, LogBox} from 'react-native'
import { windowHeight } from '../constants/Demonsions'
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import driot from '../../assets/images/droit.png'
import gouche from '../../assets/images/gouche.png'
import { endPoint } from '../constants/GlobaleVariables';
import { useDispatch, useSelector } from 'react-redux';
 

const Pagination = ({setItemId, itemKey}) => {

  const {category} = useSelector(state => state.category) 

  const [Id, setId] = useState(null)
  const [catName, setCatName] = useState(null)
  const [index, setIndex] = useState(null);
  const refContainer = React.createRef(null); 



  useEffect(()=>{
    LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component"]);
  },[])

  useEffect(()=>{
    setIndex(itemKey)
  },[itemKey])

  useEffect(()=>{
    setItemId(Id, catName)
  },[Id])

  const renderItem = ({ item, index: fIndex}) => (
    <>
   
    {
      index == fIndex ? 
      (
        setId(item._id),
        setCatName(item.name)
      )
     
      :
      null
    }

    <View style={{...styles.box,
      marginHorizontal: 10,
      width: 100,
      flex: 1, 
      paddingVertical: 10,
      justifyContent: 'center', 
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 20,
      borderColor: PRIMARY_COLOR,
      }}
    >
        <Image 
          source={{
            uri: `${endPoint}/${item.img}`
          }} 
          style={{width:100, height: 70}}
        />

        <Text style={{color:PRIMARY_COLOR,fontWeight:'bold'}}>{item.name}</Text>
 
    </View>
    </>

  );

    useEffect(()=>{ 
      let isMounted = true;
      refContainer.current?.scrollToIndex({ index: index, animation: true,viewPosition: 1 });
      // refContainer.current?.scrollToIndex({
      //   index,
      //   animation: true,
      //   viewPosition: 1,
      // })
      return () => { isMounted = false };
  },[index])

  const scrollToIndexFailed = (error)=> {
    const offset = error.averageItemLength * error.index;
    refContainer.current?.scrollToOffset({offset});
    setTimeout(() => refContainer.current?.scrollToIndex({ index: error.index }), 100); // You may choose to skip this line if the above typically works well because your average item height is accurate.
  }

  return (
    <View style={styles.container}>
        <View style={styles.box}>
            
          <TouchableOpacity style={styles.paginationIcon}
           onPress={()=>{
            if(index == 0){
              return
            }
            setIndex(index - 1)
            
          }}>
            
            <Image source={driot} style={{width: 100, height: 100}}/>
          </TouchableOpacity>
       </View>

          <SafeAreaView style={{
              width: 120
              }}
          >
           
          <FlatList
            ref={refContainer}
            initialScrollIndex={index}
            horizontal
            data={category}
            renderItem={renderItem.bind()}
            // keyExtractor={(item, index) => index}
            onScrollToIndexFailed={scrollToIndexFailed.bind()}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
           
          </SafeAreaView>
        
        <View style={styles.box}>
            
            <TouchableOpacity style={styles.paginationIcon}
              onPress={()=>{
                if(index == category.length - 1){
                  return
                }
                setIndex(index + 1)
                
              }}
            >
                
              <Image source={gouche} style={{width: 100, height: 100}}/>
            </TouchableOpacity>
        </View>
    
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})