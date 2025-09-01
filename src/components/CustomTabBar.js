// src/components/CustomTabBar.js
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from '../constants/theme';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { bottom } = useSafeAreaInsets();

  // Tab configuration - updated to match the actual route names in your navigator
  const tabs = [
    {
      name: 'Home',
      icon: 'house',
      label: 'Home',
    },
    {
      name: 'Search',
      icon: 'magnifying-glass',
      label: 'Search',
    },
    {
      name: 'AddBookScreen', // This should match the screen name in your navigator
      icon: 'plus',
      label: 'Add Book',
      isSpecial: true,
    },
    {
      name: 'Library',
      icon: 'book-bookmark',
      label: 'Library',
    },
    {
      name: 'Profile',
      icon: 'user',
      label: 'Profile',
    },
  ];

  return (
    <View
      style={[styles.container, { paddingBottom: bottom > 0 ? bottom : 10 }]}
    >
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          // For the Add Book tab, we need special handling
          if (tab.isSpecial) {
            return (
              <TouchableOpacity
                key={tab.name}
                accessibilityRole="button"
                accessibilityLabel={tab.label}
                onPress={() => navigation.navigate(tab.name)}
                style={styles.specialTab}
                activeOpacity={0.7}
              >
                <View style={styles.specialTabInner}>
                  <Icon
                    name={tab.icon}
                    size={28}
                    color={theme.colors.white}
                    iconStyle="solid" // Use "solid" instead of iconStyle="solid"
                  />
                </View>
              </TouchableOpacity>
            );
          }

          // Find the route index for regular tabs
          const routeIndex = state.routes.findIndex(
            route => route.name === tab.name,
          );
          const isFocused = state.index === routeIndex;
          const { options } = descriptors[state.routes[routeIndex]?.key] || {};

          return (
            <TouchableOpacity
              key={tab.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={
                options?.tabBarAccessibilityLabel || tab.label
              }
              testID={options?.tabBarTestID}
              onPress={() => navigation.navigate(tab.name)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Icon
                name={tab.icon}
                size={22}
                color={
                  isFocused ? theme.colors.primary : theme.colors.textTertiary
                }
                iconStyle="solid"
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused
                      ? theme.colors.primary
                      : theme.colors.textTertiary,
                  },
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  specialTab: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
  },
  specialTabInner: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.lg, // Make sure this is defined in your theme
  },
  tabLabel: {
    ...theme.Typography.caption, // Fixed typo: should be lowercase 'typography'
    marginTop: theme.spacing.xs,
    fontFamily: 'OpenSans-Medium',
  },
});

export default CustomTabBar;
