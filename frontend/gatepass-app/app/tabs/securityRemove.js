import { useState } from "react";
import { View,Text,TextInput,TouchableOpacity,Image } from "react-native";
import handleAdminDashboardSecurity from "../../apis/adminDashboardSecurityApi";
import { styles } from "../stylesheets/removeSecurity_styles.js";

export default function SecurityRemove({route}){
    const [email,setEmail]=useState('')
    const {token}=route.params || {}

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/icon.png')}
                />

                <Text style={styles.title}>Remove Security Account</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                   placeholder="Enter email"
                   keyboardType="email-address"
                   value={email}
                   onChangeText={setEmail}
                   style={styles.input}
                />

                <TouchableOpacity
                   style={[styles.button,(!email)&&{backgroundColor:'#ccc'}]}
                   disabled={(!email)}
                   onPress={
                     async()=>{
                        const res=await handleAdminDashboardSecurity(token,'removeSecurity','post',email,'')
                        if(res.success==true){
                            console.log(res.message)
                        }
                        else{
                            console.log(res.message)
                        }
                     }
                   }
                >
                    <Text style={styles.buttonText}>Remove Account</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}