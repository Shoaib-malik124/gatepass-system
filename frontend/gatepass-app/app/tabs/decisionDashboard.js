import { View,TouchableOpacity,LinearGradient,Text } from "react-native";
import { styles } from "../stylesheets/decisionDashboard_styles.js";
import { handleSecurityDashboard } from "../../apis/securityDashboardApi.js";

export default function DecisionDashboard({route}){
    const {session,token,enrollment,id}=route.params || {}

    return (
        <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            style={styles.container}
        >
          
          <Text style={styles.title}>Student enrollment {enrollment}</Text>

          <View style={styles.card}>

            <View style={styles.iconContainer}>
               <Ionicons name="document-text-outline" size={28} color="#4facfe" />
            </View>

            <Text style={styles.title}>Approve Student Gatepass</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={
                    async()=>{
                      const res=await handleSecurityDashboard(session,'accept',id,token,'scanGatepass')
                      if(res.success==true){
                        console.log(`Gatepass approved for ${session}`)
                      }
                      else{
                        console.log(res.message)
                      }
                      // navigate to the securityDashboard
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'SecurityDashboardScreen' }]
                      });
                    }
                }
            >
              <Text>Approve</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>

            <View style={styles.iconContainer}>
               <Ionicons name="document-text-outline" size={28} color="#4facfe" />
            </View>

            <Text style={styles.title}>Decline Student Gatepass</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={
                    async()=>{
                      const res=await handleSecurityDashboard(session,'reject',id,token,'scanGatepass')
                      if(res.success==true){
                        console.log(`Gatepass rejected for ${session}`)
                      }
                      else{
                        console.log(res.message)
                      }
                      // navigate to the securityDashboard
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'SecurityDashboardScreen' }]
                      });
                    }
                }
            >
              <Text>Decline</Text>
            </TouchableOpacity>
          </View>

        </LinearGradient>
    )
}