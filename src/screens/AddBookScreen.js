import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import theme from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import InputComp from '../components/InputComp';
import DropDown from '../components/DropDown';
import ImageSelector from '../components/ImageSelector';
import ButtonComp from '../components/ButtonComp';
import booknest from '../services/api';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const AddBookScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    title: '',
    genre: '',
    price: '',
    description: '',
    websiteUrl: '',
    author: '',
    condition: '',
    year: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateForm = form => {
    const errors = {};

    if (!form.title || form.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }

    if (!form.genre) {
      errors.genre = 'Genre is required';
    }

    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
      errors.price = 'Price must be a valid number greater than 0';
    }

    if (!form.description || form.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }

    if (form.websiteUrl) {
      const urlPattern = /^(https?:\/\/)?([\w\-])+\.{1}[a-zA-Z]{2,}(\/.*)?$/;
      if (!urlPattern.test(form.websiteUrl)) {
        errors.websiteUrl = 'Website URL is not valid';
      }
    }

    if (!form.author) {
      errors.author = 'Author is required';
    }

    if (!form.condition) {
      errors.condition = 'Condition is required';
    }

    if (
      !form.year ||
      isNaN(form.year) ||
      form.year < 1900 ||
      form.year > new Date().getFullYear()
    ) {
      errors.year = 'Year must be valid';
    }

    return errors;
  };

  const handlePostBook = async ({ bookData, images }) => {
    const error = validateForm(bookData);

    if (Object.keys(error).length > 0) {
      const errorMessages = Object.values(error).join('\n');
      console.log('Errors:', errorMessages);

      Toast.show({
        type: 'error',
        text1: 'Validation errors!',
        text2: errorMessages,
        text1Style: { color: theme.colors.error },
        text2Style: { color: theme.colors.error },
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      //append fields
      Object.keys(bookData).forEach(key => {
        formData.append(key, bookData[key]);
      });

      //append images
      images.forEach((img, idx) => {
        formData.append('images', {
          uri: img.uri,
          type: img.type || 'image/jpeg',
          name: img.fileName || `photo_${idx}.jpg`,
        });
      });
      console.log('FormData :', formData);

      const response = await booknest.post('/books/addbook', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Post Book Resp:', response.data);
      Toast.show({
        type: 'success',
        text1: response.data?.message,
        text1Style: { color: theme.colors.success },
      });
      navigation.replace('Tab');
    } catch (error) {
      console.error(
        'Error adding book:',
        error.response?.data?.message || error.message,
      );
      Toast.show({
        type: 'error',
        text1: error.response.data?.message,
        text1Style: { color: theme.colors.error },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton title={'Post Book Ad'} />
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoid}>
          {/*Book Fields Container*/}
          <View style={styles.fieldContainer}>
            <View style={styles.columnFields}>
              <InputComp
                leftIcon={'book'}
                placeholder={'Enter Book Name'}
                keyboardType={'default'}
                value={form.title}
                onChangeText={text => setForm({ ...form, title: text })}
              />
              <InputComp
                leftIcon={'user'}
                placeholder={'Enter Author Name'}
                keyboardType={'default'}
                value={form.author}
                onChangeText={text => setForm({ ...form, author: text })}
              />
            </View>

            <View style={styles.columnFields}>
              <View style={{ flex: 1 }}>
                <InputComp
                  leftIcon={'calendar'}
                  placeholder={'Enter Published Year'}
                  keyboardType={'phone-pad'}
                  maxLength={4}
                  value={form.year}
                  onChangeText={text => setForm({ ...form, year: text })}
                />
              </View>
              <DropDown
                label={'Genre'}
                options={[
                  'Fiction',
                  'Non Fiction',
                  'Mystery',
                  'Science',
                  'Biography',
                  'Others',
                ]}
                onOptionChange={text => setForm({ ...form, genre: text })}
              />
            </View>

            <View style={styles.columnFields}>
              <InputComp
                leftIcon={'dollar-sign'}
                placeholder={'Enter Price'}
                keyboardType={'phone-pad'}
                value={form.price}
                onChangeText={text => setForm({ ...form, price: text })}
              />
              <InputComp
                leftIcon={'link'}
                placeholder={'Enter Website URL'}
                keyboardType={'default'}
                value={form.websiteUrl}
                onChangeText={text => setForm({ ...form, websiteUrl: text })}
              />
            </View>

            <View style={styles.imageUploadContainer}>
              <Text style={styles.title}>Upload Images</Text>
              <Text style={styles.note}>
                Share Your Book: Upload up to 4 images!
              </Text>
              <View style={styles.uploadGrid}>
                <View style={styles.columnFields}>
                  <ImageSelector
                    onImageChange={image => {
                      const addImage = [...images, image];
                      setImages(addImage);
                    }}
                    onRemoveImage={image => {
                      const filteredImages = images.filter(
                        img => img.uri !== image.uri,
                      );
                      setImages(filteredImages);
                    }}
                  />
                  <ImageSelector
                    onImageChange={image => {
                      const addImage = [...images, image];
                      setImages(addImage);
                    }}
                    onRemoveImage={image => {
                      const filteredImages = images.filter(
                        img => img.uri !== image.uri,
                      );
                      setImages(filteredImages);
                    }}
                  />
                </View>
                <View style={styles.columnFields}>
                  <ImageSelector
                    onImageChange={image => {
                      const addImage = [...images, image];
                      setImages(addImage);
                    }}
                    onRemoveImage={image => {
                      const filteredImages = images.filter(
                        img => img.uri !== image.uri,
                      );
                      setImages(filteredImages);
                    }}
                  />
                  <ImageSelector
                    onImageChange={image => {
                      const addImage = [...images, image];
                      setImages(addImage);
                    }}
                    onRemoveImage={image => {
                      const filteredImages = images.filter(
                        img => img.uri !== image.uri,
                      );
                      setImages(filteredImages);
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.subFieldContainer}>
              <Text style={styles.title}>Condition</Text>
              <DropDown
                label={'Condition'}
                options={['New', 'Used']}
                onOptionChange={text => setForm({ ...form, condition: text })}
              />
            </View>

            <View style={styles.subFieldContainer}>
              <Text style={styles.title}>Description</Text>
              <TextInput
                style={styles.discriptionInput}
                placeholder={'Write about your book'}
                placeholderTextColor={theme.colors.textTertiary}
                multiline
                textAlignVertical="top"
                value={form.description}
                onChangeText={text => setForm({ ...form, description: text })}
              />
            </View>

            <ButtonComp
              title={loading ? 'Loading...' : 'Post Book'}
              btnStyle={{ marginTop: theme.spacing.lg }}
              onPress={() => handlePostBook({ bookData: form, images: images })}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  fieldContainer: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  columnFields: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  imageUploadContainer: {},
  title: {
    ...theme.Typography.title,
    color: theme.colors.textPrimary,
  },
  note: {
    ...theme.Typography.body,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.xs,
  },
  uploadGrid: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  subFieldContainer: {
    gap: theme.spacing.sm,
  },
  discriptionInput: {
    padding: theme.spacing.md,
    flex: 1,
    height: 160,
    ...theme.Typography.body,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.radius.md,
  },
});

export default AddBookScreen;
