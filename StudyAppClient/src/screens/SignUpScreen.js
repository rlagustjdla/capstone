
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import api from '../api';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignUp = async () => {
    try {
      await api.post('/auth/signup', { email, password, nickname });
      Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('오류', e.response?.data || e.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="이메일" onChangeText={setEmail} />
      <TextInput placeholder="비밀번호" secureTextEntry onChangeText={setPassword} />
      <TextInput placeholder="닉네임" onChangeText={setNickname} />
      <Button title="회원가입" onPress={handleSignUp} />
    </View>
  );
}
