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
import { useNavigation } from '@react-navigation/native';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../redux/authSlice';
import Toast from 'react-native-toast-message';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const handleSendOtp = email => {
    dispatch(sendOtp(email))
      .unwrap()
      .then(() => {
        navigation.navigate('Otp', { email: email });
      });
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
            <Text style={styles.headerText}>Forgot Password</Text>
            <Text style={styles.subHeadText}>
              Enter your Email to reset Password.
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <InputComp
              leftIcon={'envelope'}
              placeholder={'Enter your email'}
              keyboardType={'email-address'}
              value={email}
              onChangeText={text => setEmail(text)}
            />

            <ButtonComp
              title={!loading ? 'send otp' : 'loading...'}
              onPress={() => {
                handleSendOtp(email);
              }}
              disabled={loading}
            />
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
    gap: theme.spacing.xxl,
  },
});

export default ForgetPasswordScreen;
