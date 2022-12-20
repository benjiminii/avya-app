import {View, Button, ActivityIndicator} from 'react-native';

export default function Btn(props) {
  return (
    <View {...props}>
      {props?.loading ? (
        <ActivityIndicator size="large" color={'gray'} />
      ) : (
        <Button color={'black'} {...props} />
      )}
    </View>
  );
}
