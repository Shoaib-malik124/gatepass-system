import { View, Text, TouchableOpacity,Alert,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../stylesheets/student_dashboard_styles.js';
import * as SecureStore from 'expo-secure-store';
import handleStudentDashboard from '../../apis/studentDashboardApi.js';
import { useState,useEffect,useRef,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function StudentDashboard({ navigation,route }) {
  const { token } = route.params || {};
  const [ gatepass,setGatepass ] = useState('')
  const [ hasPass,setHaspass ] = useState(false)

  const [loading,setLoading]=useState(false)
  const isMounted = useRef(false)

  useFocusEffect(
    useCallback(
      ()=>{
        const checkPass = async () => {
          try {
            const passResponse = await handleStudentDashboard(token, 'checkPass', 'get');

            if (passResponse.success==true) {
              setGatepass(passResponse.gatepass);
              setHaspass(true);
            }
          } catch (err) {
            console.log(err);
          }
        };

        checkPass()
      },[token]
    )
  );

  useEffect(() => {
      isMounted.current = true
      return () => {
          isMounted.current = false
      }
  }, [])

  const handleApplyPress=async()=>{
    if(isMounted.current)setLoading(true)
    try {
      const res=await handleStudentDashboard(token,'requestPass','get');
      if(isMounted.current)setLoading(false)

      if(res.success==true){
        setGatepass(res.token)
        setHaspass(true)
        Alert.alert("Success",`${res.message}`)
      }
      else{
        Alert.alert("Success",`${res.message}`)
      }
    } catch (error) {
      if(isMounted.current)setLoading(false)
      Alert.alert("Something went wrong")
    }
  }

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >

      {/* Top Left Button */}
      <View style={styles.topLeftContainer}>
        <TouchableOpacity style={[styles.topButton,!hasPass&&{backgroundColor:'#ccc'}]}
        disabled={!hasPass}
        onPress={
          ()=>{
            navigation.navigate('QRScannerScreen',{gatepass})
          }
        }
        >
          <Text 
            style={styles.topButtonText}
          >
          Gatepass Token
          </Text>
        </TouchableOpacity>
      </View>

      {/* Top Right Buttons */}
      <View style={styles.topRightContainer}>
        <TouchableOpacity style={styles.topButton}
          onPress={
            async()=>{
              await SecureStore.deleteItemAsync('token')
              navigation.reset({
                index:0,
                routes:[
                  {
                    name:'RoleSelectionScreen'
                  }
                ]
              });
            }
          }
        >
          <Text style={styles.topButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.topButton, styles.deleteButton]}
          onPress={
            async()=>{
              const res=await handleStudentDashboard(token,'delete','get');
              if(res.success==true){
                await SecureStore.deleteItemAsync('token')
                navigation.reset({
                  index:0,
                  routes:[
                    {
                      name:'RoleSelectionScreen'
                    }
                  ]
                });
              }
              else{
                Alert.alert("Something went wrong")
              }
            }
          }
        >
          <Text style={styles.topButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Card 1 */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={28} color="#4facfe" />
        </View>

        <Text style={styles.title}>Request Pass</Text>
        <Text style={styles.subtitle}>Apply for a new gate pass</Text>

        <TouchableOpacity
          style={[styles.button,(hasPass||loading)&&{backgroundColor:'#ccc'}]}
          disabled={hasPass || loading}
          onPress={handleApplyPress}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Apply</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Card 2 */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="card-outline" size={28} color="#00c6ff" />
        </View>

        <Text style={styles.title}>Pay Fine</Text>
        <Text style={styles.subtitle}>Clear your pending dues</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}