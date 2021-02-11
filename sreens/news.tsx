import React from 'react'
import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';

export default function NewsScreen() {
  return (
    <View style={{
      flex:1,
      backgroundColor: '#396',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{fontSize: 30, color: '#fff'}}>News screen</Text>
    </View>
  )
}
