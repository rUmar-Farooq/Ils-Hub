import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgot = () => {
    if (!input) {
      Alert.alert('Error', 'Please enter your email or phone number');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'If this email or number exists, you will receive reset instructions.');
      navigation.goBack();
    }, 1200);
  };

  return (
    <LinearGradient colors={['#164758', '#00965f']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email or phone number to reset your password.</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#00965f" />
          <TextInput
            style={styles.input}
            placeholder="Email or Phone"
            placeholderTextColor="#7aa8a0"
            value={input}
            onChangeText={setInput}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleForgot} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'} Back to Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 28,
    padding: 36,
    width: '90%',
    maxWidth: 410,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#005f46',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#00965f',
    marginBottom: 18,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f9f8',
    borderRadius: 12,
    marginBottom: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#b5d6cc',
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: '#004d3d',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00965f',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 4,
  },
  backButtonText: {
    color: '#00965f',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
