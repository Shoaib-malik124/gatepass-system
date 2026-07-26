import { View, Text, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import AppHeader from './header.js';
import { styles } from '../stylesheets/roleSelect_styles.js';
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
                const decodedToken=jwtDecode(token) 
                const current_time=Date.now()/1000 
                if(current_time<decodedToken.exp){
                  if(role=='student'){
                    navigation.navigate('StudentDashboardScreen',{token})
                  }
                  else if(role=='admin'){
                    navigation.navigate('AdminDashboardScreen',{token})
                  }
                  else{
                    navigation.navigate('SecurityDashboardScreen',{token})
                  }
                }
                else{
                  await SecureStore.deleteItemAsync('token')
                  if(role=='student'){
                    navigation.navigate('StudentAuthScreen',{role})
                  }
                  else{
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
