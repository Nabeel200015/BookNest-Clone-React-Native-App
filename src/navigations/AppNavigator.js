import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OtpScreen from '../screens/OtpScreen';
import TabNavigator from './TabNavigator';
import AddBookScreen from '../screens/AddBookScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen
        name="AddBookScreen"
        component={AddBookScreen}
        options={{
          // This ensures the tab bar is hidden when navigating directly
          presentation: 'modal', // Gives a modal-like appearance
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
