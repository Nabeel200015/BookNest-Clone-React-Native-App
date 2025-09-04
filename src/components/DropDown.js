import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import theme from '../constants/theme';
import { Menu } from 'react-native-paper';
import Icon from '@react-native-vector-icons/fontawesome6';

const DropDown = ({ label, onOptionChange, options = [] }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleMenu = async () => {
    if (visible) {
      return setVisible(false);
    } else {
      return setVisible(true);
    }
  };

  const handleOptionSelect = option => {
    setSelectedOption(option);
    toggleMenu();
    if (onOptionChange) {
      onOptionChange(option);
    }
  };
  return (
    <View style={styles.dropDownContainer}>
      <Menu
        anchorPosition="bottom"
        visible={visible}
        onDismiss={toggleMenu}
        anchor={
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.dropdownButton}
            onPress={toggleMenu}
          >
            <Text
              style={[
                styles.labelText,
                selectedOption && styles.selectedMenuItem,
              ]}
              numberOfLines={1}
            >
              {selectedOption ? selectedOption : label}
            </Text>
            <Icon
              name={'angle-down'}
              size={18}
              color={theme.colors.textTertiary}
              iconStyle="solid"
            />
          </TouchableOpacity>
        }
        contentStyle={styles.menuContent}
        style={{ flex: 1 }}
      >
        {options.map(item => (
          <Menu.Item
            key={item}
            onPress={() => handleOptionSelect(item)}
            title={item}
            titleStyle={[
              styles.menuItemText,
              selectedOption === item && styles.selectedMenuItem,
            ]}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    flex: 1,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.inputBackground,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  labelText: {
    flex: 1,
    ...theme.Typography.subtitle,
    color: theme.colors.textTertiary,
  },
  menuContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
  },
  menuItemText: {
    ...theme.Typography.body,
    color: theme.colors.textPrimary,
  },
  selectedMenuItem: {
    color: theme.colors.textPrimary,
  },
});

export default DropDown;
