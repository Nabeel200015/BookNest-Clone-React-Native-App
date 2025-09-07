import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import ToggleButtons from '../components/ToggleButtons';
import Back from '../assets/icons/backarrow.svg';
import { useNavigation } from '@react-navigation/native';

const BookRequestsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}
      >
        <Back width={30} height={30} />
      </TouchableOpacity>

      <View style={styles.headerTextContainer}>
        <Text style={styles.title}>Book Requests</Text>
      </View>

      <ToggleButtons
        toggleOptions={['Recieved Requests', 'Sent Requests']}
        defualtActive={'Recieved Requests'}
        style={styles.toggleBtns}
      />
    </SafeAreaView>
  );
};

export default BookRequestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  back: {
    marginTop: theme.spacing.md,
    marginStart: theme.spacing.md,
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.sm,
    marginHorizontal: 20,
  },
  title: {
    ...theme.Typography.header,
    fontFamily: 'OpenSans-Bold',
    color: theme.colors.textPrimary,
  },
  caption: {
    ...theme.Typography.body,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  },
  toggleBtns: {
    marginVertical: theme.spacing.sm,
    width: '89%',
    alignSelf: 'center',
  },
});
