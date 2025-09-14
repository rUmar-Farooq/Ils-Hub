import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
const ILS_LOGO = require('../assets/ils.jpeg');

export default function WelcomeScreen({ navigation }) {
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      // 👇 yaha RoleSelection ki jagah Login
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#164758', '#00965f', '#00965f']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View
        style={{
          opacity: logoAnim,
          transform: [
            {
              scale: logoAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.7, 1],
              }),
            },
          ],
        }}
      >
        <View style={styles.logoWrapper}>
          <Image source={ILS_LOGO} style={styles.logo} resizeMode="contain" />
        </View>
      </Animated.View>
      <Text style={styles.title}>ILS Campus</Text>
      <Text style={styles.subtitle}>Empowering Learning, Inspiring Success</Text>
      <Ionicons name="school" size={40} color="#fff" style={{ marginTop: 24, opacity: 0.8 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoWrapper: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 80,
    padding: 18,
    marginBottom: 18,
    // RN me boxShadow nahi hota, ise hata do ya shadow props use karo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  logo: { width: 110, height: 110, borderRadius: 55 },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#B2DFDB',
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: 2,
    opacity: 0.9,
  },
});
