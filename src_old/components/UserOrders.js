import {
    StyleSheet, 
    RefreshControl, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    SafeAreaView, 
    FlatList,
    ActivityIndicator
} from 'react-native'
import React,{ useState, useEffect } from 'react'
import { windowHeight, windowWidth } from '../constants/Demonsions'
//import pollo from '../../../assets/images/calzon/Pollo.jpg'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUserID } from '../Redux/Slices/OrderSlice'


const UserOrder = ({navigation, userId}) => {

    console.log(userId)
  
    const [isFetching, setIsFetching] = useState(false);

    const dispatch = useDispatch()
    const {isLoading, user_order} = useSelector(state => state.order);

    useEffect(()=>{
        dispatch(getOrderByUserID(userId)) 
    }, [dispatch])

    const getDateOrder = (date)=>{
        let DateOrder = new Date(date);
        return DateOrder.getDate() + '/' + (DateOrder.getMonth() + 1) + '/' + DateOrder.getFullYear();
    }

    const getTimeOrder = (date)=>{
        let TimeOrder = new Date(date);
        return TimeOrder.getHours() + ':' + (TimeOrder.getMinutes()<10? '0':'') + TimeOrder.getMinutes();
    }

    const onPress = (id) =>{
        navigation.navigate('confimerOrder', {id})
    }
    
    const onRefresh = async () => {
        setIsFetching(true);
        await dispatch(getOrderByUserID(userId));
        setIsFetching(false);
    };
    
    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity style={{}} 
                onPress={()=>{onPress(item._id)}}
            >
                <View style={{...styles.box}}>
                    <View style={styles.item}>
                        <Text style={styles.Item_name}>{getDateOrder(item.createdAt)} -- {getTimeOrder(item.createdAt)}</Text>
                        <Text style={styles.Item_total}>{item.Delivery_Puckup}</Text>
                        <Text style={styles.Item_total}>Total: {item.totalPrice} DH </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
      };

    // <>
    //     {
    //         order.map( item => (
    //         <TouchableOpacity style={styles.container} 
    //          onPress={()=>{onPress(item._id)}}
    //         >
    //             <View style={{...styles.box}}>
    //                 <View style={styles.item}>
    //                     <Text style={styles.Item_name}>{getDateOrder(item.createdAt)} -- {getTimeOrder(item.createdAt)}</Text>
    //                     <Text style={styles.Item_total}>{item.Delivery_Puckup}</Text>
    //                     <Text style={styles.Item_total}>Total: {item.totalPrice} DH </Text>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //       ))
    //     }

   
    //   </>
   
  return (

        <SafeAreaView style={styles.container}>
            {
                isLoading ?
                <ActivityIndicator size="small" color={PRIMARY_COLOR} />
                :

                // user_order.lenght > 0 ?
                <FlatList
                    data={user_order}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    onRefresh={onRefresh}
                    refreshing={isFetching}
                />
                // :
                // <Text>No Order</Text>
            }
      
        </SafeAreaView>

  )
}

export default UserOrder

const styles = StyleSheet.create({
    container: {
        
    },

    item: {
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: LIGHT_COLOR,
    },

    // container:{
       
    //     width: '100%',
    //     backgroundColor: LIGHT_COLOR,
    //     padding: 5,
    //     paddingHorizontal: 10,
    //     marginBottom: 10
    //     // borderColor: WHITE,
    //     // borderWidth: 2
    // },
    box:{
        // width: '33.33%',
        padding: 5
    },
   
    Item_name:{
        fontSize: 19,
        color: WHITE,
        fontWeight: 'bold',
        marginBottom: 5
    },
    Item_total:{
        color: WHITE,
        fontWeight: 'bold',
        marginBottom: 5
    },
    Item_description:{
        color: PRIMARY_COLOR,
        fontSize: 8,
        marginBottom: 5
    },
    addButton:{
        flexDirection:'row',
        backgroundColor:LIGHT_COLOR,
        width:'70%', 
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    titleAdd:{
        color:WHITE, 
        fontWeight:'bold'
    }
})