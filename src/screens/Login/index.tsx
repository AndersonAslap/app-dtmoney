import { View } from "react-native"

import { LoginForm } from "./components/loginForm"
import { DismissKeyboardView } from "../../components/DismissKeyboardView"


export const Login = () => {
    return (
        <DismissKeyboardView>
            <View className="flex-1 w-[82%] self-center">
                <LoginForm />
            </View>
        </DismissKeyboardView>
    )
}