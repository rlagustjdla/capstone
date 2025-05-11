// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('알림', '아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    try {
      const response = await fetch('http://112.162.196.250:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('로그인 성공', `환영합니다, ${result.username}님`);
        // 예: navigate to home screen
      } else {
        Alert.alert('로그인 실패', result.message || '아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '서버와 통신할 수 없습니다.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity>
          <Text style={styles.footerText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 40 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20, fontSize: 16, paddingVertical: 8 },
  button: { backgroundColor: '#001f3f', paddingVertical: 12, borderRadius: 24, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { color: '#555', fontSize: 14 },
  divider: { marginHorizontal: 8, color: '#ccc' },
});
