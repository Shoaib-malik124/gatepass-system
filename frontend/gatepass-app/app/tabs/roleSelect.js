import { View, Text, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import AppHeader from './header.js';
import { styles } from '../stylesheets/roleSelect_styles.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'; // Device's local storage.
import {jwtDecode} from 'jwt-decode'
import handleStudentDashboard from '../../apis/studentDashboardApi.js';

export default function RoleSelectScreen({navigation}) {
  const [role,setRole]=useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <AppHeader/> */}
        <Image 
          source={require('../../assets/icon.png')}  
          style={styles.logo}
        />
        <Text style={styles.title}>Select your Identity</Text>

        <View style={styles.dropdown}>
          <RNPickerSelect
            onValueChange={(value) => setRole(value)}
            items={[
              { label: 'Student', value: 'student' },
              { label: 'Admin', value: 'admin' },
              { label: 'Security', value: 'security' },
            ]}
            placeholder={{ label: 'Choose role...', value: null }}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, !role && { backgroundColor: '#ccc' }]}
          disabled={!role}
          onPress={
            async() =>{
              const token=await SecureStore.getItemAsync('token');
              if(token){
                const decodedToken=jwtDecode(token) // not powerful as the jwt.verify, but can give the expiry.
                const current_time=Date.now()/1000 // jwt stores creation time and expiry time in seconds.
                if(current_time<decodedToken.exp){
                  if(role=='student'){
                    const res=await handleStudentDashboard(token,'checkPass','get')
                    navigation.navigate('StudentDashboardScreen',{token,hasPass:res.hasPass})
                  }
                  else if(role=='admin'){
                    // navigate to the admin dashboard.
                    navigation.navigate('AdminDashboardScreen',{token})
                  }
                  else{
                    // navigate to the security dashboard.
                    navigation.navigate('SecurityDashboard',{token})
                  }
                }
                else{
                  await SecureStore.deleteItemAsync('token')
                  if(role=='student'){
                    navigation.navigate('StudentAuthScreen',{role})
                  }
                  else{
                    // navigate to the admin/security login screen.
                    navigation.navigate('AdminSecurityLoginScreen',{role})
                  }
                }
              }
              else{
                if(role=='student'){
                  navigation.navigate('StudentAuthScreen',{role})
                }
                else{
                  navigation.navigate('AdminSecurityLoginScreen',{role})
                }
              }
            }
          }
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
