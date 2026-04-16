import { View,Text,TextInput,Image,TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { styles } from '../stylesheets/studentVerifyOtp_styles.js'

export default function StudentVerifyOtp({navigation,route}){
    const [otp,setOtp]=useState('')
    const {session}=route.params || {}
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
                style={[styles.button,!otp && {backgroundColor:'#ccc'}]}
                disabled={!otp}
                onPress={()=>{
                  if(otp){
                    navigation.navigate('StudentLoginSignupScreen',{session})
                  }
                }}
            >
                <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>

         </View>
       </View>
    )
}

