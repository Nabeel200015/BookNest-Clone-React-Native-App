// src/components/SearchBar.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { Menu, Divider } from 'react-native-paper';
import theme from '../constants/theme';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search books...',
  onFilterChange,
  style,
}) => {
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Fiction',
    'Non Fiction',
    'Mystery',
    'Science',
    'Biography',
    'Others',
  ];

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setIsFilterMenuVisible(!isFilterMenuVisible);
    if (onFilterChange) {
      onFilterChange(category);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Icon
          name="magnifying-glass"
          size={18}
          color={theme.colors.textTertiary}
          style={styles.searchIcon}
          iconStyle={'solid'}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
      </View>

      {/* Filter Button with Menu */}
      <Menu
        visible={isFilterMenuVisible}
        onDismiss={() => setIsFilterMenuVisible(false)}
        anchor={
          <TouchableOpacity
            onPress={() => setIsFilterMenuVisible(!isFilterMenuVisible)}
            style={styles.filterButton}
            accessibilityLabel="Filter options"
          >
            <Icon
              name="filter"
              size={18}
              color={theme.colors.primary}
              iconStyle={'solid'}
            />
            {selectedCategory !== 'All' && (
              <View style={styles.filterIndicator} />
            )}
          </TouchableOpacity>
        }
        contentStyle={styles.menuContent}
      >
        <Menu.Item
          onPress={() => handleCategorySelect('All')}
          title="All Categories"
          titleStyle={[
            styles.menuItemText,
            selectedCategory === 'All' && styles.selectedMenuItem,
          ]}
        />
        <Divider />
        {categories
          .filter(cat => cat !== 'All')
          .map(category => (
            <Menu.Item
              key={category}
              onPress={() => handleCategorySelect(category)}
              title={category}
              titleStyle={[
                styles.menuItemText,
                selectedCategory === category && styles.selectedMenuItem,
              ]}
            />
          ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.md,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.sm,
    ...Platform.select({
      android: {
        paddingVertical: 0, // Android has different padding behavior
      },
    }),
  },
  filterButton: {
    // backgroundColor: 'red',
    width: 50,
    height: 50,
    // backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
    position: 'relative',
  },
  filterIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  menuContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.sm,
  },
  menuItemText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  selectedMenuItem: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default SearchBar;
