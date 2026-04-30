import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../stylesheets/decisionDashboard_styles.js";
import { handleSecurityDashboard } from "../../apis/securityDashboardApi.js";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function DecisionDashboard({ route, navigation }) {
  const { session, token, enrollment, id } = route.params || {};

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
            style={styles.button}
            onPress={async () => {
              const res = await handleSecurityDashboard({
                session:session,
                signal:'accept', 
                id:id,
                jwt_token:token,
                route:'scanGatePass'
              });

              if (res.success == true) {
                console.log(`Gatepass approved for ${session}`);
              } else {
                console.log("hello")
                console.log(res.message);
              }

              navigation.replace('SecurityDashboardScreen', { token });
            }}
          >
            <Text style={styles.buttonText}>Approve</Text>
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
            style={[styles.button, styles.declineButton]}
            onPress={async () => {
              const res = await handleSecurityDashboard({
                session:session,
                signal:'reject', 
                id:id,
                jwt_token:token,
                route:'scanGatePass'
              });

              if (res.success == true) {
                console.log(`Gatepass rejected for ${session}`);
              } else {
                console.log("hello")
                console.log(res.message);
              }

              navigation.replace('SecurityDashboardScreen', { token });
            }}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  );
}