// import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { increment, decrement, login, logout} from '../Redux/Actions/actions'



//  const TestReduxApp = () => {

//      const dispatch = useDispatch()
//      const value = useSelector(state => state.count.value)
//      const isLogged = useSelector(state => state.logged.logged)

//   return (
//     <View>
      
//       <TouchableOpacity onPress = {() => dispatch( increment() )} style={styles.button} >
//         <Text>Increment</Text>
//       </TouchableOpacity>

//       <Text> {value} </Text>

//       <TouchableOpacity onPress = {()=> dispatch( decrement() )} style={styles.button} >
//         <Text>Dencriment</Text>
//       </TouchableOpacity>

//       <View>
//       {
//           isLogged ? 
//             <TouchableOpacity onPress = {()=> dispatch( login() )} style={styles.button} >
//                 <Text>LOGIN</Text>
//             </TouchableOpacity>
//       :

//             <TouchableOpacity onPress = {()=> dispatch( logout() )} style={styles.button} >
//                 <Text>LOGOUT</Text>
//             </TouchableOpacity>

//       }
//       </View>
//     </View>
//   )
// }

// export default TestReduxApp

// const styles = StyleSheet.create({
//     container :{
//       flex: 1,
//       padding:10, 
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     button: {
//       width: '100%',
//       backgroundColor: 'yellow',
//       alignItems: 'center',
//       borderRadius: 20,
//       padding: 15
      
//     }
//   })






















import { StyleSheet, Text, View, FlatList} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
// import { getProduct } from '../Redux/Slices/CategorySlice'
// import axios from 'axios'


 const TestReduxApp = () => {

  //  const dispatch = useDispatch()
  //  const {isLoading, category} = useSelector(state => state.category) 
 
  // useEffect(()=>{
  //   dispatch(getProduct())
  // }, [dispatch])

 


  // const [data, setData] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  // const getMovies = async () => {
  //    try {
  //     const response = await fetch('https://reactnative.dev/movies.json');
  //     const json = await response.json();
  //     setData(json.movies);
  //     console.log('LA ZONE: ', json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getMovies();
  // }, []);

  return (
    // <View style={{ flex: 1, padding: 24 }}>
    //   {isLoading ? <ActivityIndicator/> : (

    //     <>
    //     {data.map((item)=>
    //     (
    //       <Text>{item.title}, {item.releaseYear}</Text>
    //     )
    //     )}
    //     <FlatList
    //       data={data}
    //       keyExtractor={({ id }, index) => id}
    //       renderItem={({ item }) => (
    //         <Text>{item.title}, {item.releaseYear}</Text>
    //       )}
    //     />
    //     </>
    //   )}
    // </View>

    <>
    {

    isLoading ? 
    <Text>Loading ...</Text>
    :
  
      
        // product.map((item) =>
        //   (
        //   <Text>Hello: {item.email}</Text>
        //   )
        //  )

        <>
        
       {
         category.map((item, index) =>
          (
          <Text key={index}>Hello: {item.name}</Text>
          )
         )
       }
        </>

     
    }
    </>
  )
}

export default TestReduxApp

const styles = StyleSheet.create({
    container :{
      padding:10, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red'
    },

  })