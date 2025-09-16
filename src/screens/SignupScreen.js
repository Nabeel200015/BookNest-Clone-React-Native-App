import {
  Alert,
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
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import Toast from 'react-native-toast-message';

const SignupScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phoneno: '',
    address: {
      city: '',
      country: '',
    },
  });

  const handleRegister = () => {
    dispatch(registerUser(form))
      .unwrap()
      .then(() => {
        setForm({
          email: '',
          password: '',
          firstname: '',
          lastname: '',
          phoneno: '',
          address: {
            city: '',
            country: '',
          },
        });
        navigation.navigate('Login');
      });
  };

  const handleChange = (key, value, nestedKey = null) => {
    if (nestedKey) {
      setForm(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          [nestedKey]: value,
        },
      }));
    } else {
      setForm(prev => ({ ...prev, [key]: value }));
    }
  };

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
                value={form.firstname}
                onChangeText={text => handleChange('firstname', text)}
              />

              <InputComp
                leftIcon={'user'}
                placeholder={'Last Name'}
                keyboardType={'default'}
                value={form.lastname}
                onChangeText={text => handleChange('lastname', text)}
              />
            </View>

            <InputComp
              leftIcon={'envelope'}
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
              value={form.email}
              onChangeText={text => handleChange('email', text)}
            />

            <InputComp
              leftIcon={'phone'}
              placeholder={'Enter your phone Number'}
              keyboardType={'phone-pad'}
              value={form.phoneno}
              onChangeText={text => handleChange('phoneno', text)}
            />

            <View style={styles.horizontalFormContainer}>
              <InputComp
                leftIcon={'city'}
                placeholder={'Enter your City'}
                keyboardType={'default'}
                value={form.address.city}
                onChangeText={text => handleChange('address', text, 'city')}
              />
              <InputComp
                leftIcon={'globe'}
                placeholder={'Enter your Country'}
                keyboardType={'default'}
                value={form.address.country}
                onChangeText={text => handleChange('address', text, 'country')}
              />
            </View>
            <InputComp
              leftIcon={'lock'}
              placeholder={'Enter password'}
              keyboardType={'default'}
              rightIcon
              value={form.password}
              onChangeText={text => handleChange('password', text)}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonComp
              title={!loading ? 'Sign up' : 'Loading...'}
              onPress={() => handleRegister(form)}
              disabled={loading}
            />
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
      <Toast />
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
    marginTop: theme.spacing.xxl,
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
