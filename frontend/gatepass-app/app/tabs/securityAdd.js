import { useState } from "react";
import { View,Text,TextInput,TouchableOpacity,Image } from "react-native";
import handleAdminDashboardSecurity from "../../apis/adminDashboardSecurityApi";
import { styles } from "../stylesheets/addSecurity_styles.js";

export default function SecurityAdd({route}){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {token}=route.params || {}

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/icon.png')}
                />

                <Text style={styles.title}>Add Security Account</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                   placeholder="Enter email"
                   keyboardType="email-address"
                   value={email}
                   onChangeText={setEmail}
                   style={styles.input}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                   placeholder="Enter password"
                   value={password}
                   secureTextEntry
                   onChangeText={setPassword}
                   style={styles.input}
                />

                <TouchableOpacity
                   style={[styles.button,(!email || !password)&&{backgroundColor:'#ccc'}]}
                   disabled={(!email)||(!password)}
                   onPress={
                     async()=>{
                        const res=await handleAdminDashboardSecurity(token,'addSecurity','post',email,password)
                        if(res.success==true){
                            console.log(res.message)
                        }
                        else{
                            console.log(res.message)
                        }
                     }
                   }
                >
                    <Text style={styles.buttonText}>Add Account</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}