import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../redux/bookSlice';
import { loadUser } from '../redux/authSlice';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { books, loading, error, currentPage, totalPages } = useSelector(
    state => state.book,
  );

  useEffect(() => {
    //load first page
    dispatch(getBooks({ params: { page: 1, mostpopular: true } }));
  }, []);

  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      dispatch(
        getBooks({
          params: { page: currentPage + 1, mostpopular: true },
          append: true, // 👈 append flag
        }),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showRightButtons={true}
        rightIconTwo="bell"
        onPressTwo={() => navigation.navigate('Notification')}
      />

      {loading && books.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      {error && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{ ...theme.Typography.title, color: theme.colors.warning }}
          >
            Error: {error}
          </Text>
        </View>
      )}
      {books.length > 0 && (
        <View style={styles.flatList}>
          <FlatList
            data={books}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <BookCard
                key={item._id}
                book={item}
                onPress={() =>
                  navigation.navigate('BookDetail', { book: item })
                }
              />
            )}
            contentContainerStyle={{ padding: theme.spacing.md }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  flatList: {
    flex: 1,
  },
});

export default HomeScreen;
