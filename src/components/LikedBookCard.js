import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import Icon from '@react-native-vector-icons/fontawesome6';

const LikedBookCard = ({ book, onPress, onPressLike }) => {
  console.log('liked Book:', book);

  // Function to format the price
  const formatPrice = amount => {
    // Format as Pakistani Rupees (PKR) with comma separators and Rs prefix
    const num = Number(amount);
    if (isNaN(num)) return 'Rs 0.00';
    return `Rs ${num.toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Book Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `http://192.168.18.40:3000/${book.images[0]}`,
          }}
          style={styles.bookImage}
          resizeMode="cover"
        />

        {/* Price Badge */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{formatPrice(book.price)}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Book title and Like Heart */}
        <View style={styles.titleSection}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <TouchableOpacity
            style={styles.likeButton}
            activeOpacity={0.7}
            onPress={onPressLike}
          >
            <Icon
              name={'heart'}
              size={24}
              color={theme.colors.error}
              iconStyle={'solid'}
            />
          </TouchableOpacity>
        </View>

        {/* description */}
        <Text style={styles.description} numberOfLines={2}>
          {book.description}
        </Text>

        {/* genre */}
        <View style={styles.genreContainer}>
          <Icon
            name="book"
            iconStyle={'solid'}
            size={14}
            color={theme.colors.textTertiary}
          />
          <Text style={styles.genre}>{book.genre}</Text>
        </View>

        {/* Year */}
        <Text style={styles.year}>Year: {book.year}</Text>

        {/* content footer */}
        <View style={styles.footerContainer}>
          {/* user info */}
          <View style={styles.infoContainer}>
            <Text
              style={styles.name}
            >{`${book.user.firstname} ${book.user.lastname}`}</Text>
            <Text style={styles.email}>{book.user.email}</Text>
          </View>

          {/* Book Status */}
          <View style={[styles.bookStatus, styles.availableBook]}>
            <Text style={[styles.statusText, styles.availableText]}>
              Available
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...theme.shadow.md,
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.md,
    ...theme.shadow.sm,
  },
  priceText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    padding: theme.spacing.md,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookTitle: {
    ...theme.Typography.title,
    // marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
  },
  likeButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.round,
  },
  description: {
    width: '90%',
    ...theme.Typography.caption,
    color: theme.colors.textTertiary,
  },
  genreContainer: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  genre: {
    ...theme.Typography.caption,
    color: theme.colors.textTertiary,
  },
  year: {
    ...theme.Typography.caption,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.sm,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  infoContainer: {},
  name: {
    ...theme.Typography.body,
    color: theme.colors.textPrimary,
    fontFamily: 'OpenSans-SemiBold',
  },
  email: {
    ...theme.Typography.caption,
    color: theme.colors.textTertiary,
  },
  bookStatus: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.md,
  },
  statusText: {
    ...theme.Typography.body,
    color: theme.colors.textPrimary,
    fontFamily: 'OpenSans-Medium',
  },
  availableBook: {
    backgroundColor: 'rgb(200, 230, 201)',
  },
  availableText: {
    color: 'rgb(56, 125, 84)',
  },
});
export default LikedBookCard;
