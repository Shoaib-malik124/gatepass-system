import {View,Text,TextInput,Image,TouchableOpacity} from 'react-native'
import { useState } from 'react'
import { styles } from '../stylesheets/studentOtpSend_styles.js'
import handleStudentOtpSend from '../../apis/studentOtpSendApi.js'

export default function StudentOtpSend({navigation,route}){
    const [email,setEmail]=useState('')
    const {session}=route.params || {}
    return(
       <View style={styles.container}>
            <View style={styles.card}>
                <Image
                source={require('../../assets/icon.png')}
                style={styles.Image}
                />

                <Text style={styles.title}>Verify your college mail</Text>

                <Text style={styles.label}>Email</Text>

                <TextInput
                    placeholder='Enter your college mail address'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <TouchableOpacity
                    style={[styles.button,!email && {backgroundColor:'#ccc'}]}
                    disabled={!email}
                    onPress={async()=>{
                        const res=await handleStudentOtpSend(email)
                        if(res.success==true){
                           // otp is sent to the mail(if mail was valid)
                           console.log(res.messageId)
                           navigation.navigate('StudentVerifyOtpScreen',{session,email})
                        }
                        else{
                           console.log(res.message)
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}