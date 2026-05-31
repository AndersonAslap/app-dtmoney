import { DismissKeyboardView } from "../../components/DismissKeyboardView"
import { AuthHeader } from "../../components/AuthHeader"
import { View } from "react-native"
import { RegisterForm } from "./components/RegisterForm"

export const Register = () => {
    return (
        <DismissKeyboardView>
            <View className="flex-1 w-[82%] self-center">
                <AuthHeader />
                <RegisterForm />
            </View>
        </DismissKeyboardView>
    )
}