import { createStackNavigator } from "@react-navigation/stack"
import { Home } from "../screens/Home";

export type PrivateStackRoutes = {
    home: undefined;
}

export const PrivateRoutes = () => {
    const PrivateStack = createStackNavigator<PrivateStackRoutes>();

    return (
        <PrivateStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <PrivateStack.Screen name="home" component={Home}/>
        </PrivateStack.Navigator>
    )
}