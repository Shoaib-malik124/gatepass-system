import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/securityDashboard_styles.js';
import * as SecureStore from 'expo-secure-store';
// import handleSecurityDashboard from '../../apis/securityDashboardApi.js';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Added import

export default function SecurityDashboard({ navigation, route }) {
  const { token } = route.params || {};
  const [session, setSession] = useState(null);

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

        {/* Unified Scanner Control Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="qr-code-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.title}>Gatepass Scanner</Text>
          
          {/* Dropdown Section */}
          <Text style={styles.label}>Select Session Type:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={session}
              onValueChange={(itemValue) => setSession(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-- Select Entry or Exit --" value={null} color="#888" />
              <Picker.Item label="Scan OUT (Exit)" value="exit" />
              <Picker.Item label="Scan IN (Entry)" value="entry" />
            </Picker>
          </View>

          {/* Helper Text */}
          <Text style={styles.helperText}>
            {session === null 
              ? 'Please select a session type to unlock the scanner.' 
              : `Ready to scan student ${session === 'exit' ? 'EXIT' : 'ENTRY'}.`}
          </Text>

          {/* Scan Button */}
          <TouchableOpacity
            // Fixed conditional styling syntax using array [...]
            style={[styles.button, session === null && styles.buttonDisabled]}
            disabled={session === null}
            onPress={() => {
              console.log(`Opening camera for ${session}...`);
              navigation.navigate('CameraScannerScreen',{token:token,session:session})
            }}
          >
            <Text style={styles.buttonText}>Open Scanner</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}