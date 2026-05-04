import { View,Text,TextInput,Image,TouchableOpacity,Alert,ActivityIndicator } from 'react-native'
import { useState,useRef,useEffect } from 'react'
import { styles } from '../stylesheets/studentVerifyOtp_styles.js'
import handleStudentOtpVerify from '../../apis/studentOtpVerifyApi.js'

export default function StudentVerifyOtp({navigation,route}){
    const [otp,setOtp]=useState('')
    const {email}=route.params || {}
    const [loading,setLoading]=useState(false)

    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    const handlePress=async()=>{
      if (isMounted.current)setLoading(true)
      try {
        const res=await handleStudentOtpVerify(otp,email)
        if (isMounted.current)setLoading(false)

        if(res.success==true){
          Alert.alert("Success",`${res.message}`)
          navigation.replace('StudentLoginSignupScreen',{session:'signup',role:"",email})
        }
        else{
          Alert.alert("Error",`${res.message}`)
        }
      } catch (error) {
        if (isMounted.current)setLoading(false)
        Alert.alert("Error","someting went wrong")
      }
    }

    return(
       <View style={styles.container}>
         <View style={styles.card}>
            
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
            />

            <Text style={styles.title}>Verify your college mail</Text>

            <Text style={styles.label}>otp</Text>

            <TextInput
              placeholder='Enter otp'
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.input}
            />

            <TouchableOpacity
                style={[styles.button,(!otp||loading) && {backgroundColor:'#ccc'}]}
                disabled={!otp || loading}
                onPress={handlePress}
            >
                {/* 🔥 Loader Overlay */}
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Proceed</Text>
                )}
            </TouchableOpacity>

         </View>
       </View>
    )
}

