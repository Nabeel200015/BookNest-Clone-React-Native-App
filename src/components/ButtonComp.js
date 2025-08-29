import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../constants/theme';

const ButtonComp = ({ title, btnStyle, btnTextStyle, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.btnStyle, btnStyle]}
      onPress={onPress}
    >
      <LinearGradient
        style={styles.gradientStyle}
        colors={['#1e88e5', '#2A48DE']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.btnText, btnTextStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  btnStyle: {},
  gradientStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: theme.radius.md,
  },
  btnText: {
    ...theme.Typography.title,
    color: theme.colors.textInverse,
    textTransform: 'uppercase',
  },
});
