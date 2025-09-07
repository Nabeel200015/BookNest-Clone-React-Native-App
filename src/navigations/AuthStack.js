import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
//AuthScreens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OtpScreen from '../screens/OtpScreen';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="SetNewPass" component={SetNewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
