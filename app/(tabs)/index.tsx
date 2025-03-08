import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Login from "../../app-temp/screens/Login";


const index = () => {
  return (
    <Login/>
    
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0D4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4B2E1E'
  }
});
