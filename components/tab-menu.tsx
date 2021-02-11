import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { block, Clock, cond, eq, Value, set, useCode } from 'react-native-reanimated';
import runTiming from '../utils/animation';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const BOTTOM_TAB_MARGIN = 20;
const BOTTOM_TAB_RADIUS = 15;

const BG_COLORS = {
  news: '#396',
  home: '#369',
  settings: '#936',
};
const SHADOW_COLORS = {
  news: '#053',
  home: '#035',
  settings: '#503',
};
export default function TabMenuBar({ state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const routeName = state.routeNames[state.index];
  const [tap, setTap] = useState(false);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={[
        style.container,
        {
          backgroundColor: BG_COLORS[routeName] || 'pink',
          shadowColor: SHADOW_COLORS[routeName],
          borderColor: BG_COLORS[routeName],
        }
      ]}>
      <View style={[
        style.topShadow,
        {
          backgroundColor: BG_COLORS[routeName] || 'transparent',
        }
      ]} />
      <View style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
      }}>
        {
          state.routes.map((route: any, index: any) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (<Tab key={index} {...{ onLongPress, onPress, isFocused, label, options }} />);
          })
        }
      </View>
    </View>
  );
}

function Tab({ onLongPress, onPress, isFocused, label, options }: any) {

  return (
    <View style={{ flex: 1, }}>
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
        <Animated.View style={[
          style.indicator,
        ]} />
      </View>
      <TouchableWithoutFeedback
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: isFocused ? '#b77af7' : '#fff', fontSize: 17, fontWeight: '700', textTransform: 'uppercase' }}>
          {label}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 80,
    marginHorizontal: BOTTOM_TAB_MARGIN,
    position: 'absolute',
    bottom: BOTTOM_TAB_MARGIN,
    width: SCREEN_WIDTH - 40,
    borderTopStartRadius: BOTTOM_TAB_RADIUS,
    borderTopEndRadius: BOTTOM_TAB_RADIUS,
    borderBottomStartRadius: BOTTOM_TAB_RADIUS * 2,
    borderBottomEndRadius: BOTTOM_TAB_RADIUS * 2,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderWidth: 1,
  },
  topShadow: {
    ...StyleSheet.absoluteFillObject,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopStartRadius: BOTTOM_TAB_RADIUS * 2,
    borderTopEndRadius: BOTTOM_TAB_RADIUS * 2,
    borderBottomStartRadius: BOTTOM_TAB_RADIUS,
    borderBottomEndRadius: BOTTOM_TAB_RADIUS,
    transform: [{ rotate: '180deg' }],
  },
  indicator: {
    backgroundColor: 'transparent',
    width: 20,
    height: 20,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 3,
  }
});