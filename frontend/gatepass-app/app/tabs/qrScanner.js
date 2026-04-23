import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {jwtDecode} from 'jwt-decode'

export default function QRScanner({route}){
    const token=route.params || {}
    const decodedToken=jwtDecode(token)
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