import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import { BASE_URL } from '../utils/routes';

const ChatCard = ({ chat, onPress }) => {
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
    <TouchableOpacity style={styles.chat} activeOpacity={0.8} onPress={onPress}>
      <Image
        source={{
          uri: `${BASE_URL}/${chat.receiver?.profileimage}`,
        }}
        style={styles.chatImage}
      />
      <View style={styles.chatContent}>
        <View style={styles.nameView}>
          <Text
            style={styles.name}
          >{`${chat.receiver?.firstname} ${chat.receiver?.lastname}`}</Text>
          <Text style={styles.msgTime}>
            {chat?.lastMessage && getTimeAgo(chat?.lastMessage?.createdAt)}
          </Text>
        </View>
        <Text style={styles.msg} numberOfLines={1}>
          {chat?.lastMessage ? chat?.lastMessage?.message : 'No messages yet'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  chat: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xs,
    // alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  chatContent: {
    flex: 1,
    // gap: theme.spacing.xs,
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  name: {
    ...theme.Typography.subtitle,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textPrimary,
  },
  msgTime: {
    ...theme.Typography.caption,
    color: theme.colors.textSecondary,
  },
  msg: {
    ...theme.Typography.body,
    color: theme.colors.primary,
  },
});
