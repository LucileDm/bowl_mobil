import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home/HomeScreen.js';
import ErrorScreen from '../../screens/ErrorScreen/ErrorScreen.js';
import TextLogo from '../../components/TextLogo.js';

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo />};

function ErrorStackNavigation() {
    return(
        <Stack.Navigator 
            screenOptions={{
                headerStyle: { 
                    backgroundColor: '#fff'
                }
            }}>
            <Stack.Screen 
                name='Error'
                component={ErrorScreen}
                options={headerTitle} />

            <Stack.Screen 
                name='Home'
                component={HomeScreen}
                options={headerTitle} />
        </Stack.Navigator>
    );
}

export default ErrorStackNavigation;