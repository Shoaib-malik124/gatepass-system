import { useState } from "react"
import { View,Image,Text,TouchableOpacity,StyleSheet, TextInput } from "react-native"

export default function AdminSecurityLogin({route}){
    const {role}=route.params || {};
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    return(
       <View style={styles.container}>
           <View style={styles.card}>
               <Image
                source={require('../../assets/icon.png')}  
                style={styles.logo}
               />

               <Text style={styles.title}>Login to your {role} account</Text>

               <Text style={styles.label}>Email</Text>
               <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none" 
                    style={styles.input}
               />
                
               <Text style={styles.label}>Password</Text>
               <TextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
               />
               
               <TouchableOpacity
                    style={[styles.button,(!email || !password)&&{backgroundColor:'#ccc'}]}
                    disabled={!email || !password}
                    onPress={()=>console.log(email,password,role)}
               >
                <Text style={styles.buttonText}>Login</Text>
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
    minHeight: 420,
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

  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    color: '#3b5ed7',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4a6cf7',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: 100,
    alignSelf: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});