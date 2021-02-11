import React from 'react'
import { View, Text } from 'react-native'
import NeumorphismView from '../components/neomorphism-view'
import MaskedView from '@react-native-masked-view/masked-view';

// TODO: create newmorphism component
export default function HomeScreen() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#369',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{ fontSize: 30, color: '#fff' }}>Home screen</Text>
      <NeumorphismView size={100} />
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 60,
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              ALGERIA
            </Text>
          </View>
        }
      >
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <View style={{ flex: 1, height: '100%', backgroundColor: '#090' }} />
        <View style={{ width: 50, height: '100%', backgroundColor: '#F00' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#FFF' }} />
      </MaskedView>
    </View>
  )
}
