import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import Boton from '../app-temp/components/Boton'

const index = () => {
    const ruta= useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo} >FakeStore...</Text>
        <Boton onPress={()=>ruta.push('./(tabs)/')} titulo='Login'/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F8BBD0',
        alignItems:'center',
        justifyContent:'center'
    },
    titulo:{
        fontSize:30,
        fontWeight:'bold',
        color:'#D10078'
    },
    link:{
        color:'#FF6F61',
        fontSize:20
    }
})