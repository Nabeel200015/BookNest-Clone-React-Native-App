import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import Icon from '@react-native-vector-icons/material-icons';
import Logo from '../assets/images/logo.svg';
import { useNavigation } from '@react-navigation/native';

const Header = ({
  showBackButton = false,
  showRightButtons = false,
  rightIconOne = '',
  rightIconTwo = '',
  onPressOne,
  onPressTwo,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.6}
              accessibilityLabel="Go back"
              style={styles.backButton}
            >
              <Icon
                name="arrow-back-ios"
                size={24}
                color={theme.colors.textPrimary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          <Logo width={120} height={120} />
        </View>
        {/* Right Section */}
        <View style={styles.rightSection}>
          {/* Right Icons */}
          {showRightButtons && (
            <View style={styles.iconsContainer}>
              {rightIconOne && (
                <TouchableOpacity
                  onPress={onPressOne}
                  activeOpacity={0.6}
                  accessibilityLabel="Go back"
                  style={styles.backButton}
                >
                  <Icon
                    name={rightIconOne}
                    size={28}
                    color={theme.colors.textPrimary}
                  />
                </TouchableOpacity>
              )}

              {rightIconTwo && (
                <TouchableOpacity
                  onPress={onPressTwo}
                  activeOpacity={0.6}
                  accessibilityLabel="Go back"
                  style={styles.backButton}
                >
                  <Icon
                    name={rightIconTwo}
                    size={28}
                    color={theme.colors.textPrimary}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    height: 60,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  leftSection: {
    height: 60,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: 40,
    // backgroundColor: 'red',
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  centerSection: {
    height: 60,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  rightSection: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 40,
    // backgroundColor: 'blue',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
    position: 'relative',
  },
});

export default Header;
