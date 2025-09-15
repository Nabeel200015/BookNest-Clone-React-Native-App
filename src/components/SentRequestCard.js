import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import theme from '../constants/theme';
import Icon from '@react-native-vector-icons/fontawesome6';

const SentRequestCard = ({ item }) => {
  const { books } = useSelector(state => state.book);
  const book = books.find(p => p._id === item.item.book);

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
    <View style={styles.container}>
      {/* Book Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `http://192.168.18.40:3000/${book.images[0]}` }}
          style={styles.bookImage}
          resizeMode="cover"
        />

        {/* Price Badge */}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.item.status}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Price */}
        <Text style={styles.price}>{formatPrice(book.price)}</Text>

        {/* Title */}
        <Text style={styles.title}>{book.title}</Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {book.description}
        </Text>

        {/* Book info */}
        <View style={styles.infoContainer}>
          <View style={styles.column}>
            <View style={styles.info}>
              <Icon
                name="user"
                iconStyle={'solid'}
                size={14}
                color={theme.colors.primary}
              />
              <Text style={styles.infoText}>{book.author}</Text>
            </View>
            <View style={styles.info}>
              <Icon
                name="bookmark"
                iconStyle={'solid'}
                size={14}
                color={theme.colors.primary}
              />
              <Text style={styles.infoText}>{book.genre}</Text>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.info}>
              <Icon
                name="star"
                iconStyle={'solid'}
                size={14}
                color={theme.colors.primary}
              />
              <Text style={styles.infoText}>{book.condition}</Text>
            </View>
            <View style={styles.info}>
              <Icon
                name="calendar"
                iconStyle={'solid'}
                size={14}
                color={theme.colors.primary}
              />
              <Text style={styles.infoText}>{book.year}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SentRequestCard;

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
  statusBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgb(254, 243, 199)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.md,
    ...theme.shadow.sm,
  },
  statusText: {
    color: 'rgb(180, 83, 9)',
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
  },
  content: {
    padding: theme.spacing.md,
  },
  price: {
    ...theme.Typography.subtitle,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.primary,
  },
  title: {
    ...theme.Typography.title,
    fontFamily: 'OpenSans-SemiBold',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.xs,
  },
  description: {
    flexShrink: 1,
    ...theme.Typography.body,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.sm,
  },
  infoContainer: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    width: '50%',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  infoText: {
    ...theme.Typography.caption,
    color: theme.colors.textPrimary,
  },
});
