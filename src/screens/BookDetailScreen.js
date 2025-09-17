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
import Loading from '../components/Loading';
import LinearGradient from 'react-native-linear-gradient';
import SellerRecommendationCard from '../components/SellerRecommendationCard';
import booknest from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedBook, requestBid } from '../redux/bookSlice';
import MakeOfferModal from '../components/MakeOfferModal';
import Toast from 'react-native-toast-message';
import ContactSellerModal from '../components/ContactSellerModal';
import { BASE_URL } from '../utils/routes';
import { addWishlist, toggleWishlist } from '../redux/wishlistSlice';

const BookDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute().params;
  const dispatch = useDispatch();
  const { selectedBook, moreBooks, loading } = useSelector(state => state.book);
  const { user } = useSelector(state => state.user);
  const { wishlist, loading: wishlistLoading } = useSelector(
    state => state.wishlist,
  );

  const book = route?.book;
  const isLiked = (wishlist || []).some(p => p._id === book._id);

  // console.log('wishlist :', wishlist);

  //fetch selected book
  useEffect(() => {
    if (book) {
      dispatch(getSelectedBook(book._id));
    }
  }, [dispatch]);

  //toggle wishlist
  const toggleLike = () => {
    dispatch(toggleWishlist(book));
    dispatch(addWishlist(book._id));
  };

  //Contact Seller
  const [contact, setContact] = useState(false);

  //Make Offer
  const [offerPrice, setOfferPrice] = useState('');
  const [makeOffer, setMakeOffer] = useState(false);

  const handleMakeOffer = () => {
    dispatch(requestBid({ bookId: book._id, amount: offerPrice }));
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
                isLiked && {
                  backgroundColor: 'rgba(247, 39, 39, 0.2)',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => toggleLike()}
              disabled={wishlistLoading}
            >
              <Icon
                name={'heart'}
                size={24}
                color={isLiked ? theme.colors.error : theme.colors.textTertiary}
                iconStyle={isLiked ? 'solid' : 'regular'}
              />
            </TouchableOpacity>
          </View>

          {/*Discription Section contains discription which user provide*/}
          <View style={styles.discriptionSection}>
            <Text style={styles.discriptionTitle}>Description</Text>

            <Text style={styles.discriptionText}>
              {selectedBook.description}
            </Text>
          </View>

          {/*Profile Detail with profile Picture, name, and member joined date */}
          <View style={styles.profileCard}>
            {loading ? (
              <Loading size={'small'} />
            ) : (
              <>
                <Image
                  source={{
                    uri: !selectedBook?.user?.profileimage
                      ? `https://ui-avatars.com/api/?name=${book.user.firstname}+${book.user.lastname}`
                      : BASE_URL + '/' + selectedBook?.user?.profileimage,
                  }}
                  style={styles.profileImage}
                />

                <View style={styles.profileText}>
                  <Text
                    style={styles.name}
                  >{`${selectedBook?.user?.firstname} ${selectedBook?.user?.lastname}`}</Text>
                  <Text style={styles.memberSince}>
                    Member since{' '}
                    {new Date(selectedBook.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </>
            )}
          </View>

          {/*Buttons*/}
          {book.user._id === user?._id ? (
            <View style={styles.yourBookContainer}>
              <LinearGradient
                style={styles.yourBookCard}
                colors={['rgb(232, 245, 234)', 'rgb(227, 242, 251)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Icon
                  name="circle-check"
                  iconStyle={'solid'}
                  size={24}
                  color={'rgb(76, 175, 80)'}
                />

                <Text style={styles.yourBookTitle}>
                  This is your posted book
                </Text>
                <Text style={styles.yourBookSubtitle}>
                  Manage it from your books section
                </Text>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setContact(true)}
              >
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

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setMakeOffer(true)}
              >
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
          )}
        </View>

        {/*Recommedation Card */}
        <View style={styles.recommendationCard}>
          {/*Heading */}
          <Text style={styles.headingText}>More From This Seller</Text>

          {/* Recommedation Books FlatList */}
          {moreBooks.length > 0 ? (
            <View style={styles.flatList}>
              <FlatList
                data={moreBooks}
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

          <ContactSellerModal
            visible={contact}
            onClose={() => setContact(false)}
            number={book.user.phoneno}
          />

          <MakeOfferModal
            visible={makeOffer}
            bookTitle={book.title}
            originalPrice={book.price}
            onClose={() => setMakeOffer(false)}
            offerAmount={offerPrice}
            setOfferAmount={setOfferPrice}
            onSubmit={handleMakeOffer}
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
  yourBookCard: {
    width: '100%',
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    // gap: theme.spacing.sm,
  },
  yourBookContainer: {
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    borderColor: 'rgba(187, 235, 189, 1)',
    marginTop: theme.spacing.sm,
  },
  yourBookTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 28,
    color: 'rgba(45, 114, 53, 1)',
    marginTop: theme.spacing.sm,
  },
  yourBookSubtitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 20,
    color: 'rgba(85, 198, 91, 1)',
  },
});

export default BookDetailScreen;
