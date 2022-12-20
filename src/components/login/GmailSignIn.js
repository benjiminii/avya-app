import {
  View,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

import Icon from 'react-native-vector-icons/dist/AntDesign';

GoogleSignin.configure({
  webClientId:
    '453594047221-rq5j0388ajt5fqtq3lp3sp8kjoueolon.apps.googleusercontent.com',
});
export default function GmailSignIn() {
  const [loading, setLoading] = useState(false);

  async function onGoogleButtonPress() {
    setLoading(true);
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth()
      .signInWithCredential(googleCredential)
      .then(() => setLoading(false))
      .then(() =>
        Toast.show({
          text1: 'Амжилттай нэвтэрлээ',
        }),
      );
  }

  return (
    <TouchableNativeFeedback
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }>
      <View
        className="w-full p-3 flex justify-center align-middle content-center flex-row rounded-2xl"
        style={{backgroundColor: '#DE5246'}}>
        {loading ? (
          <ActivityIndicator size="large" color={'white'} />
        ) : (
          <>
            <Icon name="google" size={30} color="#fff" />
            <Text className="text-white uppercase font-semibold text-l ml-3 flex self-center">
              Google-ээр нэвтрэх
            </Text>
          </>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}
