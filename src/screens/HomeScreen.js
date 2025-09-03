import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import { useNavigation } from '@react-navigation/native';

const booksData = [
  {
    id: '1',
    image: 'https://covers.openlibrary.org/b/id/11153258-L.jpg',
    price: 24.99,
    timePosted: '2023-10-15T12:00:00Z',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    location: 'New York, NY',
    seller: {
      name: 'John Doe',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: '2',
    image: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
    price: 19.99,
    timePosted: '2023-11-05T09:30:00Z',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    location: 'Los Angeles, CA',
    seller: {
      name: 'Jane Smith',
      profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  // More books...
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showRightButtons={true}
        rightIconTwo="bell"
        onPressTwo={() => navigation.navigate('Notification')}
      />

      <View style={styles.flatList}>
        <FlatList
          data={booksData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              onPress={() => navigation.navigate('BookDetail', { book: item })}
            />
          )}
          contentContainerStyle={{ padding: theme.spacing.md }}
        />
      </View>
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
