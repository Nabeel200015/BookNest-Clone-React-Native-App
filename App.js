import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
