import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <View>
      <Text>This is a home</Text>
    </View>
  );
}

function BookScreen() {
  return (
    <View>
      <Text>This is Booking Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>This is Profile Screen</Text>
    </View>
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
const Stack = createStackNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Réservations" component={BookScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
        <Tab.Screen name="Plus" component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
