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
import * as imagePicker from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import booknest from '../services/api';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [changePassword, setChangePassword] = useState(false);
  const toggleChangePass = () => setChangePassword(!changePassword);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const [form, setForm] = useState({
    firstname: user.data.firstname || '',
    lastname: user.data.lastname || '',
    phoneno: user.data.phoneno || '',
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const pickimage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
    };
    imagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        return console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        return console.log('Image Picker error:', response.errorMessage);
      } else if (response.assets) {
        console.log('Profile Pic:', response.assets?.[0]);
        const image = response.assets?.[0];

        setProfileImage(image);
      }
    });
  };

  const handleUpdate = async (form, image) => {
    try {
      setLoading(true);
      const formData = new FormData();

      //Append profileImage (if selected)
      if (image) {
        formData.append('profileimage', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.filename || 'profile.jpg',
        });
      }

      //Append text fields
      Object.keys(form).forEach(key => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      console.log('form :', formData);

      const response = await booknest.put('/users/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile Update:', response.data);
      return Toast.show({
        position: 'top',
        type: 'success',
        text1: '✅ Profile updated successfully!',
        text1Style: { color: theme.colors.success },
      });
    } catch (error) {
      console.log('Profile Update Error:', error.response?.data?.message);
      return Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to update profile',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (currentPass, newPass, confPass) => {
    if (newPass !== confPass || !newPass || !confPass) {
      return Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to change password',
        text1Style: { color: theme.colors.error },
        text2: 'Passwords are not matched!!',
      });
    }

    try {
      setLoading(true);
      const response = await booknest.post('/users/change-password', {
        oldPassword: currentPass,
        newPassword: newPass,
      });
      console.log('Password Change:', response.data);
      return Toast.show({
        position: 'top',
        type: 'success',
        text1: '✅ Password changed successfully!',
        text1Style: { color: theme.colors.success },
      });
    } catch (error) {
      console.log('Password Change Error:', error.response?.data?.message);
      return Toast.show({
        position: 'top',
        type: 'error',
        text1: '❌ Failed to change password',
        text1Style: { color: theme.colors.error },
        text2: error.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };
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
              source={
                profileImage
                  ? { uri: profileImage.uri }
                  : require('../assets/images/profile.png')
              }
              resizeMode="cover"
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.uploadIcon}
              activeOpacity={0.8}
              onPress={pickimage}
            >
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
                value={form.firstname}
                onChangeText={text => setForm({ ...form, firstname: text })}
              />
              <InputComp
                leftIcon={'user'}
                placeholder={'Enter Last Name'}
                keyboardType={'default'}
                value={form.lastname}
                onChangeText={text => setForm({ ...form, lastname: text })}
              />
            </View>
            <View style={styles.emailField}>
              <Icon
                name={'envelope'}
                size={18}
                color={theme.colors.textTertiary}
                iconStyle="solid"
              />
              <Text style={styles.emailText}>{user.data.email}</Text>
            </View>
            <InputComp
              leftIcon={'phone'}
              placeholder={'Enter your Phone Number'}
              keyboardType={'phone-pad'}
              value={form.phoneno}
              onChangeText={text => setForm({ ...form, phoneno: text })}
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={() => handleUpdate(form, profileImage)}
            disabled={loading}
          >
            <Text style={styles.saveText}>
              {loading ? 'Loading...' : 'Save Changes'}
            </Text>
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
                value={passwords.current}
                onChangeText={text =>
                  setPasswords({ ...passwords, current: text })
                }
              />
              <InputComp
                leftIcon={'lock'}
                placeholder={'Enter new password'}
                keyboardType={'default'}
                rightIcon
                value={passwords.new}
                onChangeText={text => setPasswords({ ...passwords, new: text })}
              />
              <InputComp
                leftIcon={'lock'}
                placeholder={'Confirm new password'}
                keyboardType={'default'}
                rightIcon
                value={passwords.confirm}
                onChangeText={text =>
                  setPasswords({ ...passwords, confirm: text })
                }
              />

              <TouchableOpacity
                style={styles.updateButton}
                activeOpacity={0.8}
                disabled={loading}
                onPress={() =>
                  handleChangePassword(
                    passwords.current,
                    passwords.new,
                    passwords.confirm,
                  )
                }
              >
                <Text style={styles.updateButtonText}>update password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.5}
                onPress={toggleChangePass}
                disabled={loading}
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
