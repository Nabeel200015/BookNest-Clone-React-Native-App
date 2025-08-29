import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import InputComp from '../components/InputComp';

const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoid}>
          <View style={styles.logoContainer}>
            <Text style={styles.headerText}>
              Create Account For{' '}
              <Text
                style={[styles.headerText, { color: theme.colors.primaryDark }]}
              >
                BookNest
              </Text>
            </Text>
            <Text style={styles.subHeadText}>
              Sign up to Exchange your Books with the world.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.fullNameContainer}>
              <InputComp
                leftIcon={'user'}
                placeholder={'First Name'}
                keyboardType={'default'}
              />
              <InputComp
                leftIcon={'user'}
                placeholder={'Last Name'}
                keyboardType={'default'}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  logoContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    ...theme.Typography.header,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  subHeadText: {
    width: '80%',
    ...theme.Typography.subtitle,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  formContainer: {},
  fullNameContainer: {},
});

export default SignupScreen;
