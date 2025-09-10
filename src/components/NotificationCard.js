import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '../constants/theme';

const NotificationCard = ({ notify }) => {
  const item = notify;

  const getTimeAgo = isoString => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString(); // Fallback to date format for older dates
    }
  };
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: `https://ui-avatars.com/api/?name=${item.sender.firstname}+${item.sender.lastname}`,
        }}
        resizeMode="cover"
      />
      <View style={styles.textFields}>
        <Text style={styles.senderName}>
          {`${item.sender.firstname} `}
          <Text style={styles.message}>{item.message}</Text>
        </Text>
        <Text style={styles.time}>{getTimeAgo(item.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    ...theme.shadow.md,
    flexDirection: 'row',
    borderRadius: theme.radius.md,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: theme.radius.full,
  },
  textFields: {
    flexShrink: 1,
    gap: theme.spacing.xs,
  },
  senderName: {
    ...theme.Typography.body,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textPrimary,
  },
  message: {
    fontFamily: 'OpenSans-Regular',
  },
  time: {
    ...theme.Typography.caption,
    color: theme.colors.textTertiary,
  },
});
export default NotificationCard;
