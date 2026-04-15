import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState } from 'react';

export default function RoleSelectScreen({navigation}) {
  const [role, setRole] = useState(null);
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
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
                navigation.navigate('StudentOtpSendScreen')
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
  width: '100%',
  maxWidth: 500,
  minHeight: 450,
  backgroundColor: 'white',
  padding: 30,
  borderRadius: 15,

  elevation: 5,

  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
},

  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 15,
  },

  portal: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    padding: 12,
  },

  button: {
    backgroundColor: '#4a6cf7',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});