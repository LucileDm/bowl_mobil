import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/Home/HomeScreen.js';
import BowlScreen from '../../screens/Bowl/BowlScreen.js';
import BookingScreen from '../../screens/Booking/BookingScreen.js';
import ReviewScreen from '../../screens/Reviews/ReviewScreen.js';
import RestaurantListScreen from '../../screens/Restaurant/RestaurantListScreen.js';
import RestaurantScreen from '../../screens/Restaurant/RestaurantScreen';
import TextLogo from '../../components/TextLogo.js';

import ErrorStack from './ErrorStackNavigation';
const Stack = createNativeStackNavigator();
const headerTitle = { headerTitle: () => <TextLogo />};

function HomeStackNavigation() {
    return(
        <Stack.Navigator 
            screenOptions={{
                textColor: 'tomato',
                headerStyle: { 
                    backgroundColor: '#fff'
                }
            }}>

            <Stack.Screen 
                name='Home'
                component={HomeScreen}
                options={headerTitle}/>

            <Stack.Screen name='RestaurantList' component={RestaurantListScreen}/>
            <Stack.Screen name='Restaurant' component={RestaurantScreen} />
            <Stack.Screen name='Reservation' component={BookingScreen} />
            <Stack.Screen name='Review' component={ReviewScreen} />
            <Stack.Screen name='Bowl' component={BowlScreen}/>
            <Stack.Screen options={{headerShown: false}} name='Erreur' component={ErrorStack}/>
        </Stack.Navigator>
    );
}

export default HomeStackNavigation;