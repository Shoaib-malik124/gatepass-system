import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import RoleSelectScreen from './tabs/roleSelect.js'
import AdminSecurityLogin from './tabs/admin_security_Auth.js'
import StudentOtpSend from './tabs/studentOtpSend.js'
import StudentVerifyOtp from './tabs/studentVerifyOtp.js'


const Stack=createNativeStackNavigator()

export default function App(){
  return(
      <Stack.Navigator>
          <Stack.Screen
            name="RoleSelectionScreen"
            component={RoleSelectScreen}
            options={{ headerShown: false }}
          />
            
          <Stack.Screen
            name='AdminSecurityLoginScreen'
            component={AdminSecurityLogin}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='StudentOtpSendScreen'
            component={StudentOtpSend}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='StudentVerifyOtpScreen'
            component={StudentVerifyOtp}
            options={{ headerShown: false }}
          />

      </Stack.Navigator>
  )
}