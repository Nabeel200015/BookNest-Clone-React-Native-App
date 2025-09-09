// src/components/SellerRecommendationCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../constants/theme';

const SellerRecommendationCard = ({ book, onPress, style }) => {
  console.log('Book received in SellerRecommendationCard:', book);

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

  // Function to format the date
  const formatDate = dateString => {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const imageUrl =
    book.images && book.images.length > 0
      ? `http://192.168.18.40:3000/${book.images[0]}`
      : 'https://via.placeholder.com/150'; // fallback image

  const sellerName = book.user
    ? `${book.user.firstname} ${book.user.lastname}`
    : 'Unknown Seller';

  const formattedDate = book.createdAt
    ? formatDate(book.createdAt)
    : 'Unknown Date';
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Book Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
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
        {/* Book Title */}
        <Text style={styles.bookTitle} numberOfLines={1}>
          {book.title || 'Untitled'}
        </Text>

        {/* Seller Info and Date */}
        <View style={styles.metaContainer}>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerLabel}>Seller: </Text>
            <Text style={styles.sellerName} numberOfLines={1}>
              {sellerName}
            </Text>
          </View>

          <Text style={styles.dateText}>{formattedDate}</Text>
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
    // width: 160,
    ...theme.shadow.md,
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
    minWidth: 50,
    alignItems: 'center',
  },
  priceText: {
    color: theme.colors.white,
    ...theme.Typography.caption,
  },
  content: {
    padding: theme.spacing.sm,
    // backgroundColor: 'red',
  },
  bookTitle: {
    ...theme.Typography.body,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    // backgroundColor: 'blue',
    height: 40, // Fixed height for 2 lines
  },
  metaContainer: {
    marginTop: theme.spacing.xs,
    // backgroundColor: 'green',
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sellerLabel: {
    fontSize: 11,
    color: theme.colors.textTertiary,
  },
  sellerName: {
    ...theme.Typography.caption,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textSecondary,
    flex: 1,
  },
  dateText: {
    fontSize: 10,
    color: theme.colors.textTertiary,
  },
});

export default SellerRecommendationCard;
