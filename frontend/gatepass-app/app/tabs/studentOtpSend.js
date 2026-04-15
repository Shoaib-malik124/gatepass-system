import {View,Text,TextInput,Image,StyleSheet,TouchableOpacity} from 'react-native'
import { useState } from 'react'

export default function StudentOtpSend({navigation}){
    const [email,setEmail]=useState('')

    return(
       <View style={styles.container}>
            <View style={styles.card}>
                <Image
                source={require('../../assets/icon.png')}
                style={styles.Image}
                />

                <Text style={styles.title}>Verify your college mail</Text>

                <Text style={styles.label}>Email</Text>

                <TextInput
                    placeholder='Enter your college mail address'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <TouchableOpacity
                    style={[styles.button,!email && {backgroundColor:'#ccc'}]}
                    disabled={!email}
                    onPress={()=>{
                        navigation.navigate('StudentVerifyOtpScreen')
                    }}
                >
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
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
    maxWidth: 400,
    minHeight: 350,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,

    // Android shadow
    elevation: 5,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    justifyContent: 'center',
  },

  Image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 15,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#4a6cf7',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: 120,
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  label: {
    color: '#3b5ed7',
    marginBottom: 5,
    marginTop: 10,
  }
});