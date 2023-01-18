import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView} from 'react-native'
import { LIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/StyleColor'
import { Searchbar } from 'react-native-paper';
import masques from '../../assets/images/masques.png'
import Promo from '../components/Promo';
import Ussuals from '../components/Ussuals';
import Footer from '../components/Footer';



const MenuScreen = ({navigation}) => {
    const [search, setSearch] = useState(null)

    const handlePress = () =>{
        navigation.navigate('details')
    }
    
    const handleSearch = (text) =>{
        setSearch(text)
    }
  return (
    <View style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1, padding:20}}>
    
        <Text style={{...styles.title, fontSize:25}}>
            Dubai, Media City
        </Text>

        <View >
            <Searchbar 
            style={styles.searchBar}
            placeholder="Search for restaurant"
            placeholderTextColor={LIGHT_COLOR}
            iconColor={LIGHT_COLOR}
            onChangeText={(text) => handleSearch(text)}
            value={search}
            />
        </View>

        <View style={{marginBottom: 20}}>
            <Text style={styles.title}>
                Promo
            </Text>
            <Promo />
        </View>

        <View style={{marginBottom: 20}}>
            <Text style={styles.title}>
               Your Ussuals
            </Text>
            <Ussuals 
            onPress = {handlePress}
            />
        </View>

        <Text style={styles.title}>
            Free Delivery
        </Text>

        <Footer />
        </ImageBackground>

        
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        color: PRIMARY_COLOR, 
        marginBottom: 10,
        fontSize: 20, 
        fontWeight: 'bold',
    },
    searchBar:{
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 50,
        marginBottom: 20
    }
})