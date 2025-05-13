//ResetPasswordScreen(비밀번호 변경)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type ResetPasswordRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPasswordScreen() {
  const route = useRoute<ResetPasswordRouteProp>();
  const { email } = route.params; // 이메일 받아옴

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const isMatch = password.length > 0 && password === confirm;

  const handleReset = () => {
    console.log('비밀번호 변경 요청:', email, password);
    // 나중에 fetch 로직 추가 예정
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>비밀번호 재설정</Text>

      {/* 비밀번호 입력 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호 입력"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {password.length > 0 && (
          <Ionicons name="checkmark-circle" size={20} color="#3366ff" />
        )}
      </View>

      {/* 비밀번호 확인 입력 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 재입력"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
        {confirm.length > 0 && (
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={isMatch ? '#3366ff' : 'red'}
          />
        )}
      </View>

      {/* 변경 버튼 */}
      <TouchableOpacity
        style={[styles.button, !isMatch && { opacity: 0.4 }]}
        disabled={!isMatch}
        onPress={handleReset}
      >
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#001f33',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
