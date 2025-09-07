import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import theme from '../constants/theme';

const ToggleButtons = ({
  defualtActive = '',
  style,
  onToggleChange,
  toggleOptions = [],
}) => {
  const [value, setValue] = useState(defualtActive);
  const handleToggle = toggle => {
    setValue(toggle);

    if (onToggleChange) {
      onToggleChange(toggle);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal>
        {toggleOptions.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.8}
            style={[styles.btn, value === btn && styles.btnActive]}
            onPress={() => handleToggle(btn)}
          >
            <Text
              style={[
                styles.btnText,
                value === btn && { color: theme.colors.textInverse },
              ]}
            >
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    ...theme.shadow.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: theme.radius.lg,
  },
  btn: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  btnText: {
    ...theme.Typography.button,
    textTransform: 'capitalize',
    color: theme.colors.textPrimary,
  },
  btnActive: {
    backgroundColor: theme.colors.primary,
  },
});
export default ToggleButtons;
