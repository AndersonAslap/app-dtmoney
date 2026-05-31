import { useForm } from "react-hook-form";
import { AppInput } from "../../../components/AppInput";

export interface FormLoginParams {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState : { isSubmitting }
    } = useForm<FormLoginParams>()

    return (
        <>
            <AppInput
                control={control}
                name="email"
                label="Email"
                leftIconName="mail"
                placeholder="mail@examle.com"
            />
        </>
    )
}