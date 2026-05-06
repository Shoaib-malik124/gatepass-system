import { useState,useEffect,useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../stylesheets/setRules_styles.js";
import handleRulesSet from "../../apis/rulesSetApi.js";

export default function SetRules({ navigation, route }) {
  const [permission, setPermission] = useState(true);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [fine, setFine] = useState("");
  const [loading,setLoading]=useState(false)
  const isMounted=useRef(false)

  const { token } = route.params || {};

  useEffect(
    ()=>{
      isMounted.current=true
      return ()=>{
        isMounted.current=false
      }
    },[]
  )

  const handlePress=async()=>{
    if(isMounted.current)setLoading(true)
    try {
      const res=await handleRulesSet(token,permission,start,end,fine)
      if(isMounted.current)setLoading(false)
      Alert.alert(res.message)
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
      <View style={styles.card}>

        <Text style={styles.title}>Set Gatepass Rules</Text>

        {/* Permission Picker */}
        <Text style={styles.label}>Permission</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={permission}
            onValueChange={(itemValue) => setPermission(itemValue)}
          >
            <Picker.Item label="Allowed" value={true} />
            <Picker.Item label="Not Allowed" value={false} />
          </Picker>
        </View>

        {/* Start Time */}
        <Text style={styles.label}>Start Time</Text>
        <TextInput
          placeholder="e.g. 09:00"
          value={start}
          onChangeText={setStart}
          style={styles.input}
        />

        {/* End Time */}
        <Text style={styles.label}>End Time</Text>
        <TextInput
          placeholder="e.g. 18:00"
          value={end}
          onChangeText={setEnd}
          style={styles.input}
        />

        {/* Fine Rate */}
        <Text style={styles.label}>Fine Rate</Text>
        <TextInput
          placeholder="Enter fine amount"
          value={fine}
          onChangeText={setFine}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,(loading)&&({backgroundColor:'#ccc'})
          ]}
          disabled={loading}
          
          onPress={handlePress}
        >
          {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Apply Rules</Text>
            )}
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}