import { View,Image,Text,TouchableOpacity } from 'react-native'
import { styles } from '../stylesheets/studentAuth_styles.js'

export default function StudentAuth({navigation}){
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
               navigation.navigate('StudentLoginSignupScreen',{session:'Login'})
             }}
            >
             <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
             style={styles.button}
             onPress={()=>{
               navigation.navigate('StudentOtpSendScreen',{session:'Signup'})
             }}
            >
             <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

        </View>
    </View>
    )
}

