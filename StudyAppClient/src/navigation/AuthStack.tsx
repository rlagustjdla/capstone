import EmailVerificationScreen from '../screens/EmailVerificationScreen.js';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* ...다른 화면 */}
    </Stack.Navigator>
  );
}
