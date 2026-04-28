import { useState } from "react"
import { View,Image,Text,TouchableOpacity, TextInput } from "react-native"
import { styles } from "../stylesheets/studentLoginSignup_styles.js";
import handleStudentLogin from "../../apis/studentLoginApi.js";
import handleStudentRegister from "../../apis/studentRegisterApi.js";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default function StudentLoginSignup({navigation,route}){
    const [enrollment,setEnrollment]=useState('');
    const [password,setPassword]=useState('');
    const {session,role,email}=route.params|| {}

    return(
       <View style={styles.container}>
           <View style={styles.card}>
               <Image
                source={require('../../assets/icon.png')}  
                style={styles.logo}
               />

               <Text style={styles.title}>{session} to your account</Text>

               <Text style={styles.label}>Enrollment</Text>
               <TextInput
                    placeholder="Enter your class enrollment"
                    value={enrollment}
                    onChangeText={setEnrollment}
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
                    style={[styles.button,(!enrollment || !password)&&{backgroundColor:'#ccc'}]}
                    disabled={!enrollment || !password}
                    onPress={async()=>{
                        if(session=='login'){
                            // const res=await handleStudentLogin(role,enrollment,password)
                            if(res.success==true){
                              console.log(res.token)

                              const token=res.token
                              await SecureStore.setItemAsync(`token`,token);
                              navigation.navigate('StudentDashboardScreen',{token})
                            }
                            else{
                              console.log(res.message)
                            }
                        }
                        else{
                            const res=await handleStudentRegister(enrollment,password,email)
                            if(res.success==true){
                              console.log(res.message)
                              navigation.navigate('StudentLoginSignupScreen',{session:'login',role:'student'})
                            }
                            else{
                              console.log(res.message)
                              if(res.message=='This account already exists'){
                                navigation.navigate('StudentLoginSignupScreen',{session:'login',role:'student'})
                              }
                            }
                        }
                    }}
               >
                <Text style={styles.buttonText}>{session}</Text>
               </TouchableOpacity>
           </View>
       </View>
    )
}

