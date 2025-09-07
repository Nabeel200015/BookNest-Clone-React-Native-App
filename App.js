import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppInitializer from './src/components/AppInitializer';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppInitializer>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AppInitializer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
