import {Text, View, ScrollView, TextInput, RefreshControl} from 'react-native';
import {Txt, TxtIn} from '../components/UI/ExportUI';
import TopBackButton from '../components/TopBackButton';
import {useState, useEffect} from 'react';

import firestore from '@react-native-firebase/firestore';

import ProductCard from '../components/home/ProductCard';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';

function Products() {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState();
  const [searchProducts, setSearchProducts] = useState();

  async function searchForProducts() {
    const collection = await firestore()
      .collection('products')
      .where('name', '>=', search)
      .where('name', '<=', search + '\uf8ff')
      .get();

    const data = collection.docs.map(doc => doc.data());
    const id = collection.docs.map(doc => doc.ref._documentPath._parts[1]);
    data.map((doc, index) => (doc.id = id[index]));
    setSearchProducts(data);
  }

  useEffect(() => {
    if (search) {
      searchForProducts();
    }
  }, [search]);

  async function getProductsData() {
    setRefreshing(true);
    const collection = await firestore().collection('products').get();

    setRefreshing(false);
    const data = collection.docs.map(doc => doc.data());
    const id = collection.docs.map(doc => doc.ref._documentPath._parts[1]);
    data.map((doc, index) => (doc.id = id[index]));
    setProducts(data);
  }

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <>
      <TopBackButton noBack={true} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getProductsData} />
        }>
        <View className="px-10">
          <Txt className="text-2xl mb-3">Тохирсноо ав</Txt>
          <View
            className="flex-row flex-1justify-center items-center bg-white rounded-2xl mb-5 pl-3"
            style={{
              shadowColor: '#000000',
              elevation: 5,
            }}>
            <EvilIcons name="search" size={30} color="#4444" />
            <TextInput
              value={search}
              onChangeText={e => setSearch(e)}
              className=" font-bold flex-1"
              placeholder="Хайх"
            />
          </View>
          <View className="flex-row flex-wrap w-full justify-between">
            {search && searchProducts
              ? searchProducts.map((product, index) => {
                  return <ProductCard key={index} data={product} />;
                })
              : products &&
                products.map((product, index) => {
                  return <ProductCard key={index} data={product} />;
                })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default Products;
