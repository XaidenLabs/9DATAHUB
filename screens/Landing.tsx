import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';

const Landing = ({navigation}: {navigation:any}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Login');
        }, 3000);
    
    
    
        return () => clearTimeout(timer);
      }, [navigation]);
  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.logo}>
      <Ionicons name="logo-apple-ar" size={50} />
      </TouchableOpacity>
      <Text style={styles.motto}>Data Plug</Text>
      <Text style={styles.submotto}>Sure Plug for sure plans</Text>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    body:{
backgroundColor: "#1e90ff",
flex: 1,
justifyContent: 'center',
// padding: 10,
    },
    motto:{
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
    },
    submotto:{
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'center',
        marginTop:5,
        color: '#fff',
        },
    logo:{
    alignItems: 'center'
        },

})