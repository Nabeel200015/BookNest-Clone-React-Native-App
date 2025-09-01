import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Header from '../components/Header';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        showRightButtons={true}
        rightIconOne="account-circle"
        rightIconTwo="notifications"
      />

      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default HomeScreen;
