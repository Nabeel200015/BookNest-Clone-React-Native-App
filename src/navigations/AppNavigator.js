import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';
import AddBookScreen from '../screens/AddBookScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LikedBooks from '../screens/LikedBooksScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MyBooksScreen from '../screens/MyBooksScreen';
import BookRequestsScreen from '../screens/BookRequestsScreen';
import MessagesScreen from '../screens/MessagesScreen';

//AuthScreens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import OtpScreen from '../screens/OtpScreen';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="SetNewPass" component={SetNewPasswordScreen} />
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen
          name="AddBookScreen"
          component={AddBookScreen}
          options={{
            // This ensures the tab bar is hidden when navigating directly
            presentation: 'modal', // Gives a modal-like appearance
          }}
        />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="LikedBooks" component={LikedBooks} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MyBooks" component={MyBooksScreen} />
        <Stack.Screen name="BookRequests" component={BookRequestsScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
