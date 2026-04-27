import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { handleSecurityDashboard } from '../../apis/securityDashboardApi.js';

export default function CameraScanner({route}) {
  const {token,session} = route.params || {}
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const gatepassToken = data;
    console.log("Scanned JWT:", gatepassToken);

    const res=await handleSecurityDashboard(session,token,gatepassToken)
    // navigate(no reverse) to screen where the security guard gets enrollment(Text) and options Accept/Reject, then dashboard(no reverse).
  }

    if(hasPermission===false)return <Text>No camera access</Text>;

    return (
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
        />
    );
}