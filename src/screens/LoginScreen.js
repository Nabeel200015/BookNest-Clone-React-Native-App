import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import theme from '../constants/theme';
import Logo from '../assets/images/logo.svg';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoid}>
          <View style={styles.logoContainer}>
            <Logo></Logo>
            <View style={styles.logoTextContainer}>
              <Text style={styles.headerText}>Welcome Back</Text>
              <Text style={styles.subHeadText}>
                Log in to share your Books with the world.
              </Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <InputComp
              leftIcon={'envelope'}
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
            />
            <InputComp
              leftIcon={'lock'}
              placeholder={'Enter your password'}
              keyboardType={'default'}
              rightIcon
            />
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Send Verification Link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ForgetPassword')}
            >
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnContainer}>
            <ButtonComp
              title={'Sign IN'}
              onPress={() => navigation.navigate('Tab')}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.bottomText}>Don't have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.bottomLinkText}>Sign up</Text>
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
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTextContainer: {
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  headerText: {
    ...theme.Typography.header,
    color: theme.colors.textPrimary,
  },
  subHeadText: {
    ...theme.Typography.subtitle,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  fieldContainer: {
    gap: theme.spacing.md,
    marginHorizontal: 20,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: theme.spacing.sm,
  },
  linkText: {
    ...theme.Typography.body,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  btnContainer: {
    marginHorizontal: 20,
    marginTop: theme.spacing.xxl,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
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

export default LoginScreen;
