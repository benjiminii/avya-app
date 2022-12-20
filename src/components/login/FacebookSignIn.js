import {
  View,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/dist/AntDesign';

export default function FacebookSignIn() {
  const [loading, setLoading] = useState(false);

  async function onFacebookButtonPress() {
    setLoading(true);
    await LoginManager.logInWithPermissions(['public_profile', 'email']);

    const data = await AccessToken.getCurrentAccessToken();

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    return auth()
      .signInWithCredential(facebookCredential)
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
        onFacebookButtonPress().then(() =>
          console.log('Signed in with Facebook!'),
        )
      }>
      <View
        className="w-full p-3 flex justify-center align-middle content-center flex-row rounded-2xl"
        style={{backgroundColor: '#4267B2'}}>
        {loading ? (
          <ActivityIndicator size="large" color={'white'} />
        ) : (
          <>
            <Icon name="facebook-square" size={30} color="#fff" />
            <Text className="text-white uppercase font-semibold text-l ml-3 flex self-center">
              Facebook-ээр нэвтрэх
            </Text>
          </>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}
