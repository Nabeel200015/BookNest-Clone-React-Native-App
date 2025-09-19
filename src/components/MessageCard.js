import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import { useSelector } from 'react-redux';

const MessageCard = ({ item }) => {
  // console.log('Item:', item);

  const { user } = useSelector(state => state.user);
  const isMine = item?.user?._id === user?._id;

  return (
    <View
      style={[
        styles.messageContainer,
        isMine ? styles.myMessage : styles.otherMessage,
      ]}
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <Text style={[styles.messageText, isMine && styles.myText]}>
        {item.message}
      </Text>
      <Text style={[styles.time, isMine && styles.myText]}>
        {new Date(item?.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 6,
    padding: 10,
    borderRadius: 15,
    elevation: 2,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    ...theme.Typography.body,
    color: '#000',
  },
  myText: {
    color: '#fff',
  },
  time: {
    ...theme.Typography.caption,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});
