import {createAppC} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const screens = {
  Home: {
    screen: 'Home',
  },
};

const HomeStack = createNativeStackNavigator(screens);

export default NavigationContainer(HomeStack);
