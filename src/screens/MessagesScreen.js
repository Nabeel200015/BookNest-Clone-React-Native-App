import {
  FlatList,
  Image,
  KeyboardAvoidingView,
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
import * as ImagePicker from 'react-native-image-picker';

const MessagesScreen = () => {
  const flatListRef = useRef();
  const navigation = useNavigation();
  const route = useRoute().params;
  const room = route?.room;
  const sellerId = route?.sellerId;
  const { user } = useSelector(state => state.user);
  const [image, setImage] = useState(null);

  const [text, setText] = useState('');

  const [chatRoom, setChatRoom] = useState(room || null);
  const [messages, setMessages] = useState([]);

  // console.log('Chat Room :', chatRoom);
  // // console.log('user :', user);

  const handlePickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
      },
      response => {
        if (response.didCancel || response.errorMessage) return;

        const image = response.assets[0];
        console.log('Image :', image);

        setImage(image);
      },
    );
  };

  const handleRemoveImage = () => setImage(null);

  const handleSendMessage = () => {
    if (!text) return console.log('Please enter a message');
    console.log('senderId:', user._id);
    console.log('otherUserId:', chatRoom?.otherUser?._id);

    socket.emit('send_message', {
      senderId: user._id,
      receiverId: chatRoom?.otherUser?._id,
      message: text,
    });
    setText('');
  };

  useEffect(() => {
    const handleChatRooms = chats => {
      const filter = chats.map(room => {
        const otherUser =
          room.receiver._id === user._id ? room.sender : room.receiver;
        return {
          lastMessage: room.lastMessage || null,
          otherUser: otherUser,
          _id: room._id,
        };
      });
      // console.log('Chat Rooms :', filter);

      const sellerChatRoom = filter.find(c => c.otherUser?._id === sellerId);
      // console.log('Seller Chat Room :', sellerChatRoom);

      setChatRoom(sellerChatRoom);
      // console.log('Room set done :', sellerChatRoom);
    };

    if (!chatRoom) {
      socket.on('chat_rooms', handleChatRooms);
    }

    return () => socket.off('chat_rooms', handleChatRooms);
  }, []);

  useEffect(() => {
    const handleChatMessages = msgs => {
      console.log('Messages :', msgs);

      setMessages(msgs);
    };

    const handleRecievedMessage = msg => {
      console.log('Received Message :', msg);
      setMessages(prev => [...prev, msg]);
    };

    if (chatRoom) {
      socket.emit('get_chat_room_messages', chatRoom._id);
      socket.on('chat_room_messages', handleChatMessages);
      socket.on('received_message', handleRecievedMessage);
    } else {
      console.log('get a room first');
    }

    return () => {
      socket.off('chat_room_messages', handleChatMessages);
      socket.off('received_message', handleRecievedMessage);
    };
  }, [chatRoom]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.back}
          onPress={() => navigation.replace('Tab')}
        >
          <Icon
            name="arrow-left"
            size={24}
            color={theme.colors.textPrimary}
            iconStyle={'solid'}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: `${BASE_URL}/${chatRoom?.otherUser?.profileimage}` }}
          style={styles.Image}
          resizeMode="cover"
        />

        <View style={styles.headerContent}>
          <Text style={styles.title}>
            {chatRoom &&
              `${chatRoom?.otherUser?.firstname} ${chatRoom?.otherUser?.lastname}`}
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
      <View style={styles.inputTray}>
        {image && (
          <View style={styles.imageView}>
            <Image
              source={{ uri: image.uri }}
              style={styles.sendImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.removeImage}
              activeOpacity={0.5}
              onPress={handleRemoveImage}
            >
              <Icon
                name="xmark"
                size={20}
                color={theme.colors.textPrimary}
                iconStyle={'solid'}
              />
            </TouchableOpacity>
          </View>
        )}

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
            style={styles.addImage}
            onPress={handlePickImage}
          >
            <Icon
              name="file-image"
              size={20}
              color={theme.colors.divider}
              iconStyle={'solid'}
              style={{ right: 1 }}
            />
          </TouchableOpacity>

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
  inputTray: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
  imageView: {
    alignSelf: 'flex-start',

    marginBottom: theme.spacing.sm,
    marginStart: theme.spacing.sm,
  },
  sendImage: {
    borderRadius: theme.radius.md,
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  removeImage: {
    position: 'absolute',
    top: 2,
    right: 5,
    padding: theme.spacing.xs,
  },
  inputView: {
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
  addImage: {
    padding: theme.spacing.sm,
    justifyContent: 'center',
    // backgroundColor: 'rgba(133, 164, 235, 0.83)',
    borderRadius: theme.radius.full,
    alignItems: 'center',
  },
});
