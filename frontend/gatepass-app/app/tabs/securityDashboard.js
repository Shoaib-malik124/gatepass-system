import { View, Text, TouchableOpacity, ScrollView, Alert,TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/securityDashboard_styles.js';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import { handleDecisionDashboard } from '../../apis/securityDashboardApi.js';
import { useState,useRef,useEffect } from 'react';


export default function SecurityDashboard({ navigation, route }) {
  const { token } = route.params || {};
  const [session, setSession] = useState(null)
  const [enrollment,setEnrollment]=useState('')
  const [loading,setLoading]=useState(false)
  const isMounted=useRef(false)

  const handlePress=async ()=>{
    if (isMounted.current) setLoading(true)
    try {
      const response=await handleDecisionDashboard(enrollment,token,'processLate')
      Alert.alert(response.message)
      if(isMounted.current) setLoading(false)
    } catch (error) {
      if(isMounted.current)setLoading(false)
      Alert.alert('Something Went wrong')
    }
  }

  useEffect(()=>{
    isMounted.current=true
    return ()=>{
      isMounted.current=false
    }
  },[]);

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
              : `Ready to scan for student ${session === 'exit' ? 'EXIT' : 'ENTRY'}.`}
          </Text>

          {/* Scan Button */}
          <TouchableOpacity
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

        <View style={styles.card}>
          <Text style={styles.title}>
            Process Late Students
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter enrollment"
            placeholderTextColor="#999"
            value={enrollment}
            onChangeText={setEnrollment}
          />

          <TouchableOpacity
            style={[styles.button, enrollment === '' && styles.buttonDisabled]}
            disabled={enrollment===''}
            onPress={handlePress}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                Process Late
              </Text>
            )}
          </TouchableOpacity>

        </View>

      </ScrollView>
    </LinearGradient>
  );
}