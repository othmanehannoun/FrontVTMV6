import NetInfo from '@react-native-community/netinfo';
export const checkConnected = ()=>{
    // alert('check your connection')
    // return NetInfo.fetch().then(state => {
    //     // console.log('Connection type', state.type);
    //     // console.log('Is connected?', state.isConnected);
    //     return state.isConnected;
    //   });

    return NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        // return state.isConnected
      });
      
      // Unsubscribe
    //   unsubscribe();

}