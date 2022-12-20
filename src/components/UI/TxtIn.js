import {TextInput} from 'react-native';

export default function TxtIn(props) {
  return (
    <TextInput
      {...props}
      className="bg-white mb-5 rounded-2xl pl-3"
      style={{
        shadowColor: '#000000',
        elevation: 5,
      }}
    />
  );
}
