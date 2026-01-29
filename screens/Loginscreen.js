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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // student / warden / staff

  const handleLogin = () => {
    // Mock navigation based on role (replace with real auth later)
    if (role === 'student') navigation.navigate('Student');
    else if (role === 'warden') navigation.navigate('Warden');
    else navigation.navigate('Staff');
  };

  // Hide keyboard when tapping outside inputs
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
            {/* App Logo / Icon */}
            <Icon name="home-repair-service" size={80} color="#26A69A" style={styles.logo} />

            <Text style={styles.title}>Hostel Maintenance</Text>
            <Text style={styles.subtitle}>Login to report or manage issues</Text>

            {/* Email / ID Field */}
            <View style={styles.inputWrapper}>
              <Icon name="person" size={22} color="#78909C" style={styles.inputIcon} />
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

            {/* Role Selection */}
            <View style={styles.roleContainer}>
              <TouchableOpacity
                onPress={() => setRole('student')}
                style={[styles.roleBtn, role === 'student' && styles.selectedRole]}
              >
                <Icon
                  name="school"
                  size={20}
                  color={role === 'student' ? '#FFFFFF' : '#455A64'}
                  style={{ marginBottom: 4 }}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === 'student' && { color: '#FFFFFF' },
                  ]}
                >
                  Student
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRole('warden')}
                style={[styles.roleBtn, role === 'warden' && styles.selectedRole]}
              >
                <Icon
                  name="account-balance"
                  size={20}
                  color={role === 'warden' ? '#FFFFFF' : '#455A64'}
                  style={{ marginBottom: 4 }}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === 'warden' && { color: '#FFFFFF' },
                  ]}
                >
                  Warden
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRole('staff')}
                style={[styles.roleBtn, role === 'staff' && styles.selectedRole]}
              >
                <Icon
                  name="engineering"
                  size={20}
                  color={role === 'staff' ? '#FFFFFF' : '#455A64'}
                  style={{ marginBottom: 4 }}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === 'staff' && { color: '#FFFFFF' },
                  ]}
                >
                  Staff
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Icon name="login" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            {/* Register Link */}
            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerText}>
                Don't have an account? <Text style={{ fontWeight: 'bold' }}>Register</Text>
              </Text>
            </TouchableOpacity>

            {/* Extra bottom padding – ensures button + last content stays visible above keyboard */}
            <View style={{ height: 140 }} />
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
    paddingVertical: 40,       // ← Gives more breathing room top/bottom
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  roleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#B3E5FC',
    borderRadius: 12,
    backgroundColor: '#F0FCFF',
  },
  selectedRole: {
    backgroundColor: '#26A69A',
    borderColor: '#26A69A',
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#455A64',
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
  registerLink: {
    marginTop: 8,
  },
  registerText: {
    color: '#1976D2',
    fontSize: 15,
  },
});