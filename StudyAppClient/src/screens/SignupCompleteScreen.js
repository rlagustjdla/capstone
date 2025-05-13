//SignupCompleteScreen(회원가입 완료료)
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; // 🔁 상대 경로로 수정

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SignupCompleteRouteProp = RouteProp<RootStackParamList, 'SignupComplete'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SignupCompleteScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SignupCompleteRouteProp>();
  const { nickname } = route.params;

  const initial = nickname?.[0]?.toUpperCase() || 'V';

  return (
    <SafeAreaView style={styles.container}>
      {/* ← 뒤로가기 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.inner}>
        {/* 원형 아바타 */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        {/* 가입 완료 메시지 */}
        <Text style={styles.message}>
          <Text style={{ fontWeight: 'bold' }}>{nickname}</Text>님{'\n'}회원 가입 완료
        </Text>

        {/* 로그인 하러가기 버튼 */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>로그인 하러가기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    backButton: {
      marginBottom: 20,
    },
    inner: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#001f33',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    avatarText: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    message: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 40,
      lineHeight: 28,
    },
    loginButton: {
      backgroundColor: '#001f33',
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 30,
    },
    loginText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  