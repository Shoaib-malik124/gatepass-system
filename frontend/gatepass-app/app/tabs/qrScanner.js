import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRScanner({route}){
  const {gatepass}=route.params || {}
  
  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <QRCode
        value={gatepass}
        size={250}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
}