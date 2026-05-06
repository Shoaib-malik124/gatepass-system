import * as SecureStore from 'expo-secure-store'
import { resetToRoleSelection } from '../app/navigation/navigationRef.js'

export const forcedLogout=()=>{
    try {
      await SecureStore.deleteItemAsync('token')
    } catch (error) {
      console.log(error.message)
    }
    resetToRoleSelection()
}