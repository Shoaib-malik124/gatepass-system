import { View,Image,Text,TouchableOpacity } from 'react-native'
import { styles } from '../stylesheets/studentAuth_styles.js'

export default function StudentAuth({navigation,route}){
    const {role}=route.params || {}
    return(
    <View style={styles.container}>
        <View style={styles.card}>
            <Image
                source={require('../../assets/icon.png')}
                style={styles.image}
            />
            
            <TouchableOpacity 
             style={styles.button}
             onPress={()=>{
               navigation.navigate('StudentLoginSignupScreen',{session:'login',role,email:""})
             }}
            >
             <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
             style={styles.button}
             onPress={()=>{
               navigation.navigate('StudentOtpSendScreen')
             }}
            >
             <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

        </View>
    </View>
    )
}

