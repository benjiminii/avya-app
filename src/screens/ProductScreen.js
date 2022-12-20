import {View, Image, Dimensions} from 'react-native';
import TopBackButton from '../components/TopBackButton';
import Swiper from 'react-native-swiper';
import {Txt, Btn} from '../components/UI/ExportUI';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Numeral from 'numeral';

function ProductScreen(props) {
  const product = props.route.params.data;
  const deviceWidth = Dimensions.get('window').width;

  const [loading, setLoading] = useState(false);

  async function addToCart() {
    setLoading(true);
    try {
      const prevValue = await AsyncStorage.getItem('cart');
      const prevJson = prevValue != null ? JSON.parse(prevValue) : null;
      const newValue =
        prevJson != null
          ? JSON.stringify([...prevJson, product])
          : JSON.stringify([product]);
      await AsyncStorage.setItem('cart', newValue);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Таны бараа амжилттай сагслагдлаа',
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Сагслахад алдаа гарлаа',
      });
    }
  }

  return (
    <View>
      <TopBackButton />
      <View
        style={{
          height: deviceWidth,
          width: deviceWidth,
        }}>
        {product?.images.length == 1 ? (
          <Image className="w-full h-full" source={{uri: product.images[0]}} />
        ) : (
          <View
            style={{
              height: deviceWidth,
              width: deviceWidth,
            }}>
            <Swiper
              showsButtons={false}
              activeDot={
                <View
                  style={{
                    backgroundColor: '#000',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                />
              }>
              {product &&
                product.images.map((image, index) => {
                  return (
                    <View
                      key={index}
                      className="flex-1"
                      style={{
                        height: deviceWidth,
                        width: deviceWidth,
                      }}>
                      <Image className="w-full h-full" source={{uri: image}} />
                    </View>
                  );
                })}
            </Swiper>
          </View>
        )}
        <View className="p-5 flex-row justify-between">
          <Txt className="text-xl">{product.name}</Txt>
          <Txt className="text-black text-bold text-xl">
            {Numeral(product.price).format('0,0')} ₮
          </Txt>
        </View>
        <Txt className="text-l m-5">{product.desc}</Txt>
        <View className="p-5">
          <Btn
            className="rounded-2xl bg-black  w-full p-3"
            title="Сагсанд нэмэх"
            onPress={addToCart}
            loading={loading}
          />
        </View>
      </View>
    </View>
  );
}

export default ProductScreen;
