import { useState,useEffect,useRef } from "react";
import { View,Text,TextInput,TouchableOpacity,Image,Alert,ActivityIndicator } from "react-native";
import handleAdminDashboardSecurity from "../../apis/adminDashboardSecurityApi";
import { styles } from "../stylesheets/removeSecurity_styles.js";

export default function SecurityRemove({route}){
    const [email,setEmail]=useState('')
    const {token}=route.params || {}
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
            const res=await handleAdminDashboardSecurity(token,'removeSecurity','post',email,'')
            if(isMounted.current)setLoading(false)
            Alert.alert(res.message)
            
        } catch (error) {
            if(isMounted.current)setLoading(false)
            Alert.alert("Something went wrong")
        }
    }

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
                   style={[styles.button,(!email || loading)&&{backgroundColor:'#ccc'}]}
                   disabled={(!email)||loading}
                   onPress={handlePress}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Remove Account</Text>
                    )}
                </TouchableOpacity>

            </View>
        </View>
    )
}