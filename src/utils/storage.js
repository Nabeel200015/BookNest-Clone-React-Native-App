import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

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
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token === null) {
      throw new Error('Token not found');
    }
    return token;
  } catch (error) {
    console.log('Error getting token:', error.message);
    return null;
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

//Save User
export const saveUser = async user => {
  try {
    await AsyncStorage.setItem(USER_KEY, user);
  } catch (error) {
    console.log('Error saving user:', error);
  }
};

//Get User
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    if (user === null) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.log('Error getting user:', error.message);
    return null;
  }
};

//Remove User
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.log('Error removing user:', error);
  }
};
