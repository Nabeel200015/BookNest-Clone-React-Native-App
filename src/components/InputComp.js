import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from '../constants/theme';

const InputComp = ({
  inputStyle,
  leftIcon,
  placeholder,
  inlineStyle,
  keyboardType,
  value,
  onChangeText,
  secureTextEntry = false,
  rightIcon,
  onPressRightIcon,
  ...props
}) => {
  const [visible, setVisible] = useState(true);
  return (
    <View style={[styles.input, inputStyle]}>
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={18}
          color={theme.colors.textTertiary}
          iconStyle="solid"
        />
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textTertiary}
        style={[styles.inline, inlineStyle]}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={visible}
        {...props}
      />

      {rightIcon && (
        <TouchableOpacity
          style={styles.rightIcon}
          activeOpacity={0.8}
          onPress={() => setVisible(!visible)}
        >
          <Icon
            name={!visible ? 'eye-slash' : 'eye'}
            size={18}
            color={theme.colors.textTertiary}
            iconStyle="solid"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  inline: {
    flex: 1,
    ...theme.Typography.body,
    color: theme.colors.textPrimary,
    marginStart: theme.spacing.sm,
  },
  rightIcon: {
    marginStart: theme.spacing.sm,
  },
});

export default InputComp;
