import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/Login/LoginScreen';
import RegisterScreen from '../../screens/Register/RegisterScreen';
import TextLogo from '../../components/TextLogo.js';

const Stack = createNativeStackNavigator();
const headerTitle =  { headerTitle: () => <TextLogo /> } ;

function LoginStackNavigation() {
    return(
        <Stack.Navigator>

            <Stack.Screen 
                name='Login'
                component={LoginScreen}
                options={headerTitle}
                />
            
            <Stack.Screen
                name='Register'
                component={RegisterScreen}
                options={headerTitle}
                />
        </Stack.Navigator>
    );
}

export default LoginStackNavigation;