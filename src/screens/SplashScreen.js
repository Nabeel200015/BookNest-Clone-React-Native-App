import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Logo from '../assets/images/whiteLogo.svg';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getToken, getUser } from '../utils/storage';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/userSlice';
import socket from '../services/socket';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getAsyncStorage = async () => {
    try {
      const storedToken = await getToken();
      const storedUser = await getUser();
      const user = JSON.parse(storedUser);

      socket.emit('join_room', { userId: user._id });

      if (storedToken && storedUser) {
        navigation.replace('Tab');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      console.log('Error getting async storage:', error.message);
      navigation.replace('Login');
    }
  };

  // useEffect(() => {}, []);
  useEffect(() => {
    setTimeout(() => {
      getAsyncStorage();
    }, 3000);

    return clearTimeout();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Logo width={100} height={100} style={styles.logo} />
      <ActivityIndicator
        size={'large'}
        color={theme.colors.white}
        style={styles.loader}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {},
  loader: { position: 'absolute', bottom: 60, overflow: 'visible' },
});
