import { useState,useEffect,useRef } from "react"
import { View,Image,Text,TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native"
import { styles } from "../stylesheets/admin_security_auth_styles.js";
import handleAdminSecurityLogin from "../../apis/adminSecurityLoginApi.js";
import * as SecureStore from 'expo-secure-store';


export default function AdminSecurityLogin({navigation,route}){
    const {role}=route.params || {};
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [loading,setLoading]=useState(false)
    const isMounted=useRef(false)

    useEffect(
      ()=>{
        isMounted.current=true
        return ()=>{
            isMounted.current=false
        }
      },[]
    )

    const handlePress=async()=>{
        if(isMounted.current)setLoading(true)
        try {
            const res=await handleAdminSecurityLogin(role,email,password)
            if(isMounted.current)setLoading(false)

            if(res.success){
                const token=res.token
                await SecureStore.setItemAsync(`token`,token);
                Alert.alert("Login successful")
                if(role=='admin')navigation.replace('AdminDashboardScreen',{token});
                else navigation.replace('SecurityDashboardScreen',{token})
            }
            else{
                Alert.alert(`${res.message}`)
            }
        } catch (error) {
            if(isMounted.current)setLoading(false)
            Alert.alert('Something went wrong')
        }
    }

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
                    style={[styles.button,(!email || !password || loading)&&{backgroundColor:'#ccc'}]}
                    disabled={!email || !password || loading}
                    onPress={handlePress}
               >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
               </TouchableOpacity>
           </View>
       </View>
    )
}