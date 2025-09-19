import {
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import socket from '../services/socket';
import { BASE_URL } from '../utils/routes';
import MessageCard from '../components/MessageCard';
import { useSelector } from 'react-redux';

const MessagesScreen = () => {
  const flatListRef = useRef();
  const navigation = useNavigation();
  const route = useRoute().params;
  const room = route?.room;
  const { user } = useSelector(state => state.user);

  const [text, setText] = useState('');

  const [chatRoom, setChatRoom] = useState(room || null);
  const [messages, setMessages] = useState([]);

  // console.log('Chat Room :', chatRoom);
  // console.log('user :', user);

  const handleSendMessage = () => {
    if (!text) return console.log('Please enter a message');
    socket.emit('send_message', {
      senderId: user._id,
      receiverId: chatRoom?.receiver?._id,
      message: text,
    });

    setText('');
  };

  //check room if exists get chat room messages
  useEffect(() => {
    const handleChatMessages = msgs => {
      console.log('Messages :', msgs);

      setMessages(msgs);
    };

    const handleRecievedMessage = msg => {
      console.log('Received Message :', msg);
      setMessages(prev => [...prev, msg]);
    };

    socket.emit('get_chat_room_messages', chatRoom._id);
    socket.on('chat_room_messages', handleChatMessages);
    socket.on('received_message', handleRecievedMessage);

    return () => {
      socket.off('chat_room_messages', handleChatMessages);
      socket.off('received_message', handleRecievedMessage);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            size={24}
            color={theme.colors.textPrimary}
            iconStyle={'solid'}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: `${BASE_URL}/${chatRoom?.receiver?.profileimage}` }}
          style={styles.Image}
          resizeMode="cover"
        />

        <View style={styles.headerContent}>
          <Text style={styles.title}>
            {`${chatRoom?.receiver?.firstname} ${chatRoom?.receiver?.lastname}`}
          </Text>
          <Text style={styles.staus}>Online</Text>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => <MessageCard item={item} />}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
          contentContainerStyle={styles.messagesList}
        />
      </KeyboardAvoidingView>

      {/* message input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={theme.colors.divider}
          multiline
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.sendBtn}
          onPress={handleSendMessage}
        >
          <Icon
            name="paper-plane"
            size={20}
            color={theme.colors.divider}
            iconStyle={'solid'}
            style={{ right: 1 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    height: 60,
    ...theme.shadow.md,
    alignItems: 'center',
    flexDirection: 'row',
  },
  back: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingEnd: theme.spacing.sm,
  },
  Image: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    borderColor: theme.colors.white,
    borderWidth: 1,
  },
  headerContent: {
    marginStart: theme.spacing.sm,
    top: -2,
  },
  title: {
    ...theme.Typography.subtitle,
    color: theme.colors.textInverse,
  },
  staus: {
    ...theme.Typography.body,
    color: theme.colors.textInverse,
  },
  messagesList: {
    // flex: 1,
    padding: theme.spacing.sm,
  },
  inputView: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  input: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: 'rgba(133, 164, 235, 0.83)',
    borderRadius: theme.radius.full,
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
    ...theme.Typography.subtitle,
    color: theme.colors.textInverse,
  },
  sendBtn: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    backgroundColor: 'rgba(133, 164, 235, 0.83)',
    borderRadius: theme.radius.full,
    alignItems: 'center',
  },
});
