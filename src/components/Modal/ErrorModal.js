import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'

const ModalPoup = ({visible, children}) => {

  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ErrorModal = ({visible, setVisible, message}) => {
    
  return (
    <View>
      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            {/* <TouchableOpacity onPress={() => setVisible(false)}>
              <Text>X</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Fontisto name='close' size={90} color={'#ee5253'}/>
        </View>
        <View style={{alignItems: "center", marginVertical: 30}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 22}}>Erreur!</Text>
            <Text style={{marginVertical: 10, fontSize: 18, textAlign: 'center'}}>
            {message}
            </Text>
        </View>
        <View style={{alignItems: 'center', }}>
          <TouchableOpacity style={styles.ModalBtn}
            onPress={() => setVisible(false)}
          >
              <Text style={{color: 'white', fontSize:15}}>Réessayer </Text>
              <View style={{backgroundColor: 'white', borderRadius: 50, padding: 2}}>
                 <Feather name='arrow-right' size={15} color={'#ee5253'}/>
              </View>
          </TouchableOpacity>
        </View>
      </ModalPoup>
      {/* <Button title="Open Modal" onPress={() => setVisible(true)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '70%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderEndColor: 'blue'
  },
  ModalBtn:{
      flexDirection: 'row',
      backgroundColor: '#ee5253',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10
  },
});

export default ErrorModal;