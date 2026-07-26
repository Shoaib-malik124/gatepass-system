import { useState,useEffect,useRef } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { styles } from "../stylesheets/studentLoginSignup_styles.js";
import handleStudentLogin from "../../apis/studentLoginApi.js";
import handleStudentRegister from "../../apis/studentRegisterApi.js";
import * as SecureStore from 'expo-secure-store';

export default function StudentLoginSignup({ navigation, route }) {
    const [enrollment, setEnrollment] = useState('');
    const [password, setPassword] = useState('');
    const { session, role, email } = route.params || {};

    const [loading, setLoading] = useState(false);

    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    const handleSubmit = async () => {
        if (isMounted.current)setLoading(true);

        try {
            if (session === 'login') {
                const res = await handleStudentLogin(role, enrollment, password);

                if (res.success === true) {
                    const token = res.token;
                    await SecureStore.setItemAsync('token', token);

                    if (isMounted.current)setLoading(false);
                    Alert.alert("Success", "Login successful");

                    navigation.replace('StudentDashboardScreen', { token });
                } else {
                    if (isMounted.current)setLoading(false);
                    Alert.alert("Error", res.message);
                }
            } else {
                const res = await handleStudentRegister(enrollment, password, email);

                if (res.success === true) {
                    if (isMounted.current)setLoading(false);
                    Alert.alert("Success", res.message);

                    navigation.replace('StudentLoginSignupScreen', {
                        session: 'login',
                        role: 'student'
                    });
                } else {
                    if (isMounted.current)setLoading(false);
                    Alert.alert("Error", res.message);

                    if (res.message === 'This account already exists') {
                        navigation.replace('StudentLoginSignupScreen', {
                            session: 'login',
                            role: 'student'
                        });
                    }
                }
            }
        } catch (err) {
            if (isMounted.current)setLoading(false);
            Alert.alert("Error", "Something went wrong");
        }
    };

    return (
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
                    style={[
                        styles.button,
                        (!enrollment || !password || loading) && { backgroundColor: '#ccc' }
                    ]}
                    disabled={!enrollment || !password || loading}
                    onPress={handleSubmit}
                >
                    {/* 🔥 Loader Overlay */}
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Proceed</Text>
                    )}
                </TouchableOpacity>

            </View>
        </View>
    );
}