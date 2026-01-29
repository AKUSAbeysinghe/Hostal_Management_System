import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // TODO: Add real registration logic here
    navigation.navigate('Login');
  };

  // Optional: hide keyboard when tapping outside inputs
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            {/* Header Icon */}
            <Icon name="how-to-reg" size={80} color="#26A69A" style={styles.logo} />

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Register to report hostel issues easily</Text>

            {/* Full Name Field */}
            <View style={styles.inputWrapper}>
              <Icon name="person-add" size={22} color="#78909C" style={styles.inputIcon} />
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="#78909C"
                autoCapitalize="words"
              />
            </View>

            {/* Email / University ID Field */}
            <View style={styles.inputWrapper}>
              <Icon name="mail" size={22} color="#78909C" style={styles.inputIcon} />
              <TextInput
                placeholder="Email / University ID"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor="#78909C"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={22} color="#78909C" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#78909C"
              />
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Icon name="person-add-alt-1" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text>
              </Text>
            </TouchableOpacity>

            {/* Extra bottom space – helps last input stay visible */}
            <View style={{ height: 120 }} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,       // ← increased breathing room
  },
  logo: {
    marginBottom: 24,
    opacity: 0.9,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0D47A1',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#455A64',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B3E5FC',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#263238',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#26A69A',
    paddingVertical: 16,
    width: '100%',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 17,
  },
  loginLink: {
    marginTop: 8,
  },
  loginText: {
    color: '#1976D2',
    fontSize: 15,
  },
});