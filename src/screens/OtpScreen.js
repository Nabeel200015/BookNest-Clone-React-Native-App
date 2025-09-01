import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../assets/icons/backarrow.svg';
import { useNavigation } from '@react-navigation/native';
import ButtonComp from '../components/ButtonComp';

const OTP_LENGTH = 6;

const OtpScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [focusedInput, setFocusedInput] = useState(null);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < OTP_LENGTH - 1) {
        inputs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (event, index) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleButtonPress = () => {
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      return Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    }

    Alert.alert('OTP Verified', `OTP ${code} is submitted successfully.`);

    navigation.navigate('Login');
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
            <Text style={styles.headerText}>
              Verify <Text style={{ color: theme.colors.primary }}>OTP</Text>
            </Text>
            <Text style={styles.subHeadText}>
              An{' '}
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontFamily: 'OpanSans-ExtraBold',
                }}
              >
                OTP
              </Text>{' '}
              has been sent to your email.
            </Text>
          </View>

          <View style={styles.otpRow}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={ref => (inputs.current[idx] = ref)}
                style={[styles.otpInput, digit && styles.otpInputFocused]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={text => handleChange(text, idx)}
                onKeyPress={e => handleKeyPress(e, idx)}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {}}
            style={styles.resendButton}
          >
            <Text style={styles.resendButtonText}>Resend</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <ButtonComp title={'Verify otp'} onPress={handleButtonPress} />
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
    width: '80%',
    marginTop: theme.spacing.xs,
    ...theme.Typography.subtitle,
    color: theme.colors.textSecondary,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: theme.spacing.xxl,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: theme.radius.md,
    backgroundColor: 'rgb(245, 245, 245)',
    borderWidth: 1,
    borderColor: theme.colors.primaryDark,
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    lineHeight: 36,
    color: theme.colors.textPrimary,
  },
  otpInputFocused: {
    backgroundColor: '#a3c8f351',
  },
  resendButton: {
    marginStart: 20,
    marginTop: theme.spacing.sm,
  },
  resendButtonText: {
    ...theme.Typography.body,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.primary,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: theme.spacing.xxl,
  },
});

export default OtpScreen;
