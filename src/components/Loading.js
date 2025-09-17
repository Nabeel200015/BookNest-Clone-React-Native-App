import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import { ActivityIndicator } from 'react-native-paper';
const Loading = ({ size }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
});
