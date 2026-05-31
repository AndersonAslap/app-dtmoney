import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

export type PublicStackRoutes = {
    login: undefined;
    register: undefined;
}

export const PublicRoutes = () => {
    const PublicStack = createStackNavigator<PublicStackRoutes>();

    return (
        <PublicStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <PublicStack.Screen name="login" component={Login}/>
            <PublicStack.Screen name="register" component={Register}/>
        </PublicStack.Navigator>
    )
}