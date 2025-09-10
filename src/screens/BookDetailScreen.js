import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import ImageCarousel from '../components/ImageCarousel';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import SellerRecommendationCard from '../components/SellerRecommendationCard';
import booknest from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../redux/bookSlice';
import MakeOfferModal from '../components/MakeOfferModal';
import Toast from 'react-native-toast-message';
import ContactSellerModal from '../components/ContactSellerModal';

const BookDetailScreen = () => {
  const route = useRoute().params;
  const navigation = useNavigation();
  const { books, wishlist } = useSelector(state => state.book);
  const dispatch = useDispatch();
  const book = route?.book;
  console.log('Book :', book);

  const [offerPrice, setOfferPrice] = useState('');
  const [makeOffer, setMakeOffer] = useState(false);
  const makeOfferOpen = () => setMakeOffer(true);
  const makeOfferClose = () => setMakeOffer(false);

  const [contactSeller, setContactSeller] = useState(false);
  const contactSellerOpen = () => setContactSeller(true);
  const contactSellerClose = () => setContactSeller(false);

  const isBookWishlisted = (wishlist || []).some(p => p._id === book._id);
  // console.log('isBookWishlisted :', isBookWishlisted);

  const sellerBooks = books.filter(
    b => b.user._id === book.user._id && b._id !== book._id,
  );
  // console.log('sellerBooks :', sellerBooks);

  const toggleLikeBook = async item => {
    try {
      dispatch(toggleWishlist(book));
      Toast.show({
        position: 'top',
        type: 'success',
        text1: isBookWishlisted
          ? 'Book unliked successfully!'
          : 'Book liked successfully!',
        text1Style: { color: theme.colors.success },
      });

      const response = await booknest.put(`/books/addwishlist/${item._id}`);
      console.log('Like Book API Res:', response.data);
    } catch (error) {
      console.log('Like Book API Error:', error.response?.data?.message);
      return Toast.show({
        position: 'top',
        type: 'error',
        text1: 'Failed to like book!',
        text1Style: { color: theme.colors.error },
        text2: 'Please try again.',
      });
    }
  };

  const handleSubmitBid = async amount => {
    try {
      const response = await booknest.post(`/books/requestbid/${book._id}`, {
        amount: amount,
      });
      console.log('Bid API Res:', response.data);
      return Toast.show({
        position: 'top',
        type: 'success',
        text1: 'Bid sent successfully!',
        text1Style: { color: theme.colors.success },
        text2: `Bid Amount: ${amount}`,
      });
    } catch (error) {
      console.log('Bid API Error:', error.response?.data?.message);
      return Toast.show({
        position: 'top',
        type: 'error',
        text1: 'Bid sent failed!',
        text1Style: { color: theme.colors.error },
        text2: 'Please try again.',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/*Header Navigations */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            style={styles.iconButton}
          >
            <Icon
              name={'chevron-left'}
              size={22}
              color={'rgba(255, 255, 255, 0.6)'}
              iconStyle={'solid'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            // onPress={() => navigation.goBack()}
            accessibilityLabel="Share"
            style={styles.iconButton}
          >
            <Icon
              name={'share-nodes'}
              size={22}
              color={'rgba(255, 255, 255, 0.6)'}
              iconStyle={'solid'}
            />
          </TouchableOpacity>
        </View>

        {/*Image Carousel*/}
        <ImageCarousel
          images={book.images}
          autoPlay={false}
          showPagination={true}
        />

        {/*Detail Card*/}
        <View style={styles.detailCard}>
          {/* Info Section contains Book Name, Price, and like Icon */}
          <View style={styles.infoSection}>
            <View style={styles.infoTextSection}>
              <Text style={styles.bookName}>{book.title}</Text>
              <Text style={styles.price}>Rs {book.price}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.likeButton,
                isBookWishlisted && {
                  backgroundColor: 'rgba(247, 39, 39, 0.2)',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => toggleLikeBook(book)}
            >
              <Icon
                name={'heart'}
                size={24}
                color={
                  isBookWishlisted
                    ? theme.colors.error
                    : theme.colors.textTertiary
                }
                iconStyle={isBookWishlisted ? 'solid' : 'regular'}
              />
            </TouchableOpacity>
          </View>

          {/*Discription Section contains discription which user provide*/}
          <View style={styles.discriptionSection}>
            <Text style={styles.discriptionTitle}>Description</Text>

            <Text style={styles.discriptionText}>{book.description}</Text>
          </View>

          {/*Profile Detail with profile Picture, name, and member joined date */}
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${book.user.firstname}+${book.user.lastname}`,
              }}
              style={styles.profileImage}
            />

            <View style={styles.profileText}>
              <Text
                style={styles.name}
              >{`${book.user.firstname} ${book.user.lastname}`}</Text>
              <Text style={styles.memberSince}>Member since 6/13/2025</Text>
            </View>
          </View>

          {/*Buttons*/}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={contactSellerOpen}>
              <LinearGradient
                style={styles.button}
                colors={['#2A48DE', '#1e88e5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Icon
                  name={'comment-dots'}
                  size={24}
                  color={theme.colors.white}
                  iconStyle={'solid'}
                />
                <Text style={styles.buttonText}>Contact Seller</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.chatButton]}>
              <Icon
                name={'comments'}
                size={24}
                color={theme.colors.primary}
                iconStyle={'solid'}
              />
              <Text
                style={[styles.buttonText, { color: theme.colors.primary }]}
              >
                Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={makeOfferOpen}>
              <LinearGradient
                style={styles.button}
                colors={['#9c27b0', '#3949ab']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Icon
                  name={'sack-dollar'}
                  size={24}
                  color={theme.colors.warning}
                  iconStyle={'solid'}
                />
                <Text style={styles.buttonText}>Make an Offer</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/*Recommedation Card */}
        <View style={styles.recommendationCard}>
          {/*Heading */}
          <Text style={styles.headingText}>More From This Seller</Text>

          {/*Recommedation Books FlatList */}
          {sellerBooks.length > 0 ? (
            <View style={styles.flatList}>
              <FlatList
                data={sellerBooks}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <SellerRecommendationCard
                    book={item}
                    onPress={() =>
                      navigation.navigate('BookDetail', { book: item })
                    }
                  />
                )}
                // contentContainerStyle={{ padding: theme.spacing.md }}
                scrollEnabled={false}
              />
            </View>
          ) : (
            <Text style={styles.infoText}>
              There is no more Books avalaible...
            </Text>
          )}
          <MakeOfferModal
            visible={makeOffer}
            bookTitle={book.title}
            originalPrice={book.price}
            onClose={makeOfferClose}
            offerAmount={offerPrice}
            setOfferAmount={setOfferPrice}
            onSubmit={handleSubmitBid}
          />
          <ContactSellerModal
            visible={contactSeller}
            onClose={contactSellerClose}
            number={book.user.phoneno}
          />
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    // backgroundColor: 'red',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden',
    left: 0,
    top: 0,
  },
  iconButton: {
    paddingVertical: theme.spacing.sm,
  },
  detailCard: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.background,
    ...theme.shadow.lg,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTextSection: {
    gap: 5,
  },
  bookName: {
    ...theme.Typography.subtitle,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textPrimary,
  },
  price: {
    ...theme.Typography.title,
    fontFamily: 'OpenSans-Bold',
    color: theme.colors.primary,
  },
  likeButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.round,
  },
  discriptionSection: {
    gap: 4,
    marginVertical: 10,
  },
  discriptionTitle: {
    ...theme.Typography.subtitle,
    color: theme.colors.textPrimary,
    fontFamily: 'OpenSans-SemiBold',
  },
  discriptionText: {
    ...theme.Typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'auto',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    marginVertical: theme.spacing.sm,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.full,
    marginRight: theme.spacing.sm,
  },
  profileText: {
    flex: 1,
  },
  name: {
    ...theme.Typography.subtitle,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textPrimary,
  },
  memberSince: {
    ...theme.Typography.caption,
    color: theme.colors.textSecondary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  button: {
    width: 90,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    ...theme.Typography.body,
    fontFamily: 'OpenSans-Bold',
    color: theme.colors.textInverse,
  },
  chatButton: {
    borderWidth: 2.5,
    borderColor: theme.colors.primary,
  },
  recommendationCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
    ...theme.shadow.lg,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  headingText: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 36,
    textAlign: 'center',
  },
  flatList: {
    flex: 1,
    marginTop: theme.spacing.sm,
  },
  infoText: {
    ...theme.Typography.subtitle,
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: theme.spacing.md,
    width: '80%',
    color: theme.colors.info,
  },
});

export default BookDetailScreen;
