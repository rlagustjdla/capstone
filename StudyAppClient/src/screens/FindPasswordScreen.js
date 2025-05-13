//FindPasswordScreen(비밀번호 이메일 인증)
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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FindPassword'>;

export default function FindPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [emailId, setEmailId] = useState('');
  const [code, setCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const fullEmail = `${emailId}@pukyong.ac.kr`;

  const handleSendCode = () => {
    console.log('이메일로 인증코드 전송:', fullEmail);
    setError('');
  };

  const handleVerifyCode = () => {
    if (code === '434032') {
      setIsVerified(true);
      setError('');
      setTimeout(() => {
        navigation.navigate('ResetPassword', { email: fullEmail });
      }, 1000);
    } else {
      setIsVerified(false);
      setError('인증 코드가 일치하지 않습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>비밀번호 찾기</Text>

        {/* 이메일 입력 */}
        <View style={styles.row}>
          <TextInput
            style={styles.emailInput}
            placeholder="학교 메일 입력"
            value={emailId}
            onChangeText={setEmailId}
            placeholderTextColor="#aaa"
          />
          <Text style={styles.domainText}>@pukyong.ac.kr</Text>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendCode}>
            <Text style={styles.sendButtonText}>인증 코드 받기</Text>
          </TouchableOpacity>
        </View>

        {/* 인증 코드 입력 */}
        <View style={styles.codeRow}>
          <TextInput
            style={styles.codeInput}
            placeholder="인증 코드 입력"
            value={code}
            onChangeText={setCode}
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            maxLength={6}
          />
          {code.length === 6 && (
            <TouchableOpacity onPress={handleVerifyCode}>
              <Ionicons name="checkmark-circle" size={22} color="#3366ff" />
            </TouchableOpacity>
          )}
        </View>

        {/* 메시지 출력 */}
        {isVerified && <Text style={styles.verifiedText}>✅ 인증이 완료되었습니다.</Text>}
        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingHorizontal: 30,
    marginTop: 100, // ✅ 위치 조절 여기서!
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingBottom: 8,
  },
  emailInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
    color: '#000',
  },
  domainText: {
    marginHorizontal: 4,
    color: '#666',
  },
  sendButton: {
    backgroundColor: '#001f33',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 15,
  },
  codeInput: {
    flex: 1,
    fontSize: 16,
  },
  verifiedText: {
    color: '#3366ff',
    fontSize: 14,
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});
