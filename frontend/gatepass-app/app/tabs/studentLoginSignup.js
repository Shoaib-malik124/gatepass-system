import { useState } from "react"
import { View,Image,Text,TouchableOpacity, TextInput } from "react-native"
import { styles } from "../stylesheets/studentLoginSignup_styles";

export default function StudentLoginSignup({route}){
    const [enrollment,setEnrollment]=useState('');
    const [password,setPassword]=useState('');
    const {session}=route.params || {}

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
                    onPress={()=>console.log(enrollment,password)}
               >
                <Text style={styles.buttonText}>Login</Text>
               </TouchableOpacity>
           </View>
       </View>
    )
}

