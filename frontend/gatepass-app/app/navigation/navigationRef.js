import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef=createNavigationContainerRef()

export const resetToRoleSelection=()=>{
    if(navigationRef.isReady()){
        navigationRef.reset({
            index:0,
            routes:[{name:'RoleSelectionScreen'}]
        })
    }
}