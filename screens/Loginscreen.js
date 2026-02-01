import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  // Reset fields every time screen is focused
  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setRole('student');
    }, [])
  );

  const handleLogin = () => {
    if (role === 'student') navigation.navigate('Student');
    else if (role === 'warden') navigation.navigate('Warden');
    else if (role === 'staff') navigation.navigate('Staff');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#E0F7FA' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>

          {/* 🔙 Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={26} color="#004D40" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          {/* Topic */}
          <Text style={styles.topicText}>🏠 Hostel Issue Reporter</Text>

          {/* Logo */}
          <Icon
            name="home-repair-service"
            size={80}
            color="#26A69A"
            style={styles.logo}
          />

          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Login to report or manage issues
          </Text>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.inputLabel}>Email / University ID</Text>
            <View style={styles.inputWrapper}>
              <Icon name="person" size={22} color="#00796B" style={styles.inputIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="e.g. 2020cs123@stu.cmb.ac.lk"
                placeholderTextColor="#00796B"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={22} color="#00796B" style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#00796B"
                secureTextEntry
              />
            </View>
          </View>

          {/* Role Selection */}
          <View style={styles.roleContainer}>
            {[
              { key: 'student', label: 'Student', icon: 'school' },
              { key: 'warden', label: 'Warden', icon: 'account-balance' },
              { key: 'staff', label: 'Staff', icon: 'engineering' },
            ].map(r => (
              <TouchableOpacity
                key={r.key}
                onPress={() => setRole(r.key)}
                style={[
                  styles.roleBtn,
                  role === r.key && styles.selectedRole,
                ]}
              >
                <Icon
                  name={r.icon}
                  size={20}
                  color={role === r.key ? '#FFFFFF' : '#455A64'}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === r.key && { color: '#FFFFFF' },
                  ]}
                >
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
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

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ───── Styles ───── */
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  innerContainer: {
    alignItems: 'center',
  },

  /* Back Button */
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#004D40',
    marginLeft: 6,
  },

  topicText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004D40',
    marginBottom: 16,
  },
  logo: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004D40',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#00695C',
    marginBottom: 32,
    textAlign: 'center',
  },

  fieldContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#004D40',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B2DFDB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00796B',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#004D40',
  },

  roleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
  },
  roleBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 12,
    backgroundColor: '#F0FCFF',
  },
  selectedRole: {
    backgroundColor: '#26A69A',
    borderColor: '#26A69A',
  },
  roleText: {
    marginTop: 4,
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
    color: '#004D40',
    fontSize: 15,
  },
});
