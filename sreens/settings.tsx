import React from 'react'
import { View, Text } from 'react-native'

export default function SettingsScreen() {
  return (
    <View style={{
      flex:1,
      backgroundColor: '#936',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{fontSize: 30, color: '#fff'}}>Settings screen</Text>
    </View>
  )
}
