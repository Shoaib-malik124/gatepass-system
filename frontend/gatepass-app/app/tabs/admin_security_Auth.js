import { useState } from "react"
import { View,Image,Text,TouchableOpacity, TextInput } from "react-native"
import { styles } from "../stylesheets/admin_security_auth_styles.js";
import adminSecurityLoginApi from "../../apis/adminSecurityLogin.js";

export default function AdminSecurityLogin({route}){
    const {role}=route.params || {};
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleLogin=async()=>{
        try {
            const res=await adminSecurityLoginApi.post('/login',{
                role:role,
                email:email,
                password:password
            });
            console.log(res.data)
        } catch (error) {
            console.log(error.message)
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
                    style={[styles.button,(!email || !password)&&{backgroundColor:'#ccc'}]}
                    disabled={!email || !password}
                    onPress={()=>{
                        //axios request to backend
                        handleLogin()
                    }}
               >
                <Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>
           </View>
       </View>
    )
}