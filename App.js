import auth from '@react-native-firebase/auth';
import Navigation from './src/components/Navigation';

import {useState, useEffect} from 'react';

import Login from './src/screens/Login';
import Toast from 'react-native-toast-message';
import {View} from 'react-native';
import 'json-circular-stringify';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(auth().currentUser);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <View className="flex-1 bg-slate-50">
      {!user ? <Login /> : <Navigation />}
      <Toast />
    </View>
  );
}

export default App;
