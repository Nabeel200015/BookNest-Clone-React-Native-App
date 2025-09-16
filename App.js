import React from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
