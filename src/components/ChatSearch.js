import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from '../constants/theme';

const ChatSearch = ({
  value,
  onChangeText,
  placeholder = 'Search by name...',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon
          name="magnifying-glass"
          size={18}
          color={theme.colors.divider}
          style={styles.searchIcon}
          iconStyle={'solid'}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.divider}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.md,
    height: 50,
    backgroundColor: 'rgba(133, 164, 235, 0.83)',
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.divider,
    paddingVertical: theme.spacing.sm,
    ...Platform.select({
      android: {
        paddingVertical: 0, // Android has different padding behavior
      },
    }),
  },
});

export default ChatSearch;
