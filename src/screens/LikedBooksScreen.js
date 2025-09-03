import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const LikedBooksScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoid}>
        <Header title={'Liked Books'} showBackButton />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>No Liked Books yet...</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LikedBooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
});
