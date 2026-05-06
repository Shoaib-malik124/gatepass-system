import React from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { styles } from "../stylesheets/decisionDashboard_styles.js";
import { handleSecurityDashboard } from "../../apis/securityDashboardApi.js";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useState,useEffect,useRef } from "react";

export default function DecisionDashboard({ route, navigation }) {
  const { session, token, enrollment, id } = route.params || {};
  const [loading,setLoading]=useState(false)
  const isMounted=useRef(false)

  useEffect(
    ()=>{
      isMounted.current=true
      return ()=>{
        isMounted.current=false
      }
    }
  )

  const handlePress=async(signal)=>{
    if(isMounted.current)setLoading(true)
    try {
      const res = await handleSecurityDashboard({
        session:session,
        signal:signal, 
        id:id,
        jwt_token:token,
        route:'scanGatePass'
      });

      if(isMounted.current)setLoading(false)

      Alert.alert(res.message);
      navigation.replace('SecurityDashboardScreen', { token });

    } catch (error) {
      if(isMounted.current)setLoading(false)
      Alert.alert("Something went wrong")
      navigation.replace('SecurityDashboardScreen', { token });
    }
  }

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >
      <View style={styles.content}>

        {/* HEADER */}
        <Text style={styles.title}>
          Student enrollment: {enrollment}
        </Text>

        {/* APPROVE CARD */}
        <View style={styles.card}>

          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-done-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.cardTitle}>Approve Student Gatepass</Text>

          <Text style={styles.subText}>
            Allow student to {session} campus
          </Text>

          <TouchableOpacity
            style={[styles.button,loading&&({backgroundColor:'#ccc'})]}
            disabled={loading}
            onPress={()=>handlePress('accept')}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Approve</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* DECLINE CARD */}
        <View style={styles.card}>

          <View style={styles.iconContainer}>
            <Ionicons name="close-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.cardTitle}>Decline Student Gatepass</Text>

          <Text style={styles.subText}>
            Reject the gatepass request
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.declineButton,loading&&({backgroundColor:'#ccc'})]}
            disabled={loading}
            onPress={()=>handlePress('reject')}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Decline</Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}