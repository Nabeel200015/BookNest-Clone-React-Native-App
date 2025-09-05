import {
  Image,
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
import Back from '../assets/icons/backarrow.svg';
import Icon from '@react-native-vector-icons/fontawesome6';
import InputComp from '../components/InputComp';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [changePassword, setChangePassword] = useState(false);
  const toggleChangePass = () => setChangePassword(!changePassword);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoid}>
          <TouchableOpacity
            style={styles.back}
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Back width={30} height={30} />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Edit Your Profile</Text>
            <Text style={styles.caption}>
              Update your personal information and preferences.
            </Text>
          </View>

          <View style={styles.profilePictureContianer}>
            <Image
              source={require('../assets/images/profile.png')}
              resizeMode="cover"
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.uploadIcon}>
              <Icon
                name="camera"
                size={22}
                iconStyle={'solid'}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.columnField}>
              <InputComp
                leftIcon={'user'}
                placeholder={'Enter First Name'}
                keyboardType={'default'}
              />
              <InputComp
                leftIcon={'user'}
                placeholder={'Enter Last Name'}
                keyboardType={'default'}
              />
            </View>
            <View style={styles.emailField}>
              <Icon
                name={'envelope'}
                size={18}
                color={theme.colors.textTertiary}
                iconStyle="solid"
              />
              <Text style={styles.emailText}>xyzjdh@gmail.com</Text>
            </View>
            <InputComp
              leftIcon={'phone'}
              placeholder={'Enter your Phone Number'}
              keyboardType={'default'}
            />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={styles.seperator} />

          <View style={styles.headerTextContainer}>
            <Text
              style={{
                ...theme.Typography.title,
                fontFamily: 'OpenSans-Bold',
                color: theme.colors.textPrimary,
              }}
            >
              Change Password
            </Text>
            <Text style={styles.caption}>
              Update your password to keep your account secure.
            </Text>
          </View>

          {!changePassword ? (
            <TouchableOpacity
              style={styles.passwordButton}
              activeOpacity={0.5}
              onPress={toggleChangePass}
            >
              <Text style={styles.pButtonText}>Change Password</Text>
              <Icon
                name="arrow-right-long"
                size={14}
                color={theme.colors.primary}
                iconStyle={'solid'}
                style={{ top: 2 }}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.changePassFields}>
              <InputComp
                leftIcon={'lock'}
                placeholder={'Enter current password'}
                keyboardType={'default'}
                rightIcon
              />
              <InputComp
                leftIcon={'lock'}
                placeholder={'Enter new password'}
                keyboardType={'default'}
                rightIcon
              />
              <InputComp
                leftIcon={'lock'}
                placeholder={'Confirm new password'}
                keyboardType={'default'}
                rightIcon
              />

              <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.updateButtonText}>update password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.5}
                onPress={toggleChangePass}
              >
                <Text
                  style={[
                    styles.updateButtonText,
                    {
                      color: theme.colors.textTertiary,
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
  back: {
    marginTop: theme.spacing.md,
    marginStart: theme.spacing.md,
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.md,
    gap: theme.spacing.xs,
    marginHorizontal: 20,
  },
  title: {
    ...theme.Typography.header,
    fontFamily: 'OpenSans-Bold',
    color: theme.colors.textPrimary,
  },
  caption: {
    ...theme.Typography.body,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  },
  profilePictureContianer: {
    ...theme.shadow.lg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.full,
    alignSelf: 'center',
    marginVertical: theme.spacing.xs,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: theme.radius.full,
    borderColor: theme.colors.primaryLight,
  },
  uploadIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderRadius: theme.radius.full,
    borderColor: theme.colors.primaryLight,
    ...theme.shadow.lg,
  },
  formContainer: {
    gap: theme.spacing.sm,
    marginHorizontal: 20,
    marginVertical: theme.spacing.lg,
  },
  columnField: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  emailField: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    backgroundColor: theme.colors.inputBackground,
  },
  emailText: {
    flex: 1,
    ...theme.Typography.body,
    color: theme.colors.textTertiary,
    marginStart: theme.spacing.sm,
  },
  saveButton: {
    backgroundColor: theme.colors.textPrimary,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },
  saveText: {
    ...theme.Typography.title,
    color: theme.colors.textInverse,
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Bold',
  },
  seperator: {
    backgroundColor: theme.colors.divider,
    paddingVertical: 1,
    marginVertical: theme.spacing.md,
    marginHorizontal: 20,
  },
  passwordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  pButtonText: {
    ...theme.Typography.body,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.primary,
  },
  changePassFields: {
    paddingHorizontal: 20,
    gap: theme.spacing.sm,
  },
  updateButton: {
    backgroundColor: theme.colors.textPrimary,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  updateButtonText: {
    ...theme.Typography.body,
    color: theme.colors.white,
    fontFamily: 'OpenSans-Bold',
    textTransform: 'uppercase',
  },
  cancelButton: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
});

export default EditProfileScreen;
