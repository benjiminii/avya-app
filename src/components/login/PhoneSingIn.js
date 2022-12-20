import {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {Img, Txt, Btn, TxtIn} from '../UI/ExportUI';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export default function PhoneSignIn() {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  async function signInWithPhoneNumber(phoneNumber) {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        '+976' + phoneNumber,
      );
      setConfirm(confirmation);
      setLoading(false);
      Toast.show({
        text1: 'Таны утасны дугаар луу чинь баталгаажуулах дугаар илгээлээ',
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.startsWith('[Error: [auth/invalid-phone-number]'))
        Toast.show({
          type: 'error',
          text1: 'Таны дугаар буруу байна',
        });
      if (err.startsWith('[Error: [auth/too-many-requests]'))
        Toast.show({
          type: 'error',
          text1:
            'Энэ дугаар дээр хэт олон хүсэлтүүд ирсэн байна. Байж байгаад үзнэ үү',
        });
    }
  }

  async function confirmCode() {
    setLoading(true);
    try {
      await confirm.confirm(code);
      setLoading(false);
      Toast.show({
        text1: 'Амжилттай нэвтэрлээ',
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Алдаа гарлаа',
      });
      console.log('Invalid code.');
    }
  }

  return (
    <View className="w-full">
      {!confirm ? (
        <>
          <TxtIn
            className="font-bold"
            value={phoneNumber}
            onChangeText={e => setPhoneNumber(e)}
            maxLength={8}
            placeholder="Утасны дугаараа оруулна уу"
          />
          <Btn
            className="rounded-2xl bg-black w-full p-3"
            title="Утасны дугаараараа нэвтрэх"
            onPress={() => signInWithPhoneNumber(phoneNumber)}
            loading={loading}
          />
        </>
      ) : (
        <>
          <TxtIn
            className="bg-white"
            value={code}
            onChangeText={e => setCode(e)}
            maxLength={6}
            placeholder="Баталгаажуулах дугаараа оруулна уу"
          />
          <Btn
            className="rounded-2xl bg-black w-full p-3"
            title="Баталгаажуулах"
            onPress={() => confirmCode()}
            loading={loading}
          />
        </>
      )}
    </View>
  );
}
