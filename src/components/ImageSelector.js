import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from '@react-native-vector-icons/fontawesome6';
import ImagePlus from '../assets/images/add_Image.svg';
import theme from '../constants/theme';

const ImageSelector = ({ onImageChange, onRemoveImage }) => {
  const [image, setImage] = useState(null);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        return console.log('Image Picker error:', response.errorMessage);
      } else if (response.assets) {
        console.log('Response :', response.assets?.[0]);
        const image = response.assets?.[0];

        setImage(image);

        if (onImageChange) {
          onImageChange(image);
        }
      }
    });
  };

  const removeImage = () => {
    if (onRemoveImage) {
      onRemoveImage(image);
    }
    setImage(null);
  };

  return (
    <View style={styles.uploadContainer}>
      {image ? (
        <>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: image?.uri }}
          />
          <TouchableOpacity style={styles.removeIcon} onPress={removeImage}>
            <Icon
              name="xmark"
              iconStyle={'solid'}
              size={24}
              color={'rgba(0, 0, 0, 0.8)'}
            />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.upload} onPress={selectImage}>
          <ImagePlus width={54} height={54} />
          <Text style={styles.addText}>Add Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
  },
  upload: {
    height: 140,
    backgroundColor: theme.colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.lg,
    gap: theme.spacing.sm,
  },
  removeIcon: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.sm,
    zIndex: 1,
  },
  addText: {
    ...theme.Typography.body,
    color: theme.colors.textTertiary,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: theme.radius.lg,
  },
});
