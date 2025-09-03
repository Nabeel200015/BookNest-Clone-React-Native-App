import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import Icon from '@react-native-vector-icons/fontawesome6';
import Logo from '../assets/images/logo.svg';
import { useNavigation } from '@react-navigation/native';

const Header = ({
  showBackButton = false,
  showRightButtons = false,
  rightIconOne = '',
  rightIconTwo = '',
  onPressOne,
  onPressTwo,
  title,
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
                name="chevron-left"
                size={24}
                color={theme.colors.textPrimary}
                iconStyle="solid"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          {title ? (
            <Text style={styles.logoText}>{title}</Text>
          ) : (
            <Logo width={120} height={120} />
          )}
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
                    size={24}
                    color={theme.colors.textSecondary}
                    iconStyle="solid"
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
                    size={24}
                    color={theme.colors.textSecondary}
                    iconStyle="solid"
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
    minWidth: 20,
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
    minWidth: 20,
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
  logoText: {
    ...theme.Typography.title,
    textTransform: 'capitalize',
    fontFamily: 'OpenSans-Bold',
    color: theme.colors.primary,
  },
});

export default Header;
