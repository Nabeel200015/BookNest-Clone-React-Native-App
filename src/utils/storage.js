import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

//Save Token
export const saveToken = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log('Error saving token:', error);
  }
};

//Get Token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    return console.log('Error getting token:', error) || null;
  }
};

//Remove Token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log('Error removing token:', error);
  }
};
