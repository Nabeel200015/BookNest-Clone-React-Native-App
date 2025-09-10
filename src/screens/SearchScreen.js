import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import booknest from '../services/api';
import SearchBookCard from '../components/SearchBookCard';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await booknest.get('/books/searchbook', {
        params: {
          title: searchQuery,
          genre: selectedCategory === 'All' ? '' : selectedCategory,
        },
      });
      console.log('Search Res:', response.data);

      setResults(response.data || []);
    } catch (error) {
      console.log('API Error', error.response?.data?.error);
      // setError(error.response?.data?.error || 'Failed to search');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Debounced search
  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 500); // 500ms debounce

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [searchQuery, selectedCategory]);

  // useEffect(() => {
  //   console.log(
  //     'Search and Catogary :',
  //     `Searched ${searchQuery} and Category ${selectedCategory}`,
  //   );
  //   if (!searchQuery) {
  //     handleSearch();
  //   }
  // }, [searchQuery, selectedCategory]);

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
          onSubmit={handleSearch}
        />
        {results.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <SearchBookCard
                key={item._id}
                book={item}
                onPress={() =>
                  navigation.navigate('BookDetail', { book: item })
                }
              />
            )}
            contentContainerStyle={styles.resultsList}
          />
        )}
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
  resultsList: {
    padding: theme.spacing.md,
  },
  bookCard: {
    marginBottom: theme.spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.error,
    ...theme.Typography.body,
  },
  noResultsText: {
    color: theme.colors.textSecondary,
    ...theme.Typography.body,
  },
});

export default SearchScreen;
