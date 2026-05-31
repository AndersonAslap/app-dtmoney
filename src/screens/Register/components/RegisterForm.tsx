import { Text, View } from "react-native"
import { AppInput } from "../../../components/AppInput"
import { AppButton } from "../../../components/AppButton"
import { useForm } from "react-hook-form"
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { PublicStackRoutes } from "../../../routes/publicRoutes";

export interface FormRegisterParams {
    email: string;
    name: string;
    password: string;
    consfirm_password: string;
}

export const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState : { isSubmitting }
    } = useForm<FormRegisterParams>()

    const navigation = useNavigation<NavigationProp<PublicStackRoutes>>();

    return (
        <>
            <AppInput
                control={control}
                name="name"
                label="NOME"
                leftIconName="person"
                placeholder="Seu nome"
            />

            <AppInput
                control={control}
                name="email"
                label="EMAIL"
                leftIconName="mail-outline"
                placeholder="mail@examle.com"
            />

            <AppInput
                control={control}
                name="password"
                label="SENHA"
                leftIconName="lock-outline"
                placeholder="Sua senha"
                secureTextEntry
            />

            <AppInput
                control={control}
                name="consfirm_password"
                label="CONFIRMAR SENHA"
                leftIconName="lock-outline"
                placeholder="Confirme sua senha"
                secureTextEntry
            />

            <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
                <AppButton iconName="arrow-forward">
                    Cadastrar
                </AppButton>

                <View>
                    <Text className="mb-6 text-gray-300 text-base">
                        Já possui uma conta?
                    </Text>
                    <AppButton iconName="arrow-forward" mode="outline" onPress={() => navigation.navigate("login")}>
                        Acessar
                    </AppButton>
                </View>
            </View>
        </>
    )
}