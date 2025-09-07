import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { getToken } from '../utils/storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const options = [
    {
      id: 1,
      text: 'View & Edit Profile',
      Icon: 'user-pen',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 2,
      text: 'My Books',
      Icon: 'book-bookmark',
      onPress: () => navigation.navigate('MyBooks'),
    },
    {
      id: 3,
      text: 'Book Requests',
      Icon: 'inbox',
      onPress: () => navigation.navigate('BookRequests'),
    },
    {
      id: 4,
      text: 'Logout',
      Icon: 'arrow-right-from-bracket',
      onPress: handleLogout,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Profile'} />
      <ScrollView style={styles.container}>
        {/*Profile Card*/}
        <View style={styles.profileCardView}>
          <LinearGradient
            style={styles.profileCard}
            colors={['#2A48DE', '#1e88e5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
              resizeMode="cover"
            />

            <View style={styles.profileTextContainer}>
              <Text style={styles.name}>Jhon Doe</Text>
              <Text style={styles.email}>jhondoe321@gmail.com</Text>
            </View>
          </LinearGradient>
        </View>

        {/*Liked Books and Notification Buttons*/}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'rgb(255, 235, 238)' }]}
            onPress={() => navigation.navigate('LikedBooks')}
            activeOpacity={0.6}
          >
            <Icon
              name={'heart'}
              size={24}
              color={theme.colors.textSecondary}
              iconStyle={'regular'}
            />
            <Text style={[styles.buttonText, { color: 'rgb(231, 131, 132)' }]}>
              Liked Books
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'rgb(214, 234, 250)' }]}
            onPress={() => navigation.navigate('Notification')}
            activeOpacity={0.6}
          >
            <Icon
              name={'bell'}
              size={24}
              color={theme.colors.textSecondary}
              iconStyle={'regular'}
            />
            <Text style={[styles.buttonText, { color: 'rgb(99, 163, 226)' }]}>
              Notifications
            </Text>
          </TouchableOpacity>
        </View>

        {/*Options Buttons */}
        <View style={styles.optionButtonsContainer}>
          {options.map((btn, idx) => (
            <TouchableOpacity
              style={styles.option}
              key={btn.id}
              onPress={btn.onPress}
            >
              <Icon
                name={btn.Icon}
                size={20}
                iconStyle={'solid'}
                color={
                  btn.id === 4
                    ? 'rgba(241, 116, 118, 1)'
                    : theme.colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.optionText,
                  btn.id === 4 && { color: 'rgba(246, 106, 109, 1)' },
                ]}
              >
                {btn.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileCardView: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  profileCard: {
    width: '90%',
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: theme.radius.full,
    marginRight: theme.spacing.sm,
  },
  profileTextContainer: {
    gap: theme.spacing.xs,
    // alignItems: 'center',
  },
  name: {
    ...theme.Typography.subtitle,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textInverse,
  },
  email: {
    ...theme.Typography.body,
    color: theme.colors.textInverse,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: theme.spacing.md,
    marginVertical: theme.spacing.xs,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius: theme.radius.xl,
    gap: theme.spacing.xs,
  },
  buttonText: {
    ...theme.Typography.subtitle,
  },
  optionButtonsContainer: {
    gap: theme.spacing.md,
    marginHorizontal: 20,
    marginTop: theme.spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: theme.radius.xl,
  },
  optionText: {
    ...theme.Typography.subtitle,
    marginStart: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
});
