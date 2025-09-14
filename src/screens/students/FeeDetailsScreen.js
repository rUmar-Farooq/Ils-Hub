import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeeDetailsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Fee Details (Payments Coming Soon)</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' },
  text: { fontSize: 18, color: '#333' },
});

export default FeeDetailsScreen;
