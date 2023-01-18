import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import io from 'socket.io-client';


const init = ({userId}) => {

    const [notification, setNotification] = useState(null)
    const request_DATA = {
        myId: "6295f35c1863ab01bc7546a2",
        myName: "ana li sayfat lik 2",
        friendId: "62baef7ddb6ce14ea83af50c",
        friendName: "sf chaft message dyalk 2"
    } 
    //console.log("IIIIIID", userId);

    const socket = io('http://192.168.0.133:3001', { transports: ['websocket'] });

    useEffect(() => {
      socket.emit("joinNotificationRoom", userId);

      socket.on('newFriendRequest', (data)=>{
        //   console.log('hadi hiya ntii:', data)

          setNotification(data)
          
      })
  

      // console.log('3AMAR LAYHAFDAK: ', notification)

    }, [])

    const sendEvent = () =>{
        socket.emit('sendFriendReques', request_DATA)
    }

  return (
    <View>
        <TouchableOpacity 
        onPress = {()=>{sendEvent()}}>
         <Text>SEND EVENT</Text>
        </TouchableOpacity>
      <Text>
          {
              notification == null ?
              <Text> No Notification </Text>
              :
              <>
                <Text>Rah {notification.name} sayfat lik Flos</Text>
              </>
          }
      </Text>
    </View>
  )
}

export default init

const styles = StyleSheet.create({})