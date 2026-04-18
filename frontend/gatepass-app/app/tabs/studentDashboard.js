import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/student_dashboard_styles.js';
import handleStudentDashboardPass from '../../apis/studentDashboardApi.js';


export default function StudentDashboard({ route }) {
  const {token}=route.params || {}
  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >
      
      {/* Card 1 */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={28} color="#4facfe" />
        </View>

        <Text style={styles.title}>Request Pass</Text>
        <Text style={styles.subtitle}>Apply for a new gate pass</Text>

        <TouchableOpacity style={styles.button}
          onPress={
            async()=>{
              const res=await handleStudentDashboardPass(token)
              if(res.success==true){
                console.log(res.message)
              }
              else{
                console.log(res.message)
              }
            }
          }
        >
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Card 2 */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="card-outline" size={28} color="#00c6ff" />
        </View>

        <Text style={styles.title}>Pay Fine</Text>
        <Text style={styles.subtitle}>Clear your pending dues</Text>

        <TouchableOpacity style={styles.button}
          onPress={
            ()=>{

            }
          }
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}
