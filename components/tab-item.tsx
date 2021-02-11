import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import React, { useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Animated, { Easing, interpolate, useCode } from 'react-native-reanimated';

const {
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  block,
  timing,
  debug,
  Value,
  Clock,
  divide,
  concat,
} = Animated;

function runTiming(clock: Animated.Clock, value: number, dest: any) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 250,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

export default function TabItem({ children, onPress, ...rest }: BottomTabBarButtonProps) {
  const [show, setShow] = useState(false);
  const { clock, animatedValue } = useMemo(() => ({
    clock: new Clock(),
    animatedValue: new Value(0),
  }), []);

  useCode(() => block([
    show
      ? set(animatedValue, runTiming(clock, 0, 1))
      : set(animatedValue, runTiming(clock, 1, 0))
  ]), [show]);

  const opacity = interpolate(animatedValue, {
    inputRange: [0, .5, 1],
    outputRange: [0, 1, 0],
  });
  const scale = interpolate(animatedValue, {
    inputRange: [0, 1],
    outputRange: [0, 2],
  });
  return (
    <View style={style.button}>
      <TouchableWithoutFeedback {...rest} style={{
        minWidth: '100%',
        maxWidth: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
      onPress={(e) => {
        console.log('press')
        setShow(!show)
        onPress && onPress(e);
      }}
      >
        <View>
          <Animated.View style={[
            {
              borderColor: 'red',
              borderWidth: 3,
              height: 30,
              width: 30,
              borderRadius: 30,
              position: 'absolute',
              transform: [{ scale }],
              opacity,
            }
          ]} />
          {children}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}


const style = StyleSheet.create({
  button: {
    position: 'relative',
    zIndex: 20,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 2,
  }
});
