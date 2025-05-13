//EmailVerificationScreen(회원가입 이메일 인증)
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EmailVerification'>;

// ✅ 백엔드 URL (실제 운영 시 .env로 분리 필요)
const BACKEND_URL = 'http://YOUR_BACKEND_URL'; // TODO: .env 처리할 것

export default function EmailVerificationScreen() {
  const navigation = useNavigation<NavigationProp>();

  // ✅ 상태 정의
  const [emailPrefix, setEmailPrefix] = useState(''); // 이메일 앞부분만 입력 (도메인은 고정)
  const [code, setCode] = useState(''); // 사용자가 입력한 인증번호
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 요청 여부
  const [error, setError] = useState(''); // 에러 메시지
  const [success, setSuccess] = useState(false); // 인증 성공 여부

  // ✅ 전체 이메일 주소 조합
  const fullEmail = `${emailPrefix}@pukyong.ac.kr`;

  // ✅ 인증 코드 요청 API 호출
  const handleSendCode = async () => {
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fullEmail }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || '인증 메일 전송 실패');
        return;
      }

      setIsCodeSent(true); // 인증번호 요청 성공 시 상태 변경
    } catch (err) {
      setError('서버 오류가 발생했습니다');
    }
  };

  // ✅ 인증 코드 검증 API 호출
  const handleVerifyCode = async () => {
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fullEmail, code }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || '인증 실패');
        return;
      }

      setSuccess(true); // 인증 성공 메시지 띄움

      // ✅ 인증 성공 → 회원가입 화면으로 이동하며 이메일 전달
      navigation.navigate('Signup', { email: fullEmail });
    } catch (err) {
      setError('서버 오류가 발생했습니다');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* ✅ 이메일 입력 필드 */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="이메일"
              value={emailPrefix}
              onChangeText={setEmailPrefix}
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
            <Text style={styles.emailSuffix}>@pukyong.ac.kr</Text>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: emailPrefix ? '#007AFF' : '#ccc' },
              ]}
              disabled={!emailPrefix}
              onPress={handleSendCode}
            >
              <Text style={styles.sendButtonText}>인증 받기</Text>
            </TouchableOpacity>
          </View>

          {/* ✅ 인증번호 입력 필드 (요청 성공 시에만 보임) */}
          {isCodeSent && (
            <TextInput
              style={styles.input}
              placeholder="인증 번호"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />
          )}

          {/* ✅ 에러 메시지 */}
          {error !== '' && (
            <View style={styles.messageBox}>
              <Ionicons name="alert-circle" size={16} color="red" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* ✅ 인증 성공 메시지 */}
          {success && (
            <Text style={styles.successText}>✅ 인증이 완료되었습니다.</Text>
          )}

          {/* ✅ 다음 버튼 (조건: 인증번호 요청 완료 + 코드 입력됨) */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: isCodeSent && code ? '#001f33' : '#ccc',
                marginTop: 30,
              },
            ]}
            onPress={handleVerifyCode}
            disabled={!isCodeSent || !code}
          >
            <Text style={styles.nextButtonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ✅ 스타일 정의
const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center' },
  container: { paddingHorizontal: 30 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginRight: 5,
  },
  emailSuffix: { fontSize: 14, color: '#666', marginRight: 5 },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  sendButtonText: { color: '#fff', fontSize: 12 },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 6,
  },
  errorText: { color: 'red', marginLeft: 6 },
  successText: {
    marginTop: 10,
    color: 'blue',
    fontSize: 14,
  },
});
