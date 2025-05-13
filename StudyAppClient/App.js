//LoginScreen(로그인 화면)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('로그인 시도:', email, password);
    // TODO: 백엔드 로그인 API 연결 예정
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>로그인</Text>

        {/* 이메일 입력 */}
        <TextInput
          style={styles.input}
          placeholder="학교 이메일 (@pukyong.ac.kr 생략)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* 비밀번호 입력 */}
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="비밀번호"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        {/* 하단 링크 */}
        <View style={styles.linkRow}>
          <TouchableOpacity onPress={() => navigation.navigate('EmailVerification')}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 30,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#001f33',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkText: {
    color: '#3366ff',
    fontSize: 14,
  },
});
