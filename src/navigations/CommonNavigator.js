import React from "react";

//J'importe mes icônes
import { Ionicons } from "@expo/vector-icons";

//J'importe toutes mes méthodes de création de navigateurs
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//J'importe tous mes écrans ici
import HomeScreen from "../screens/Home/HomeScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import BookingScreen from "../screens/Booking/BookingScreen";
import { getUserProfile } from "../services/users";

//Je déclare mes navigateurs
const TabNavigator = createBottomTabNavigator();
const DrawerNavigator = createDrawerNavigator();

export default function CommonNavigator() {
  return (
    <TabNavigator.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Accueil") {
              iconName = focused ? "ios-home" : "home-outline";
            }
            if (route.name === "Réservations") {
              iconName = focused ? "cash" : "cash-outline";
            }
            if (route.name === "Profil") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }
            if (route.name === "Plus") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <TabNavigator.Screen name="Accueil" component={HomeScreen} />
        <TabNavigator.Screen
          name="Réservations"
          component={BookingScreen}
        />
        <TabNavigator.Screen name="Profil" component={AccountScreen} />
        <TabNavigator.Screen name="Plus" component={HomeScreen} />
      </TabNavigator.Navigator>
    
  );
}
