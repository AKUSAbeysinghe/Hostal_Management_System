import React, { useState } from 'react';
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

export default function UserRegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('User registration:', { fullName, email, password });
    navigation.navigate('Login');
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

          <Icon
            name="how-to-reg"
            size={80}
            color="#26A69A"
            style={styles.logo}
          />

          <Text style={styles.title}>User Registration</Text>
          <Text style={styles.subtitle}>
            Create your account to report hostel issues easily
          </Text>

          {/* Full Name */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputBox}>
              <Icon name="person-add" size={22} color="#00796B" style={styles.inputIcon} />
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor="#00796B"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email / University ID</Text>
            <View style={styles.inputBox}>
              <Icon name="mail" size={22} color="#00796B" style={styles.inputIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Enter email or ID"
                placeholderTextColor="#00796B"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputBox}>
              <Icon name="lock" size={22} color="#00796B" style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#00796B"
                secureTextEntry
              />
            </View>
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
    opacity: 0.9,
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
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    color: '#004D40',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputBox: {
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
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00796B',
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
  loginLink: {
    marginTop: 8,
  },
  loginText: {
    color: '#004D40',
    fontSize: 15,
  },
});
