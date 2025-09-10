import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import theme from '../constants/theme';
import Icon from '@react-native-vector-icons/fontawesome6';
import Toast from 'react-native-toast-message';

const ContactSellerModal = ({ visible, onClose, number }) => {
  const handleCall = async () => {
    const phoneUrl = `tel:${number}`;
    try {
      await Linking.openURL(phoneUrl);
    } catch (error) {
      console.log('Error opening phone dialer:', error);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text1Style: { color: theme.colors.error },
        text2: 'Phone dialer is not available on this device',
      });
    } finally {
      onClose();
    }
  };

  const handleWhatsapp = async () => {
    const whatsappNumber = number.replace('/[^d]g', '');
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}`;

    try {
      await Linking.openURL(whatsappUrl);
    } catch (error) {
      console.log('Error opening whatsapp:', error);
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text1Style: { color: theme.colors.error },
        text2: 'Whatsapp is not available on this device',
      });
    } finally {
      onClose();
    }
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.headerText}>Contact Seller</Text>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.button, styles.whatsapp]}
              activeOpacity={0.8}
              onPress={handleWhatsapp}
            >
              <Icon
                name="whatsapp"
                color={theme.colors.textInverse}
                iconStyle={'brand'}
                size={24}
              />
              <Text style={styles.btnText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.callnow]}
              activeOpacity={0.8}
              onPress={handleCall}
            >
              <Icon
                name="phone"
                color={theme.colors.textInverse}
                iconStyle={'solid'}
                size={22}
              />
              <Text style={styles.btnText}>Call Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancel]}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Text
                style={[styles.btnText, { color: theme.colors.textTertiary }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  modalCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    ...theme.shadow.lg,
  },
  headerText: {
    ...theme.Typography.title,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    color: theme.colors.textPrimary,
  },
  btnContainer: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    paddingVertical: 12,
    borderRadius: theme.radius.lg,
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 28,
    color: theme.colors.textInverse,
  },
  whatsapp: {
    backgroundColor: 'rgb(76, 174, 80)',
  },
  callnow: {
    backgroundColor: 'rgb(33, 148, 241)',
  },
  cancel: {
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
});
export default ContactSellerModal;
