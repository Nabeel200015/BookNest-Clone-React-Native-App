// src/components/SellerRecommendationCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../constants/theme';

const SellerRecommendationCard = ({ book, onPress, style }) => {
  const { image, price, title, sellerName, dateUploaded } = book;

  // Function to format the price
  const formatPrice = amount => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  // Function to format the date
  const formatDate = dateString => {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Book Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.bookImage}
          resizeMode="cover"
        />

        {/* Price Badge */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{formatPrice(price)}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Book Title */}
        <Text style={styles.bookTitle} numberOfLines={2}>
          {title}
        </Text>

        {/* Seller Info and Date */}
        <View style={styles.metaContainer}>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerLabel}>Sold by </Text>
            <Text style={styles.sellerName} numberOfLines={1}>
              {sellerName}
            </Text>
          </View>

          <Text style={styles.dateText}>{formatDate(dateUploaded)}</Text>
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
    ...theme.shadow.sm,
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
  },
  bookTitle: {
    ...theme.Typography.body,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    height: 40, // Fixed height for 2 lines
  },
  metaContainer: {
    marginTop: theme.spacing.xs,
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
