import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import TabItem from '../components/tab-item';
import TabMenuBar from '../components/tab-menu';
import HomeScreen from '../sreens/home';
import NewsScreen from '../sreens/news';
import SettingsScreen from '../sreens/settings';

const Tab = createBottomTabNavigator();
export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='home'
      tabBarOptions={{
        activeTintColor: '#67d',
        inactiveTintColor: '#459',
        labelStyle: {
          fontSize: 17,
          fontWeight: '800',
          textTransform: 'uppercase'
        },
      }}
      sceneContainerStyle={{
        position: 'relative'
      }}
      tabBar={(props) => <TabMenuBar {...props} />}
    >
      <Tab.Screen options={{
        tabBarButton: props => (<TabItem label='news' {...props} />)
      }} name='news' component={NewsScreen} />
      <Tab.Screen name='home' component={HomeScreen} />
      <Tab.Screen name='settings' component={SettingsScreen} />
    </Tab.Navigator>
  )
}
