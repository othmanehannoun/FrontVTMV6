import React , {useState,useEffect} from 'react';
import AppNavigation from './src/navigation/AppRoute'
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import NoConnectionScreen from "./src/screens/NoConnectionScreen";
import NetInfo from '@react-native-community/netinfo';


export default function App() {

  const [connectStatus,setConnectStatus] = useState(false)

  useEffect(() => {
    const data = NetInfo.addEventListener(state => {
      setConnectStatus(state.isConnected);
    });
  
    return () => {
      data()
    }
  }, [])
  

  return (
    connectStatus ?
      <Provider store={store}>
        <AppNavigation />
      </Provider>
      :
      
      <NoConnectionScreen />

      
  );
}



