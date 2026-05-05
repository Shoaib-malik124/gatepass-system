import { useState,useEffect,useRef } from "react";
import { View,Text,TextInput,TouchableOpacity,Image,Alert,ActivityIndicator } from "react-native";
import handleAdminDashboardSecurity from "../../apis/adminDashboardSecurityApi";
import { styles } from "../stylesheets/addSecurity_styles.js";

export default function SecurityAdd({route}){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
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
            const res=await handleAdminDashboardSecurity(token,'addSecurity',email,password)
            if(isMounted.current)setLoading(false)
            Alert.alert(res.message)
        } catch (error) {
            if(isMounted.current)setLoading(false)
            Alert.alert('Something went wrong')
        }
    }

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
                   style={[styles.button,(!email || !password || loading)&&{backgroundColor:'#ccc'}]}
                   disabled={(!email)||(!password)||loading}
                   onPress={handlePress}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Add account</Text>
                    )}
                </TouchableOpacity>

            </View>
        </View>
    )
}