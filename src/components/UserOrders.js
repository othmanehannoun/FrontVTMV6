import React,{ useState, useEffect } from 'react'
import { 
StyleSheet, 
ActivityIndicator, 
RefreshControl, 
Text, 
View, 
Image, 
TouchableOpacity, 
ScrollView,
SafeAreaView, 
FlatList,
Dimensions
} from 'react-native'

import { windowHeight, windowWidth } from '../constants/Demonsions'
//import pollo from '../../../assets/images/calzon/Pollo.jpg'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'

import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUserID } from '../Redux/Slices/OrderSlice'
const width = Dimensions.get('window').width / 2 - 30;

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
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>{onPress(item._id)}}
                >
                <View style={styles.order}>
                    <Text style={styles.Item_name}>{getDateOrder(item.createdAt)} -- {getTimeOrder(item.createdAt)}</Text>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 5,
                        }}>
                        
                        <Text style={styles.Item_total}>{item.Delivery_Puckup}</Text>

                        <View
                            style={{
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                backgroundColor: WHITE,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{...styles.Item_total, color: LIGHT_COLOR}}>Total: {item.totalPrice} DH </Text>
                        </View>

                        
                        
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
   
  return (

    <>
        {
            isLoading ?
            <ActivityIndicator size="small" color={PRIMARY_COLOR} />
            :
            <FlatList
                //columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                marginTop: 10,
                paddingBottom: 50,
                }}
                data={user_order}
                renderItem={renderItem}
                onRefresh={onRefresh}
                refreshing={isFetching}
            />
            // :
            // <Text>No Order</Text>
        }
    
    </>

  )
}

export default UserOrder

const styles = StyleSheet.create({
    order: {
        backgroundColor: LIGHT_COLOR,
        width: "100%",
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 3,
      },
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