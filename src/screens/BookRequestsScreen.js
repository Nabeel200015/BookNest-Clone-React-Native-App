import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../constants/theme';
import ToggleButtons from '../components/ToggleButtons';
import Icon from '@react-native-vector-icons/fontawesome6';
import Back from '../assets/icons/backarrow.svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import SentRequestCard from '../components/SentRequestCard';

const BookRequestsScreen = () => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState('Recieved Requests');
  const sentRequests = useSelector(state => state.auth).user.sentrequests;

  console.log('books :', sentRequests);

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
        onToggleChange={setToggle}
      />

      {toggle === 'Recieved Requests' ? (
        <View style={styles.centerContent}>
          <Icon
            name="inbox"
            iconStyle={'solid'}
            size={50}
            color={'rgb(224, 224, 224)'}
          />
          <Text style={styles.noResultTitleText}>
            {toggle === 'Recieved Requests'
              ? 'No Received Requests'
              : 'Sent Requests'}
          </Text>
          <Text style={styles.noResultsText}>
            {toggle === 'Recieved Requests'
              ? "You haven't received any book requests yet."
              : "You haven't sent any book requests yet."}
          </Text>
        </View>
      ) : sentRequests.length === 0 ? (
        <View style={styles.centerContent}>
          <Icon
            name="inbox"
            iconStyle={'solid'}
            size={50}
            color={'rgb(224, 224, 224)'}
          />
          <Text style={styles.noResultTitleText}>
            {toggle === 'Recieved Requests'
              ? 'No Received Requests'
              : 'Sent Requests'}
          </Text>
          <Text style={styles.noResultsText}>
            {toggle === 'Recieved Requests'
              ? "You haven't received any book requests yet."
              : "You haven't sent any book requests yet."}
          </Text>
        </View>
      ) : (
        <View style={styles.flatList}>
          <FlatList
            data={sentRequests}
            keyExtractor={item => item._id}
            renderItem={item => <SentRequestCard item={item} />}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>
      )}
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  noResultTitleText: {
    color: theme.colors.textPrimary,
    ...theme.Typography.subtitle,
    fontFamily: 'OpenSans-SemiBold',
  },
  noResultsText: {
    color: theme.colors.textTertiary,
    ...theme.Typography.body,
  },
  flatList: {
    flex: 1,
  },
});
