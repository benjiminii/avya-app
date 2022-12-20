import {Txt, Btn} from '../components/UI/ExportUI';
import {View} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Toast from 'react-native-toast-message';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';

import {useEffect, useState} from 'react';

function Profile() {
  const user = auth().currentUser;

  function logOut() {
    auth()
      .signOut()
      .then(() =>
        Toast.show({
          type: 'info',
          text1: 'Амжилттай гарлаа',
        }),
      );
  }

  return (
    <View className="p-5 flex flex-1 justify-between">
      <Txt className="mb-3 text-center">
        Тавтай морилно уу{' '}
        {user?.displayName ? user?.displayName : user.phoneNumber}
      </Txt>
      <Btn
        className="rounded-2xl bg-black w-full p-3 self-end"
        title="Гарах"
        onPress={logOut}
      />
    </View>
  );
}

export default Profile;
