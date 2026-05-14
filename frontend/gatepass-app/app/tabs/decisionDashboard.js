import React from "react";
import { View, TouchableOpacity, Text, Alert, TextInput, ActivityIndicator } from "react-native";
import { styles } from "../stylesheets/decisionDashboard_styles.js";
import { handleDecisionDashboard, handleSecurityDashboard } from "../../apis/securityDashboardApi.js";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useState,useEffect,useRef } from "react";

export default function DecisionDashboard({ route, navigation }) {
  const { session, token, enrollment, id } = route.params || {};
  const [loading,setLoading]=useState(false)
  const [newEnroll,setNewEnroll]=useState(null)
  const isMounted=useRef(false)

  useEffect(
    ()=>{
      isMounted.current=true
      return ()=>{
        isMounted.current=false
      }
    }
  )

  const handleAcceptRejectPress=async(signal)=>{
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
      if(res.success){
        navigation.replace('SecurityDashboardScreen', { token });
      }

    } catch (error) {
      if(isMounted.current)setLoading(false)
      Alert.alert("Something went wrong")
    }
  }

  const handleFinePress=async()=>{
    if(isMounted.current)setLoading(true)
    try {
      const res = await handleDecisionDashboard({
        enrollment:enrollment,
        jwt_token:token,
        route:'imposeFine'
      });

      if(isMounted.current)setLoading(false)
      Alert.alert(res.message)
      if(res.success){
        navigation.replace('SecurityDashboardScreen', { token });
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
            onPress={()=>handleAcceptRejectPress('accept')}
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
            onPress={()=>handleAcceptRejectPress('reject')}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Decline</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Impose fine card */}
        <View style={styles.card}>

          <View style={styles.iconContainer}>
            <Ionicons name="close-outline" size={28} color="#4facfe" />
          </View>

          <Text style={styles.cardTitle}>Impose Fine</Text>

          <Text style={styles.subText}>
            Impose fine on student
          </Text>

          <TextInput
           style={styles.input}
           placeholder="Enter your enrollment"
           value={newEnroll}
           onChange={setNewEnroll}
          ></TextInput>

          <TouchableOpacity
            style={[styles.button, styles.declineButton,(loading || !newEnroll)&&({backgroundColor:'#ccc'})]}
            disabled={loading || !newEnroll}
            onPress={()=>handleFinePress()}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Impose Fine</Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}