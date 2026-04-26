import { useState } from "react"
import { View,Image,Text,TouchableOpacity, TextInput } from "react-native"
import { styles } from "../stylesheets/admin_security_auth_styles.js";
import handleAdminSecurityLogin from "../../apis/adminSecurityLoginApi.js";
import * as SecureStore from 'expo-secure-store';


export default function AdminSecurityLogin({navigation,route}){
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
                    onPress={async()=>{
                        //axios request to backend
                        const res=await handleAdminSecurityLogin(role,email,password)
                        if(res.success==true){
                            //Get the token from res,store in local and navigate to the admin/security dashboard.
                            const token=res.token
                            await SecureStore.setItemAsync(`token`,token);
                            //navigate to admin/security dashboard.
                            if(role=='admin')navigation.navigate('AdminDashboardScreen',{token});
                            else navigation.navigate('SecurityDashboardScreen',{token})
                        }
                        else{
                            //Show the reason i.e., res.message in the frontend.
                            console.log(res.message)
                        }
                    }}
               >
                <Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>
           </View>
       </View>
    )
}