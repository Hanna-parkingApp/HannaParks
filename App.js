import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/app/store';
import Router from './src/routes/Router';

export default function App() {

  return (
      <Provider store={store}>
        <Router />
        <StatusBar style='auto' />
      </Provider>
  );
}

