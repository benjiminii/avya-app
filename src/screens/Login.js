import {useState, useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {Txt, Btn} from '../components/UI/ExportUI';
import auth from '@react-native-firebase/auth';

import PhoneSignIn from '../components/login/PhoneSingIn';
// import EmailSignIn from '../components/login/EmailSignIn';
import GmailSignIn from '../components/login/GmailSignIn';
import FacebookSignIn from '../components/login/FacebookSignIn';

function Login({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
    <View className="flex-1">
      <Image source={require('../public/images/login/login_shapes.png')} />
      <View className="flex-1 items-center justify-around px-10">
        <Image
          className="w-full"
          source={require('../public/images/login/logo_avya.png')}
          style={{
            resizeMode: 'contain',
          }}
        />
        <Txt
          className={'text-black font-semibold text-center text text-xl'}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          Өөрт хэрэгтэй бараагаа аваарай
        </Txt>
        {!user && (
          <>
            <PhoneSignIn />
            <GmailSignIn />
            <FacebookSignIn />
          </>
        )}
        {/* {user && <Home user={user} logOut={logOut} />} */}
      </View>
    </View>
  );
}

export default Login;
