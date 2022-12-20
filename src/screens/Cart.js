import {
  View,
  ScrollView,
  RefreshControl,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {Txt, Btn, TxtIn} from '../components/UI/ExportUI';
import TopBackButton from '../components/TopBackButton';
import {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import FeatherIcons from 'react-native-vector-icons/dist/Feather';
import Numeral from 'numeral';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function Cart() {
  const [refreshing, setRefreshing] = useState(false);
  const [cartProducts, setCartProducts] = useState();
  const [fullPrice, setFullPrice] = useState();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const uid = auth().currentUser.uid;

  const deviceHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (cartProducts) {
      let price = 0;
      cartProducts.map(product => (price += parseInt(product.price)));
      setFullPrice(price);
    }
  }, [cartProducts?.length]);

  async function getCartData() {
    setRefreshing(true);
    try {
      const cartValue = await AsyncStorage.getItem('cart');
      const cartJson = cartValue != null ? JSON.parse(cartValue) : null;
      setRefreshing(false);
      if (cartJson !== null) {
        setCartProducts(cartJson);
      }
    } catch (e) {
      setRefreshing(false);
    }
  }

  async function removeFromCart(index) {
    setRefreshing(true);
    try {
      let cartString = cartProducts;
      cartString.splice(index, 1);
      setCartProducts(cartString);
      cartString = cartString != null ? JSON.stringify(cartString) : null;
      await AsyncStorage.setItem('cart', cartString);
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
    }
  }

  async function addToCart() {
    if (address.length <= 5 || cartProducts.length == 0)
      Toast.show({
        type: 'error',
        text1:
          cartProducts.length == 0
            ? 'Таны сагсанд бараа байхгүй байна'
            : 'Та хүргүүлэх хаягаа оруулна уу',
      });
    else {
      setLoading(true);
      cartProducts.forEach((product, index) => {
        firestore()
          .collection('orders')
          .add({
            status: 'NEW',
            address: address,
            buyer_id: uid,
            seller_id: product.user_id,
            product_id: product.id,
            price: product.price,
          })
          .then(() => {
            if (index + 1 == cartProducts.length) {
              setLoading(false);
              setCartProducts([]);
              setAddress('');
              AsyncStorage.removeItem('cart');
              Toast.show({
                type: 'success',
                text1: 'Та бараагаа амжилттай захиаллаа',
              });
            }
          });
      });
    }
  }

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <View className="flex-1 flex-col">
      <TopBackButton noCart={true} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getCartData} />
        }>
        <View className="px-5">
          {cartProducts &&
            cartProducts.map((product, index) => {
              return (
                <View key={index} className="">
                  <View className="flex-row mb-5">
                    <Image
                      className="bg-white rounded-xl"
                      source={{uri: product.images[0]}}
                      style={{
                        height: 120,
                        width: 100,
                        resizeMode: 'contain',
                      }}
                    />
                    <View className="px-3 flex flex-1">
                      <View className="mb-6 flex-row flex-1 justify-between">
                        <View className="">
                          <Txt className="text-black mb-3">{product.name}</Txt>
                          <Txt>{Numeral(product.price).format('0,0')} ₮</Txt>
                        </View>
                        <View>
                          <TouchableHighlight
                            className="rounded-l"
                            underlayColor={'#ffff'}
                            onPress={() => removeFromCart(index)}>
                            <FeatherIcons name="trash" size={30} color="#000" />
                          </TouchableHighlight>
                        </View>
                      </View>
                      <View className="flex-row flex-1 justify-between">
                        <Txt className="">Тоо ширхэг</Txt>
                        <Txt className="">1</Txt>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <View className="px-5">
        <View className="flex-row justify-between my-3">
          <Txt>Барааны нийт үнэ:</Txt>
          <Txt>{Numeral(fullPrice).format('0,0')} ₮</Txt>
        </View>
        <View className="flex-row justify-between my-3">
          <Txt>Хүргэлт:</Txt>
          <Txt>{Numeral(5000).format('0,0')} ₮</Txt>
        </View>
        <View
          className="border-slate-500 my-3"
          style={{
            borderBottomWidth: 1,
          }}
        />
        <View className="flex-row justify-between my-3">
          <Txt>Нийт төлөх:</Txt>
          <Txt>{Numeral(fullPrice + 5000).format('0,0')} ₮</Txt>
        </View>
        <TxtIn
          className="font-bold mt-3"
          value={address}
          onChangeText={e => setAddress(e)}
          placeholder="Хүргэлтийн хаягаа оруулна уу"
        />
        <Btn
          className="rounded-2xl bg-black  w-full p-3"
          title="Хүргэлтийн хаягаа сонгох"
          onPress={addToCart}
          loading={loading}
        />
      </View>
    </View>
  );
}

export default Cart;
