import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Icon from '@react-native-vector-icons/fontawesome6';
import LikedBookCard from '../components/LikedBookCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { toggleWishlist } from '../redux/wishlistSlice';

import { addWishlist } from '../redux/wishlistSlice';

const LikedBooksScreen = () => {
  const { wishlist } = useSelector(state => state.wishlist);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleLike = ({ book }) => {
    dispatch(toggleWishlist(book));
    dispatch(addWishlist(book._id));
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoid}>
        <Header title={'Liked Books'} showBackButton />
        {wishlist.length === 0 ? (
          <View style={styles.centerContent}>
            <Icon
              name="book-open"
              iconStyle={'solid'}
              size={50}
              color={'rgb(224, 224, 224)'}
            />
            <Text style={styles.noResultsText}>
              No books found in your wishlist
            </Text>
          </View>
        ) : (
          <View style={styles.flatList}>
            <FlatList
              data={wishlist}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <LikedBookCard
                  book={item}
                  onPress={() =>
                    navigation.navigate('BookDetail', { book: item })
                  }
                  onPressLike={() => toggleLike({ book: item })}
                />
              )}
              contentContainerStyle={{ padding: theme.spacing.md }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

export default LikedBooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  noResultsText: {
    color: theme.colors.textTertiary,
    ...theme.Typography.subtitle,
  },
  flatList: {
    flex: 1,
  },
});
