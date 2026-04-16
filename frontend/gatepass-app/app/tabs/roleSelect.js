import { View, Text, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';
import AppHeader from './header.js';
import { styles } from '../stylesheets/roleSelect_styles.js';

export default function RoleSelectScreen({navigation}) {
  const [role, setRole] = useState(null);
  
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
            () =>{
              if(role=='security'||role=='admin'){
                // call the login page for security/admin
                navigation.navigate('AdminSecurityLoginScreen',{role})
              }
              else{
                // call the login page for student
                navigation.navigate('StudentAuthScreen',{role})
              }
            }
          } // Through this, go to the next page.
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
