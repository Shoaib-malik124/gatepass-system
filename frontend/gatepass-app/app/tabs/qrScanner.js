import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import decoder from 'jwt-decode'

export default function QRScanner({route}){
  const token=route.params || {}
  const decodedToken=decoder(token)
  const enrollment=decodedToken.enrollment
  
  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <QRCode
        value={enrollment}
        size={200}
      />
    </View>
  );
}