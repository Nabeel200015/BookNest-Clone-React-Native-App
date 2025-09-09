// src/components/ImageCarousel.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import theme from '../constants/theme';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = ({
  images,
  imageStyle,
  containerStyle,
  showPagination = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-play functionality
  React.useEffect(() => {
    let interval;
    if (autoPlay && images.length > 1) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        goToPage(nextIndex);
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [autoPlay, currentIndex, images.length, autoPlayInterval]);

  const goToPage = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
    setCurrentIndex(index);
  };

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Calculate the current index
    const index = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      <Image
        source={
          typeof item === 'string'
            ? { uri: `http://192.168.18.40:3000/${item}` }
            : item
        }
        style={[styles.image, imageStyle]}
        resizeMode="cover"
      />
    </View>
  );

  const renderPagination = () => {
    if (!showPagination || images.length <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
            onPress={() => goToPage(index)}
          />
        ))}
      </View>
    );
  };

  if (!images || images.length === 0) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No images available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        onScrollToIndexFailed={info => {
          // Fallback if scroll fails
          setTimeout(() => goToPage(info.index), 100);
        }}
      />

      {renderPagination()}

      {/* Image counter
      {images.length > 1 && (
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {currentIndex + 1} / {images.length}
          </Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 300,
    backgroundColor: theme.colors.surface,
  },
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.xs,
    opacity: 0.6,
  },
  paginationDotActive: {
    opacity: 1,
    width: 12,
    backgroundColor: theme.colors.primary,
  },
  counterContainer: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.md,
  },
  counterText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  placeholderText: {
    ...theme.Typography.body,
    color: theme.colors.textTertiary,
  },
});

export default ImageCarousel;
