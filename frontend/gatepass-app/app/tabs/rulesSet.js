import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../stylesheets/setRules_styles.js";

export default function SetRules({ navigation, route }) {
  const [permission, setPermission] = useState(true);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [fine, setFine] = useState("");

  const { token } = route.params || {};

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
            styles.button,
            
          ]}
          
          onPress={() => {
            
          }}
        >
          <Text style={styles.buttonText}>Apply Rules</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}