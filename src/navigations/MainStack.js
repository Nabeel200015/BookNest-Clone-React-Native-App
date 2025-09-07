import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import TabNavigator from './TabNavigator';
import AddBookScreen from '../screens/AddBookScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LikedBooks from '../screens/LikedBooksScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MyBooksScreen from '../screens/MyBooksScreen';
import BookRequestsScreen from '../screens/BookRequestsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
    </Stack.Navigator>
  );
};

export default MainStack;
