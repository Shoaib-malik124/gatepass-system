import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { styles } from "../stylesheets/decisionDashboard_styles.js";
import {
  handleDecisionDashboard,
  handleSecurityDashboard,
} from "../../apis/securityDashboardApi.js";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useRef } from "react";

export default function DecisionDashboard({ route, navigation }) {
  const { session, token, enrollment, id } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [newEnroll, setNewEnroll] = useState("");

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAcceptRejectPress = async (signal) => {
    if (isMounted.current) setLoading(true);

    try {
      const res = await handleSecurityDashboard({
        session: session,
        signal: signal,
        id: id,
        jwt_token: token,
        route: "scanGatePass",
      });

      if (isMounted.current) setLoading(false);

      Alert.alert(res.message);

      navigation.replace("SecurityDashboardScreen", { token });
    } catch (error) {
      if (isMounted.current) setLoading(false);

      Alert.alert("Something went wrong");
    }
  };

  const handleFinePress = async () => {
    if (isMounted.current) setLoading(true);

    try {
      const res = await handleDecisionDashboard({
        enrollment: newEnroll,
        jwt_token: token,
        route: "imposeFine",
      });

      if (isMounted.current) setLoading(false);

      Alert.alert(res.message);

      navigation.replace("SecurityDashboardScreen", { token });
    } catch (error) {
      if (isMounted.current) setLoading(false);

      Alert.alert("Something went wrong");
    }
  };

  return (
    <LinearGradient
      colors={["#4facfe", "#00f2fe"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* HEADER */}
          <Text style={styles.title}>
            Student Enrollment: {enrollment}
          </Text>

          {/* APPROVE CARD */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="checkmark-done-outline"
                size={28}
                color="#4facfe"
              />
            </View>

            <Text style={styles.cardTitle}>
              Approve Student Gatepass
            </Text>

            <Text style={styles.subText}>
              Allow student to {session} campus
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                loading && { backgroundColor: "#ccc" },
              ]}
              disabled={loading}
              onPress={() => handleAcceptRejectPress("accept")}
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
              <Ionicons
                name="close-outline"
                size={28}
                color="#ff5c5c"
              />
            </View>

            <Text style={styles.cardTitle}>
              Decline Student Gatepass
            </Text>

            <Text style={styles.subText}>
              Reject the gatepass request
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                styles.declineButton,
                loading && { backgroundColor: "#ccc" },
              ]}
              disabled={loading}
              onPress={() => handleAcceptRejectPress("reject")}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Decline</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* FINE CARD */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="warning-outline"
                size={28}
                color="#ff9f43"
              />
            </View>

            <Text style={styles.cardTitle}>Impose Fine</Text>

            <Text style={styles.subText}>
              Impose fine on student
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter enrollment"
              placeholderTextColor="#999"
              value={newEnroll}
              onChangeText={setNewEnroll}
            />

            <TouchableOpacity
              style={[
                styles.button,
                styles.fineButton,
                (loading || !newEnroll) && {
                  backgroundColor: "#ccc",
                },
              ]}
              disabled={loading || !newEnroll}
              onPress={handleFinePress}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  Impose Fine
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}