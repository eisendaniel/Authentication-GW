import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from "../../pages/dashboard";
import LogPage from "../../pages/logs"

const Stack = createNativeStackNavigator();

export default function Navigator(){

    return(

    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false, contentStyle:{backgroundColor:"#212121"} }} >
    
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="LogPage" component={LogPage} />

    </Stack.Navigator>
    );

};