import { View, Text, Image } from 'react-native';
import { styles } from '../stylesheets/header_styles.js';

export default function AppHeader() {
  return (
    <View style={styles.wrapper}>
      
      <View style={styles.container}>
        <Text style={styles.title}>NIT SRINAGAR</Text>

        <Image
          source={require('../../assets/gatepass_logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.line} />
    </View>
  );
}
