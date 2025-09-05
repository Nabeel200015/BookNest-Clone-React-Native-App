import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import InputComp from '../components/InputComp';
import { useNavigation } from '@react-navigation/native';
import ButtonComp from '../components/ButtonComp';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
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
            <View style={styles.horizontalFormContainer}>
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

            <InputComp
              leftIcon={'envelope'}
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
            />

            <InputComp
              leftIcon={'phone'}
              placeholder={'Enter your phone Number'}
              keyboardType={'phone-pad'}
            />

            <InputComp
              leftIcon={'envelope'}
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
            />
            <View style={styles.horizontalFormContainer}>
              <InputComp
                leftIcon={'city'}
                placeholder={'Enter your City'}
                keyboardType={'default'}
              />
              <InputComp
                leftIcon={'globe'}
                placeholder={'Enter your Country'}
                keyboardType={'default'}
              />
            </View>
            <InputComp
              leftIcon={'lock'}
              placeholder={'Enter password'}
              keyboardType={'default'}
              rightIcon
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonComp title={'Sign up'} />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.bottomLinkText}>Login</Text>
            </TouchableOpacity>
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
    height: 200,
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
  formContainer: {
    paddingHorizontal: 20,
    gap: theme.spacing.sm,
  },
  horizontalFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  btnContainer: {
    marginHorizontal: 20,
    marginTop: theme.spacing.md,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  bottomText: {
    justifyContent: 'center',
    ...theme.Typography.body,
    color: theme.colors.textPrimary,
  },
  bottomLinkText: {
    ...theme.Typography.body,
    color: theme.colors.primary,
  },
});

export default SignupScreen;
