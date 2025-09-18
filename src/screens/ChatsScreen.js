import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
  const [searchResults, setSearchResults] = useState([]);

  const getChatRoom = userId => {
    socket.emit('get_chat_rooms', userId);
    socket.on('chat_rooms', chats => {
      setchatRooms(chats);
      console.log('Chat Rooms:', chats);
    });
  };

  //get Chats
  useEffect(() => {
    getChatRoom(user?._id);
  }, []);

  //search Chats
  useEffect(() => {
    if (searchChat === '') {
      return;
    }
    const searchChatRooms = chatRooms.filter(chat => {
      return `${chat.receiver.firstname.toLowerCase()}${chat.receiver.lastname.toLowerCase()} `.includes(
        searchChat.toLowerCase().trim(''),
      );
    });

    setSearchResults(searchChatRooms);

    console.log('Search:', searchChat);
    console.log('searchResults:', searchChatRooms);
  }, [searchChat]);

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
          {chatRooms.length === 0 ? (
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
            (searchChat ? searchResults : chatRooms).map((chat, index) => (
              <ChatCard
                key={index}
                chat={chat}
                onPress={() => navigation.navigate('Messages')}
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
