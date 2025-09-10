import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import NotificationCard from '../components/NotificationCard';

const NotificationScreen = () => {
  const { notifications } = useSelector(state => state.book);
  console.log('Notifys:', notifications);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoid}>
        <Header title={'Notification'} showBackButton />

        {notifications.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.noResultsText}>No notifications yet...</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <NotificationCard notify={item} />}
            contentContainerStyle={styles.flatList}
            style={{ flex: 1 }}
            ItemSeparatorComponent={<View style={{ paddingVertical: 6 }} />}
          />
        )}
      </KeyboardAvoidingView>
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    color: theme.colors.textSecondary,
    ...theme.Typography.subtitle,
  },
  flatList: {
    padding: theme.spacing.md,
  },
});

export default NotificationScreen;
