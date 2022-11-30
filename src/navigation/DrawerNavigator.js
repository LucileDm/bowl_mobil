import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';

function AccountSettings({ navigation }) {
    return (
        <View>
            <Button onPress={() => navigation.navigate('AccountSettings')}
            title="Paramètres du compte"
            />
        </View>
    )
}

function BookingSystem({ navigation }) {
    return (
        <View>
            <Button onPress={() => navigation.navigate('BookingSystem')}
            title="Réservations"
            />
        </View>
    )
}
function FidelityAccount({ navigation }) {
    return (
        <View>
            <Button onPress={() => navigation.navigate('FidelityAccount')}
            title="Compte fidélité"
            />
        </View>
    )
}

function ReviewSystem({ navigation }) {
    return (
        <View>
            <Button onPress={() => navigation.navigate('ReviewSystem')}
            title="Avis"
            />
        </View>
    )
}

function RestaurantSelect({ navigation }) {
    return (
        <View>
            <Button onPress={() => navigation.navigate('RestaurantSelect')}
            title="Sélection du restaurant"
            />
        </View>
    )
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="AccountSettings">
                <Drawer.Screen name="Paramètres du compte" component={AccountSettings} />
                <Drawer.Screen name="Réservations" component={BookingSystem} />
                <Drawer.Screen name="Compte fidélité" component={FidelityAccount} />
                <Drawer.Screen name="Avis" component={ReviewSystem} />
                <Drawer.Screen name="Sélection du restaurant" component={RestaurantSelect} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}