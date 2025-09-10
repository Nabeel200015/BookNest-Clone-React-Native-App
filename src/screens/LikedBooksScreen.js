import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Icon from '@react-native-vector-icons/fontawesome6';

const LikedBooksScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoid}>
        <Header title={'Liked Books'} showBackButton />
        {/* <View style={styles.centerContent}>
          <Icon
            name="book-open"
            iconStyle={'solid'}
            size={50}
            color={'rgb(224, 224, 224)'}
          />
          <Text style={styles.noResultsText}>
            No books found in your wishlist
          </Text>
        </View> */}

        {/* <View></View> */}
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  noResultsText: {
    color: theme.colors.textTertiary,
    ...theme.Typography.subtitle,
  },
});
