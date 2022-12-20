import {Txt, Btn, TxtIn} from '../components/UI/ExportUI';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {View, ScrollView, Image, TouchableHighlight} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

function AddProducts() {
  const userId = auth().currentUser.uid;

  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState(1);
  const [productPhotos, setProductPhotos] = useState([]);
  const productsImageUrls = [];

  async function openImageLib() {
    const options = {
      mediaType: 'photo',
      selectionLimit: 0,
      title: 'Зургаа сонгоорой',
      maxWidth: 800,
      maxHeight: 600,
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
    };
    launchImageLibrary(options, res => {
      if (res.error) console.log('err');
      else {
        if (res.assets) {
          const resUris = res.assets.map(asset => asset.uri);
          setProductPhotos(e => [...e, ...resUris]);
        }
      }
    });
  }

  async function addProducts() {
    if (
      !productName ||
      !productDesc ||
      !productPrice ||
      productQuantity <= 0 ||
      productPhotos.length == 0
    )
      Toast.show({
        type: 'error',
        text1: 'Барааныхаа мэдээллийн үнэн, зөв, бүрэн оруулна уу',
      });
    else {
      setLoading(true);
      productPhotos.forEach((photo, index) => {
        const storageRef = storage().ref(`products/${uuidv4()}`);
        storageRef
          .putFile(photo)
          .then(async snap => {
            const downloadURL = await storageRef.getDownloadURL();
            productsImageUrls.push(downloadURL);
            if (productPhotos.length == index + 1) {
              firestore()
                .collection('products')
                .add({
                  name: productName,
                  desc: productDesc,
                  price: productPrice,
                  quantity: productQuantity,
                  images: productsImageUrls,
                  user_id: userId,
                })
                .then(() => {
                  setLoading(false);
                  setProductName('');
                  setProductDesc('');
                  setProductPrice('');
                  setProductQuantity('');
                  setProductPhotos([]);
                  productsImageUrls.length = 0;
                  Toast.show({
                    type: 'success',
                    text1: 'Та бараагаа амжилттай орууллаа',
                  });
                });
            }
          })
          .catch(() => {
            setLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Алдаа гарлаа',
            });
          });
      });
    }
  }

  return (
    <ScrollView>
      <View className="px-10 py-5">
        <Txt className="text-2xl mb-3">Барааны нэр</Txt>
        <TxtIn
          className="bg-white"
          value={productName}
          onChangeText={e => setProductName(e)}
          placeholder="Барааны нэрийг оруулна уу"
        />
        <Txt className="text-2xl mb-3">Барааны дэлгэрэнгүй мэдээлэл</Txt>
        <TxtIn
          className="bg-white"
          value={productDesc}
          onChangeText={e => setProductDesc(e)}
          placeholder="Барааны дэлгэрэнгүй мэдээлэллийг оруулна уу"
          multiline
          numberOfLines={7}
        />
        <Txt className="text-2xl mb-3">Барааны үнэ</Txt>
        <TxtIn
          className="bg-white"
          value={productPrice}
          onChangeText={e => setProductPrice(e)}
          placeholder="Барааны үний мэдээлэллийг оруулна уу"
          keyboardType="number-pad"
        />
        <Txt className="text-2xl mb-3">Тоо хэмжээ</Txt>
        <TxtIn
          className="bg-white"
          value={productQuantity}
          onChangeText={e => setProductQuantity(e)}
          placeholder="Барааны тоо хэмжээг оруулна уу"
          keyboardType="number-pad"
        />
        <Btn
          className="rounded-2xl bg-black w-full p-3 mt-3"
          title="Зургууд сонгох"
          onPress={() => openImageLib()}
        />
        <View className="flex-row flex-wrap justify-around mb-5">
          {productPhotos &&
            productPhotos.map((photo, index) => {
              return (
                <View key={index} className="pt-3">
                  <TouchableHighlight
                    className="absolute rounded-full bg-white z-40 mt-5 ml-2"
                    underlayColor={'#dddd'}
                    onPress={() =>
                      setProductPhotos(prevs =>
                        prevs.filter((prev, i) => i != index),
                      )
                    }
                    style={{}}>
                    <FeatherIcon name="x" size={30} color="black" />
                  </TouchableHighlight>
                  <Image
                    source={{uri: photo}}
                    style={{height: 130, width: 130}}
                  />
                </View>
              );
            })}
        </View>
        <Btn
          className="bg-black p-3 rounded-2xl"
          title="Бараагаа оруулах"
          onPress={addProducts}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
}

export default AddProducts;
