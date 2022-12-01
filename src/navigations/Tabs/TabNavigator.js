import * as React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from "@expo/vector-icons";

import HomeStackNavigation from "../Stacks/HomeStackNavigation";
import BookingStackNavigation from "../Stacks/BookingStackNavigation";
import ProfileStackNavigation from "../Stacks/ProfileStackNavigation";

function HomeStack() {
  return (
    <HomeStackNavigation />
  );
}

function BookingStack() {
  return (
    <BookingStackNavigation />
  );
}

function ProfileStack() {
  return (
    <ProfileStackNavigation />
  );
}

function MoreScreen() {
  return (
    <View>
      <Text>This is a More Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Accueil") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Réservations") {
              iconName = focused ? "money" : "money";
            } else if (route.name === "Profil") {
              iconName = focused ? "user" : "user";
            } else if (route.name === "Plus") {
              iconName = focused ? "plus" : "plus";
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Réservations" component={BookingStack} />
        <Tab.Screen name="Profil" component={ProfileStack} />
        <Tab.Screen name="Plus" component={MoreScreen} />
      </Tab.Navigator>
  );
}
