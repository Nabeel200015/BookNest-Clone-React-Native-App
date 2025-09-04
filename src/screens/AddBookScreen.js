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

const AddBookScreen = () => {
  const [form, setForm] = useState({
    bookName: '',
    authorName: '',
    publishedYear: '',
    genre: '',
    price: '',
    images: [],
    condition: '',
    description: '',
    webUrl: '',
  });
  const [images, setImages] = useState([]);
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
                value={form.bookName}
                onChangeText={text => setForm({ ...form, bookName: text })}
              />
              <InputComp
                leftIcon={'user'}
                placeholder={'Enter Author Name'}
                keyboardType={'default'}
                value={form.authorName}
                onChangeText={text => setForm({ ...form, authorName: text })}
              />
            </View>

            <View style={styles.columnFields}>
              <View style={{ flex: 1 }}>
                <InputComp
                  leftIcon={'calendar'}
                  placeholder={'Enter Published Year'}
                  keyboardType={'phone-pad'}
                  maxLength={4}
                  value={form.publishedYear}
                  onChangeText={text =>
                    setForm({ ...form, publishedYear: text })
                  }
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
                value={form.webUrl}
                onChangeText={text => setForm({ ...form, webUrl: text })}
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
                      const updatedImages = [...form.images, image];
                      setForm({ ...form, images: updatedImages });
                    }}
                    onRemoveImage={image => {
                      const filteredImages = form.images.filter(
                        img => img.uri !== image.uri,
                      );
                      setForm({ ...form, images: filteredImages });
                    }}
                  />
                  <ImageSelector
                    onImageChange={image => {
                      const updatedImages = [...form.images, image];
                      setForm({ ...form, images: updatedImages });
                    }}
                    onRemoveImage={image => {
                      const filteredImages = form.images.filter(
                        img => img.uri !== image.uri,
                      );
                      setForm({ ...form, images: filteredImages });
                    }}
                  />
                </View>
                <View style={styles.columnFields}>
                  <ImageSelector
                    onImageChange={image => {
                      const updatedImages = [...form.images, image];
                      setForm({ ...form, images: updatedImages });
                    }}
                    onRemoveImage={image => {
                      const filteredImages = form.images.filter(
                        img => img.uri !== image.uri,
                      );
                      setForm({ ...form, images: filteredImages });
                    }}
                  />
                  <ImageSelector
                    onImageChange={image => {
                      const updatedImages = [...form.images, image];
                      setForm({ ...form, images: updatedImages });
                    }}
                    onRemoveImage={image => {
                      const filteredImages = form.images.filter(
                        img => img.uri !== image.uri,
                      );
                      setForm({ ...form, images: filteredImages });
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
              title={'Post Book'}
              btnStyle={{ marginTop: theme.spacing.lg }}
              onPress={() => {
                console.log('Form Data:', form);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
