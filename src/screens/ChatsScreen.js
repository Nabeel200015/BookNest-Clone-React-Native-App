import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import ChatSearch from '../components/ChatSearch';
import socket from '../services/socket';
import { useSelector } from 'react-redux';
import ChatCard from '../components/ChatCard';

const ChatsScreen = () => {
  const { user } = useSelector(state => state.user);
  const navigation = useNavigation();
  const [chatRooms, setchatRooms] = useState([]);
  const [searchChat, setSearchChat] = useState('');

  // Memoized search results for better performance
  const searchResultsMemo = useMemo(() => {
    if (!searchChat.trim()) {
      return chatRooms;
    }

    return chatRooms.filter(chat => {
      try {
        const fullName = `${chat.receiver?.firstname || ''} ${
          chat.receiver?.lastname || ''
        }`.toLowerCase();
        return fullName.includes(searchChat.toLowerCase().trim());
      } catch (err) {
        console.warn('Error filtering chat:', err);
        return false;
      }
    });
  }, [chatRooms, searchChat]);

  //get Chats
  useEffect(() => {
    const handleChatRooms = chats => {
      const sortChats = chats.sort((a, b) => {
        const timeA = a.lastMessage?.createdAt
          ? new Date(a.lastMessage.createdAt).getTime()
          : 0;
        const timeB = b.lastMessage?.createdAt
          ? new Date(b.lastMessage.createdAt).getTime()
          : 0;
        return timeB - timeA;
      });
      setchatRooms(sortChats);
    };

    if (user?._id) {
      socket.on('chat_rooms', handleChatRooms);
      socket.emit('get_chat_rooms', user._id);
    }

    return () => {
      socket.off('chat_rooms', handleChatRooms);
    };
  }, [user?._id]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoid}>
        <Header
          title={'Chats'}
          rightIconTwo="bell"
          showRightButtons
          onPressTwo={() => navigation.navigate('Notification')}
        />
        <ChatSearch value={searchChat} onChangeText={setSearchChat} />

        <ScrollView style={styles.chatRoomsView} scrollEnabled>
          {searchResultsMemo.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.colors.textSecondary }}>
                No Chats
              </Text>
            </View>
          ) : (
            searchResultsMemo.map((chat, index) => (
              <ChatCard
                key={index}
                chat={chat}
                onPress={() => navigation.navigate('Messages', { room: chat })}
              />
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatRoomsView: {
    flex: 1,
  },
});
