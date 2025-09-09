// src/components/BookCard.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from '../constants/theme';

const BookCard = ({
  book,
  onPress,
  style,
  showSellerInfo = true,
  showTimePosted = true,
}) => {
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

  // Function to format time posted
  const formatTimePosted = dateString => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffWeeks = Math.floor(diffDays / 7);

    if (diffDays < 1) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffWeeks === 1) {
      return '1 week ago';
    } else if (diffWeeks < 4) {
      return `${diffWeeks} weeks ago`;
    } else if (diffMonths === 1) {
      return '1 month ago';
    } else {
      return `${diffMonths} months ago`;
    }
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
          source={{ uri: `http://192.168.18.40:3000/${book.images[0]}` }}
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
        {/* Book Title and Author */}
        <Text style={styles.bookTitle} numberOfLines={1}>
          {book.title}
        </Text>
        <Text style={styles.authorText} numberOfLines={1}>
          by {book.author}
        </Text>

        {/* Time Posted and Location */}
        <View style={styles.metaContainer}>
          {showTimePosted && (
            <View style={styles.metaItem}>
              <Icon
                name="clock"
                size={14}
                color={theme.colors.textTertiary}
                iconStyle="regular"
              />
              <Text style={styles.metaText}>
                {formatTimePosted(book.createdAt)}
              </Text>
            </View>
          )}

          <View style={styles.metaItem}>
            <Icon
              name="location-dot"
              size={14}
              color={theme.colors.primary}
              iconStyle="solid"
            />
            <Text style={styles.metaText} numberOfLines={1}>
              {`${book.user.address.city}/${book.user.address.country}`}
            </Text>
          </View>
        </View>

        {/* Seller Info */}
        {showSellerInfo && (
          <View style={styles.sellerContainer}>
            <View style={styles.profileDetail}>
              <Image
                source={{
                  uri: book.user.profileImage
                    ? `http://192.168.18.40:3000/${book.user.profileImage}`
                    : `https://ui-avatars.com/api/?name=${book.user.firstname}+${book.user.lastname}`,
                }}
                style={styles.sellerImage}
              />
              <Text style={styles.sellerName} numberOfLines={1}>
                {`${book.user.firstname} ${book.user.lastname}`}
              </Text>
            </View>

            <View style={styles.viewDetail}>
              <Icon
                name="eye"
                size={14}
                color={theme.colors.textTertiary}
                iconStyle="solid"
              />
              <Text style={styles.metaText} numberOfLines={1}>
                View Details
              </Text>
            </View>
          </View>
        )}
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
  bookTitle: {
    ...theme.Typography.subtitle,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
  },
  authorText: {
    ...theme.Typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  metaText: {
    ...theme.Typography.caption,
    color: theme.colors.textTertiary,
    marginLeft: theme.spacing.xs,
    fontSize: 12,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  sellerImage: {
    width: 24,
    height: 24,
    borderRadius: theme.radius.lg,
    marginRight: theme.spacing.sm,
  },
  sellerName: {
    ...theme.Typography.caption,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  profileDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  viewDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BookCard;
