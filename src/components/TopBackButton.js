import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Txt, TxtIn} from '../components/UI/ExportUI';

function TopBackButton({noBack, noCart}) {
  const navigation = useNavigation();
  return (
    <View className={`p-5 flex-row justify-${noBack ? 'end' : 'between'}`}>
      {!noBack && (
        <TouchableHighlight
          className="p-1 rounded-full bg-white"
          underlayColor={'#dddd'}
          onPress={() => navigation.goBack()}>
          <IonIcon name="chevron-back" size={40} color="#000" />
        </TouchableHighlight>
      )}

      {!noCart ? (
        <View className="flex-1">
          <TouchableHighlight
            className="p-1 rounded-full bg-white self-end"
            underlayColor={'#dddd'}
            onPress={() => navigation.navigate('Cart')}>
            <IonIcon name="cart" size={40} color="#000" />
          </TouchableHighlight>
        </View>
      ) : (
        <Txt className="text-xl flex-1 self-center text-center">Миний сагс</Txt>
      )}
    </View>
  );
}

export default TopBackButton;
