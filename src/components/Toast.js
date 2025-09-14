import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../constants/colors';

const Toast = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <Animated.View style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    right: 30,
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 200,
  boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Toast;
