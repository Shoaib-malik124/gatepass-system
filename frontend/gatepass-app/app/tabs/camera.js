import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { handleSecurityDashboard } from '../../apis/securityDashboardApi.js';

export default function CameraScanner({ route }) {
  const { token, session } = route.params || {};

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>No camera access</Text>
        <Text onPress={requestPermission}>Grant Permission</Text>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const gatepassToken = data;
      console.log("Scanned JWT:", gatepassToken);

      const res=await handleSecurityDashboard(session,token,'decodeGatepass',gatepassToken);

      navigation.replace('DecisionDashboardScreen',
        {
          session:session,
          token:token,
          enrollment:res.enrollment,
          id:res.id
        }
      )

    } catch (error) {
      setScanned(false)
    }
    
    setTimeout(() => setScanned(false), 2000);
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"]
      }}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    />
  );
}