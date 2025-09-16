import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Logo from '../assets/images/whiteLogo.svg';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

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
