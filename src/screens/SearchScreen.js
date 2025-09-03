import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    console.log(
      'Search and Catogary :',
      `Searched ${searchQuery} and Category ${selectedCategory}`,
    );
  }, [searchQuery, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoid}>
        <Header
          title={'Search'}
          showBackButton
          showRightButtons
          rightIconOne="heart"
          onPressOne={() => navigation.navigate('LikedBooks')}
        />
        <SearchBar
          style={{ marginVertical: theme.spacing.md }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterChange={setSelectedCategory}
          placeholder="Search for books..."
        />
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
});

export default SearchScreen;
