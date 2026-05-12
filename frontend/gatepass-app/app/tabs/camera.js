import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { handleSecurityDashboard } from '../../apis/securityDashboardApi.js';

export default function CameraScanner({ navigation,route }) {
  const { token, session } = route.params || {};

  const [permission, requestPermission] = useCameraPermissions();

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
      try {
        const gatepassToken = data;

        const res=await handleSecurityDashboard({
          jwt_token:token,
          route:'decodeGatepass',
          gatepassToken:gatepassToken
        });

        if(res.success){
          navigation.replace('DecisionDashboardScreen',
            {
              session:session,
              token:token,
              enrollment:res.enrollment,
              id:res.id
            }
          )
        }
        else{
          Alert.alert("Gatepass token expired")
          navigation.replace('SecurityDashboardScreen',{token})
        }
      } catch (error) {
        navigation.replace('SecurityDashboardScreen',{token})
      }
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"]
      }}
      onBarcodeScanned={handleBarCodeScanned}
    />
  );
}