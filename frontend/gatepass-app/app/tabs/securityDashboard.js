import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/securityDashboard_styles.js';
import * as SecureStore from 'expo-secure-store';
import handleSecurityDashboard from '../../apis/securityDashboardApi.js';

export default function SecirityDashboard({ navigation, route }) {
  const { token } = route.params || {};

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >

      {/* Top Right Buttons */}
      <View style={styles.topRightContainer}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={async () => {
            await SecureStore.deleteItemAsync('token');
            navigation.reset({
              index: 0,
              routes: [{ name: 'RoleSelectionScreen' }]
            });
          }}
        >
          <Text style={styles.topButtonText}>Logout</Text>
        </TouchableOpacity>

      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Set Rules */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.title}>Scan QR</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={
              ()=>{
                // Take camera access/similar method.
                // That camera when scans the qr, a screen should appear that gives the options to accept/reject token.
              }
            }
          >
            <Text style={styles.buttonText}>Open</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </LinearGradient>
  );
}