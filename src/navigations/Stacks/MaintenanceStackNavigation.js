import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home/HomeScreen.js';
import MaintenanceScreen from '../../screens/Maintenance/MaintenanceScreen.js';
import TextLogo from '../../components/TextLogo.js';

const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo />};

function MaintenanceStackNavigation() {
    return(
        <Stack.Navigator 
            screenOptions={{
                headerStyle: { 
                    backgroundColor: '#fff'
                }
            }}>
            <Stack.Screen 
                name='Maintenance'
                component={MaintenanceScreen}
                options={headerTitle}/>

            <Stack.Screen 
                name='Home'
                component={HomeScreen}
                options={headerTitle}/>
        </Stack.Navigator>
    );
}

export default MaintenanceStackNavigation;