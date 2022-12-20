import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

import Products from '../screens/Products';
import Cart from '../screens/Cart';
import ProductScreen from '../screens/ProductScreen';

import Profile from '../screens/Profile';
import AddProduct from '../screens/AddProduct';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProductsStackSceens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}

function AddProductStackSceens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AddProducts" component={AddProduct} />
    </Stack.Navigator>
  );
}

function ProfileStackSceens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: 'black',
        })}
        initialRouteName="ProductsTab">
        <Tab.Screen
          name="ProductsTab"
          component={ProductsStackSceens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <IonIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddProductTab"
          component={AddProductStackSceens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <AntIcon
                name={focused ? 'pluscircle' : 'pluscircleo'}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackSceens}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <IonIcon
                name={focused ? 'person' : 'person-outline'}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
