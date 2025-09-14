import React, { useRef } from 'react';
import { TouchableOpacity, Animated, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const AnimatedButton = ({ title, onPress, style, textStyle }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, style]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    width: 260,
    alignItems: 'center',
    marginVertical: 8,
  boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
  },
  text: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default AnimatedButton;
