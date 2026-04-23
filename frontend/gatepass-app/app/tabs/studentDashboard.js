import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/student_dashboard_styles.js';
import * as SecureStore from 'expo-secure-store';
import handleStudentDashboard from '../../apis/studentDashboardApi.js';
import { useState } from 'react';

export default function StudentDashboard({ navigation,route }) {
  const { token } = route.params || {};
  const [isQR,setQR]=useState(false)

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >

      {/* Top Left Button */}
      <View style={styles.topLeftContainer}>
        <TouchableOpacity style={styles.topButton}>
          <Text 
            style={styles.topButtonText}
            disabled={true}
          >
          Gatepass Token
          </Text>
        </TouchableOpacity>
      </View>

      {/* Top Right Buttons */}
      <View style={styles.topRightContainer}>
        <TouchableOpacity style={styles.topButton}
          onPress={
            async()=>{
              await SecureStore.deleteItemAsync('token')
              navigation.reset({
                index:0,
                routes:[
                  {
                    name:'RoleSelectionScreen'
                  }
                ]
              });
            }
          }
        >
          <Text style={styles.topButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.topButton, styles.deleteButton]}
          onPress={
            async()=>{
              const res=await handleStudentDashboard(token,'delete','get');
              await SecureStore.deleteItemAsync('token');
              if(res.success==true){
                navigation.reset({
                  index:0,
                  routes:[
                    {
                      name:'RoleSelectionScreen'
                    }
                  ]
                });
              }
              else{
                console.log(res.message)
              }
            }
          }
        >
          <Text style={styles.topButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Card 1 */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={28} color="#4facfe" />
        </View>

        <Text style={styles.title}>Request Pass</Text>
        <Text style={styles.subtitle}>Apply for a new gate pass</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const res=await handleStudentDashboard(token,'requestPass','post');
            if(res.success)setQR(true)
            console.log(res.message);
          }}
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Card 2 */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="card-outline" size={28} color="#00c6ff" />
        </View>

        <Text style={styles.title}>Pay Fine</Text>
        <Text style={styles.subtitle}>Clear your pending dues</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {/* Card 3 */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="card-outline" size={28} color="#00c6ff" />
        </View>

        <Text style={styles.title}>Show QR</Text>
        <Text style={styles.subtitle}>Open the gatepass qr</Text>

        <TouchableOpacity 
          style={[styles.button,!isQR&&({backgroundColor:'#ccc'})]}
          disabled={!isQR}
          onPress={
            ()=>{
              navigation.navigate('QRScannerScreen',{token})
            }
          }
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}