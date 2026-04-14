// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useState } from 'react';

// export default function App() {
//   const [enrollment, setEnrollment] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <View style={styles.container}>
      
//       <View style={styles.card}>
        
//         {/* Logo */}
//         <Image 
//           source={require('../assets/icon.png')} 
//           style={styles.logo}
//         />

//         <Text style={styles.title}>Student Portal</Text>
//         <Text style={styles.subtitle}>Sign In</Text>

//         {/* Username */}
//         <Text style={styles.label}>Username</Text>
//         <TextInput
//           placeholder="Enrollment Number"
//           value={enrollment}
//           onChangeText={setEnrollment}
//           style={styles.input}
//         />

//         {/* Password */}
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         />

//         {/* Login Button */}
//         <TouchableOpacity style={styles.loginBtn}>
//           <Text style={styles.btnText}>Login</Text>
//         </TouchableOpacity>

//         {/* Bottom Buttons */}
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.registerBtn}>
//             <Text style={styles.btnText}>New Registration</Text>
//           </TouchableOpacity>
//         </View>

//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eaeaea',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },

//   card: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//   },

//   logo: {
//     width: 80,
//     height: 80,
//     alignSelf: 'center',
//     marginBottom: 10,
//   },

//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },

//   subtitle: {
//     marginTop: 15,
//     fontSize: 18,
//   },

//   label: {
//     marginTop: 10,
//     marginBottom: 5,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//   },

//   loginBtn: {
//     backgroundColor: '#4a6cf7',
//     padding: 10,
//     marginTop: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },

//   registerBtn: {
//     backgroundColor: 'green',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },

//   resetBtn: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//     alignItems: 'center',
//   },

//   row: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },

//   btnText: {
//     color: 'white',
//     textAlign: 'center',
//   },
// });