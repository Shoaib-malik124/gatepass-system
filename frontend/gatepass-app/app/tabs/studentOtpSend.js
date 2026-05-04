import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { useState,useRef,useEffect } from 'react'
import { styles } from '../stylesheets/studentOtpSend_styles.js'
import handleStudentOtpSend from '../../apis/studentOtpSendApi.js'

export default function StudentOtpSend({ navigation, route }) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    const handlePress = async () => {
        if (isMounted.current)setLoading(true)

        try {
            const res = await handleStudentOtpSend(email)

            if (isMounted.current)setLoading(false)

            if (res.success) {
                Alert.alert("Success", `OTP sent to ${email}`)
                navigation.navigate('StudentVerifyOtpScreen', { email })
            } else {
                Alert.alert("Error", res.message)
            }

        } catch (error) {
            if (isMounted.current)setLoading(false)
            Alert.alert("Error", "Something went wrong")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <Image
                    source={require('../../assets/icon.png')}
                    style={styles.Image}
                />

                <Text style={styles.title}>Verify your college mail</Text>

                <Text style={styles.label}>Email</Text>

                <TextInput
                    placeholder='Enter your college mail address'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <TouchableOpacity
                    style={[styles.button, (!email || loading) && { backgroundColor: '#ccc' }]}
                    disabled={!email || loading}
                    onPress={handlePress}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Proceed</Text>
                    )}
                </TouchableOpacity>

            </View>
        </View>
    )
}