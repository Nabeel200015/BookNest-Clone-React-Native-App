import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import ImageCarousel from '../components/ImageCarousel';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import SellerRecommendationCard from '../components/SellerRecommendationCard';

const recommendations = [
  {
    id: '1',
    image: 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
    price: 24.99,
    title: 'The Great Gatsby',
    sellerName: 'John Doe',
    dateUploaded: '2025-06-13',
  },
  {
    id: '2',
    image: 'https://covers.openlibrary.org/b/id/11153258-L.jpg',

    price: 19.99,
    title: 'To Kill a Mockingbird',
    sellerName: 'Jane Smith',
    dateUploaded: '2025-06-12',
  },
  {
    id: '3',
    image: 'https://covers.openlibrary.org/b/id/10958305-L.jpg',
    price: 29.99,
    title: '1984',
    sellerName: 'BookLover42',
    dateUploaded: '2025-06-11',
  },
  // More books...
];

const BookDetailScreen = () => {
  const navigation = useNavigation();

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
          images={[
            'https://covers.openlibrary.org/b/id/10521270-L.jpg',
            'https://covers.openlibrary.org/b/id/11153258-L.jpg',
            'https://covers.openlibrary.org/b/id/10958305-L.jpg',
          ]}
          autoPlay={true}
          showPagination={true}
        />

        {/*Detail Card*/}
        <View style={styles.detailCard}>
          {/* Info Section contains Book Name, Price, and like Icon */}
          <View style={styles.infoSection}>
            <View style={styles.infoTextSection}>
              <Text style={styles.bookName}>Book Name</Text>
              <Text style={styles.price}>Rs 20000</Text>
            </View>

            <TouchableOpacity
              style={styles.likeButton}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Icon
                name={'heart'}
                size={24}
                color={theme.colors.error}
                iconStyle={'solid'}
              />
            </TouchableOpacity>
          </View>

          {/*Discription Section contains discription which user provide*/}
          <View style={styles.discriptionSection}>
            <Text style={styles.discriptionTitle}>Description</Text>

            <Text style={styles.discriptionText}>
              this book is for sell and exchange please make sure to contact via
              chat or message me in whatsapp
            </Text>
          </View>

          {/*Profile Detail with profile Picture, name, and member joined date */}
          <View style={styles.profileCard}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />

            <View style={styles.profileText}>
              <Text style={styles.name}>Name</Text>
              <Text style={styles.memberSince}>Member since 6/13/2025</Text>
            </View>
          </View>

          {/*Buttons*/}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
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

            <TouchableOpacity>
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
          <FlatList
            data={recommendations}
            keyExtractor={item => item.id}
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
      </ScrollView>
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
    backgroundColor: 'rgba(247, 39, 39, 0.2)',
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
    justifyContent: 'space-evenly',
    marginTop: theme.spacing.md,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 90,
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,

    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  buttonText: {
    width: 70,
    textAlign: 'center',
    ...theme.Typography.body,
    fontFamily: 'OpenSans-Bold',
    color: theme.colors.textInverse,
    // backgroundColor: 'blue',
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
});

export default BookDetailScreen;
