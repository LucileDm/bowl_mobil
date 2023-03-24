import React from "react";

//J'importe mes icônes
import { Ionicons } from "@expo/vector-icons";

//J'importe toutes mes méthodes de création de navigateurs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//J'importe tous mes écrans ici
import HomeStackNavigation from "../Stacks/HomeStackNavigation";
import ProfileStackNavigation from "../Stacks/ProfileStackNavigation";
import BookingStackNavigation from "../Stacks/BookingStackNavigation";
import LinkStackNavigation from "../Stacks/LinkStackNavigation";

//Je déclare mes navigateurs
const TabNavigator = createBottomTabNavigator();

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
      <TabNavigator.Screen name="Accueil" component={HomeStackNavigation} />
      <TabNavigator.Screen
        name="Réservations"
        component={BookingStackNavigation}
      />
      <TabNavigator.Screen name="Profil" component={ProfileStackNavigation} />
      <TabNavigator.Screen name="Plus" component={LinkStackNavigation} />
    </TabNavigator.Navigator>
  );
}
