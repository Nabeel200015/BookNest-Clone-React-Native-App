import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';

const MessagesScreen = () => {
  const navigation = useNavigation();
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
          source={require('../assets/images/profile.png')}
          style={styles.Image}
          resizeMode="cover"
        />

        <View style={styles.headerContent}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.staus}>Online</Text>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.messagesView}></View>
      </KeyboardAvoidingView>

      {/* message input */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={theme.colors.divider}
          multiline
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.sendBtn}>
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
  messagesView: {
    flex: 1,
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
