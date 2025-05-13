//SignupScreen(회원가입 정보입력)
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
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';

type RouteProps = RouteProp<RootStackParamList, 'Signup'>;

export default function SignupScreen() {
  const route = useRoute<RouteProps>();
  const email = route.params?.email;

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState<boolean | null>(null);
  const [gender, setGender] = useState<'남' | '여' | null>(null);
  const [genderPublic, setGenderPublic] = useState(false);
  const [status, setStatus] = useState<'재학' | '휴학' | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [majorPublic, setMajorPublic] = useState(false);

  const [open, setOpen] = useState(false);
  const [major, setMajor] = useState(null);
  const [majors, setMajors] = useState([
    { label: '정보융합대학', value: '정보융합대학' },
    { label: '경영대학', value: '경영대학' },
    { label: '공과대학', value: '공과대학' },
    { label: '사회과학대학', value: '사회과학대학' },
    { label: '수산대학', value: '수산대학' },
  ]);

  const isPasswordMismatch = passwordCheck.length > 0 && password !== passwordCheck;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        {/* 비밀번호 */}
        <TextInput
          style={styles.input}
          placeholder="PASSWORD 입력"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD 재입력"
          secureTextEntry
          value={passwordCheck}
          onChangeText={setPasswordCheck}
        />
        {isPasswordMismatch && (
          <Text style={styles.errorText}>비밀번호가 일치하지 않습니다</Text>
        )}

        {/* 닉네임 */}
        <View style={styles.nicknameRow}>
          <TextInput
            style={styles.nicknameInput}
            placeholder="닉네임 입력"
            value={nickname}
            onChangeText={setNickname}
          />
          <TouchableOpacity
            style={styles.checkButton}
            onPress={() => {
              if (nickname === '중복') {
                setNicknameChecked(false);
              } else {
                setNicknameChecked(true);
              }
            }}
          >
            <Text style={styles.checkButtonText}>중복 검사</Text>
          </TouchableOpacity>
        </View>
        {nicknameChecked === false && (
          <Text style={styles.errorText}>이미 등록된 닉네임입니다</Text>
        )}

        {/* 성별 */}
        <View style={styles.sectionWithCheckbox}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>성별</Text>
            <View style={styles.checkboxRow}>
              <Checkbox value={genderPublic} onValueChange={setGenderPublic} />
              <Text style={styles.checkboxLabel}>공개</Text>
            </View>
          </View>
          <View style={styles.choiceRow}>
            <TouchableOpacity onPress={() => setGender('남')}>
              <Text style={[styles.choiceButton, gender === '남' && styles.selected]}>남</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('여')}>
              <Text style={[styles.choiceButton, gender === '여' && styles.selected]}>여</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 학과 */}
        <View style={styles.sectionWithCheckbox}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>학과</Text>
            <View style={styles.checkboxRow}>
              <Checkbox value={majorPublic} onValueChange={setMajorPublic} />
              <Text style={styles.checkboxLabel}>공개</Text>
            </View>
          </View>
          <DropDownPicker
            open={open}
            value={major}
            items={majors}
            setOpen={setOpen}
            setValue={setMajor}
            setItems={setMajors}
            placeholder="학과 선택"
            listMode="SCROLLVIEW" // ✅ 중요!
            style={styles.dropdown}
            dropDownContainerStyle={{ borderColor: '#ccc' }}
          />
        </View>

        {/* 학적 상태 + 학년 */}
        <View style={styles.sectionWithCheckbox}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>학년</Text>
          </View>
          <View style={styles.choiceRow}>
            <TouchableOpacity onPress={() => setStatus('재학')}>
              <Text style={[styles.choiceButton, status === '재학' && styles.selected]}>재학</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStatus('휴학')}>
              <Text style={[styles.choiceButton, status === '휴학' && styles.selected]}>휴학</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.yearRow}>
            {[1, 2, 3, 4].map(n => (
              <TouchableOpacity key={n} onPress={() => setYear(n)}>
                <Text style={[styles.yearButton, year === n && styles.selected]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 가입 버튼 */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>가입하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  nicknameInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },
  checkButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 13,
  },
  sectionWithCheckbox: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 4,
    fontSize: 12,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  choiceButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 6,
    fontSize: 14,
  },
  selected: {
    backgroundColor: '#001f33',
    color: '#fff',
    borderColor: '#001f33',
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 5,
  },
  yearRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  yearButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 38,
  },
  submitButton: {
    backgroundColor: '#001f33',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
