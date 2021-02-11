import * as React from 'react';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';

const NeumorphismView = (props: any) => {
  const { size = 12 } = props;
  const [isDown, setDown] = useState(false);
  const handlePressIn = useCallback(() => {
    setDown(true);
  }, [setDown]);
  const handlePressOut = useCallback(() => {
    setDown(false);
  }, [setDown]);


  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View
        style={{
          backgroundColor: '#e6e7ee',
          padding: 20,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#d1d9e6',
          position: 'relative'
        }}>

        <View style={styles.bottomView} />
        <View style={styles.rightView} />

        <Text>Neomorphism component</Text>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  bottomView: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    bottom: 0,
    height: '50%',
    backgroundColor: '#e6e7ee',
    shadowColor: "#b8b9be",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },
  rightView: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#f6e7ee',
    shadowColor: "#f809be",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    transform:[{rotate: '90deg'}]
  }
});

export default NeumorphismView;