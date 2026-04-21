import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/adminDashboard_styles.js';
import * as SecureStore from 'expo-secure-store';
import handleAdminDashboard from '../../apis/adminDashboardApi.js';

export default function AdminDashboard({ navigation, route }) {
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

        <TouchableOpacity
          style={[styles.topButton, styles.deleteButton]}
          onPress={async () => {
            const res = await handleAdminDashboard(token, 'delete', 'get');
            await SecureStore.deleteItemAsync('token');

            if (res.success === true) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'RoleSelectionScreen' }]
              });
            } else {
              console.log(res.message);
            }
          }}
        >
          <Text style={styles.topButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Set Rules */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.title}>Set Rules</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={
              ()=>{
                navigation.navigate('SetRulesScreen',{token})
              }
            }
          >
            <Text style={styles.buttonText}>Open</Text>
          </TouchableOpacity>
        </View>

        {/* Add Security */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-add-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.title}>Add Security</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              
            }}
          >
            <Text style={styles.buttonText}>Open</Text>
          </TouchableOpacity>
        </View>

        {/* Remove Security */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-remove-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.title}>Remove Security</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              
            }}
          >
            <Text style={styles.buttonText}>Open</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </LinearGradient>
  );
}