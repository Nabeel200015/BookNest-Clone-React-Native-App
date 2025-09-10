// src/components/MakeOfferModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import theme from '../constants/theme';

const MakeOfferModal = ({
  visible,
  onClose,
  onSubmit,
  originalPrice,
  bookTitle,
  offerAmount,
  setOfferAmount,
}) => {
  const handleSubmit = () => {
    if (!offerAmount || isNaN(offerAmount) || parseFloat(offerAmount) <= 0) {
      // You can add validation feedback here
      return;
    }
    // console.log('Offer Price :', parseFloat(offerAmount));

    if (onSubmit) {
      onSubmit(parseFloat(offerAmount));
    }
    setOfferAmount('');
    onClose();
  };

  const handleClose = () => {
    setOfferAmount('');
    onClose();
  };

  const formatPrice = amount => {
    return `Rs ${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalCard}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>Make an Offer</Text>
                  <TouchableOpacity
                    onPress={handleClose}
                    style={styles.closeButton}
                  >
                    <Icon
                      name="xmark"
                      size={24}
                      color={theme.colors.textTertiary}
                      iconStyle="solid"
                    />
                  </TouchableOpacity>
                </View>
                {/* Book Title (optional) */}
                {bookTitle && (
                  <Text style={styles.bookTitle} numberOfLines={1}>
                    {bookTitle}
                  </Text>
                )}
                {/* Subtitle */}
                <Text style={styles.subtitle}>Your offer amount</Text>
                {/* Amount Input */}
                <View
                  style={[styles.inputContainer, styles.inputContainerFocused]}
                >
                  <Text style={styles.currencyText}>Rs</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    placeholderTextColor={theme.colors.textTertiary}
                    value={offerAmount}
                    onChangeText={setOfferAmount}
                    keyboardType="phone-pad"
                  />
                </View>
                {/* Original Price */}
                <Text style={styles.originalPrice}>
                  Original price: {formatPrice(originalPrice)}
                </Text>
                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.submitButton,
                      !offerAmount && styles.submitButtonDisabled,
                    ]}
                    onPress={handleSubmit}
                    disabled={!offerAmount}
                  >
                    <Text style={styles.submitButtonText}>Send Offer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  keyboardAvoid: {
    width: '100%',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    ...theme.shadow.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.Typography.title,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  bookTitle: {
    ...theme.Typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  subtitle: {
    ...theme.Typography.subtitle,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
  },
  inputContainerFocused: {
    borderColor: theme.colors.primary,
    ...theme.shadow.sm,
  },
  currencyText: {
    ...theme.Typography.title,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    ...theme.Typography.body,
    color: theme.colors.textPrimary,
    padding: 0,
  },
  originalPrice: {
    ...theme.Typography.caption,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  cancelButtonText: {
    ...theme.Typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.textTertiary,
    opacity: 0.6,
  },
  submitButtonText: {
    ...theme.Typography.body,
    color: theme.colors.white,
    fontWeight: '600',
  },
});

export default MakeOfferModal;
