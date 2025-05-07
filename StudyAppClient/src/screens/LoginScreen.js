
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLogin = async () => {
  try {
    const res = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('accessToken', res.data.accessToken);
    navigation.replace('Home');
  } catch (e) {
    Alert.alert('로그인 실패', e.response?.data || e.message);
  }
};
