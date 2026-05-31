import { Image, View } from "react-native"
import { useKeyboardVisible } from "../shared/hooks/useKeyboardVisible"

export const AuthHeader = () => {

    const keyboardIsVisible = useKeyboardVisible();

    if (keyboardIsVisible) return <></>;

    return (
        <View className="items-center justify-center w-full min-h-40">
            <Image
                className="h-[48px] w-[255px]"
                source={require("../assets/logo.png")}
            />
        </View>
    )
}