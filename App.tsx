import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import BottomTabsNavigator from './menus/bottom-tabs';

export default function App() {
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <StatusBar style='light' />
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </View>
  );
}
