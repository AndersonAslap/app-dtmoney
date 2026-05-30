import { Text, TextInput, View } from "react-native"
import { DismissKeyboardView } from "../components/DismissKeyboardView"


export const Login = () => {
    return (
        <DismissKeyboardView>
            <Text>Tela de login!</Text>
            <TextInput className="bg-gray-500 w-full" />
        </DismissKeyboardView>
    )
}