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
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../assets/icons/backarrow.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';
import booknest from '../services/api';

const SetNewPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute().params;
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChangePassword = async () => {
    const email = route?.email;
    const password = passwords.confirmPassword;
    if (passwords.password !== passwords.confirmPassword) {
      return Alert.alert('Input Error', 'Passwords are not matched!');
    }
    try {
      setLoading(true);

      const response = await booknest.post('/users/resetpassword', {
        email: email,
        newPassword: password,
      });

      console.log('Password Change Status', response.data?.message);

      navigation.replace('Login');
      return Alert.alert('Password Change', response.data?.message);
    } catch (error) {
      console.log('API Error', error.response?.data?.message);
      return Alert.alert('Password Change', error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoid}>
          <TouchableOpacity
            style={styles.arrowBack}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Icon width={35} height={35} />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Set New Password</Text>
            <Text style={styles.subHeadText}>Create a strong password.</Text>
          </View>

          <View style={styles.fieldContainer}>
            <InputComp
              leftIcon={'lock'}
              placeholder={'Enter password'}
              keyboardType={'defualt'}
              rightIcon={true}
              value={passwords.password}
              onChangeText={text =>
                setPasswords({ ...passwords, password: text })
              }
            />
            <InputComp
              leftIcon={'lock'}
              placeholder={'Confirm password'}
              keyboardType={'defualt'}
              rightIcon={true}
              value={passwords.confirmPassword}
              onChangeText={text =>
                setPasswords({ ...passwords, confirmPassword: text })
              }
            />

            <ButtonComp
              btnStyle={{ marginTop: theme.spacing.xxl }}
              title={!loading ? 'Change password' : 'loading...'}
              onPress={handleChangePassword}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  arrowBack: {
    marginTop: 20,
    marginStart: 20,
  },
  headerTextContainer: {
    justifyContent: 'center',
    marginTop: 20,
    marginStart: 20,
    // backgroundColor: 'red',
  },
  headerText: {
    width: '50%',
    ...theme.Typography.header,
    color: theme.colors.textPrimary,
  },
  subHeadText: {
    marginTop: theme.spacing.xs,
    ...theme.Typography.subtitle,
    color: theme.colors.textSecondary,
  },
  fieldContainer: {
    marginHorizontal: 20,
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
});
