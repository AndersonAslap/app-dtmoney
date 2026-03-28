
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/login";
import { Register } from "../screens/register";

type PublicStackRoutes = {
    login: undefined;
    register: undefined;
}

const NavigationRoutes = () => {

    const PublicRoutes = createStackNavigator<PublicStackRoutes>();

    return (
        <NavigationContainer>
            <PublicRoutes.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <PublicRoutes.Screen name="login" component={Login}/>
                <PublicRoutes.Screen name="register" component={Register}/>
            </PublicRoutes.Navigator>
        </NavigationContainer>
    )
}

export default NavigationRoutes;