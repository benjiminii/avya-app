import {Text, View, Image, TouchableHighlight} from 'react-native';
import {Txt} from '../UI/ExportUI';
import {useNavigation} from '@react-navigation/native';
import Numeral from 'numeral';

function ProductCard({data}) {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      className="mb-5 rounded-2xl bg"
      underlayColor={'#ffff'}
      style={{
        width: '47%',
      }}
      onPress={() => navigation.navigate('ProductScreen', {data})}>
      <>
        <View
          className="flex bg-white rounded-2xl mb-1"
          style={{
            height: 250,
            tintColor: 'white',
          }}>
          <Image
            className="w-full rounded-2xl bg-white"
            source={{uri: data.images[0]}}
            style={{
              resizeMode: 'contain',
              flex: 1,
              // width: '250px',
              // height: '250px',
            }}
            // height={250}
            // width={250}
          />
        </View>
        <View className="p-3">
          <Txt className="text-black">{data.name}</Txt>
          <Txt className="text-neutral-400">
            {Numeral(data.price).format('0,0')} ₮
          </Txt>
        </View>
      </>
    </TouchableHighlight>
  );
}

export default ProductCard;
