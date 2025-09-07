import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { getToken } from '../utils/storage';
import AuthStack from '../navigations/AuthStack';
import MainStack from '../navigations/MainStack';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../constants/theme';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useSelector(state => state.auth);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return !user ? <AuthStack /> : <MainStack />;
};

export default AppNavigator;
