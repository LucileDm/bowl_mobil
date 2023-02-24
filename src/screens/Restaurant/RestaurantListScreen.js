import { React, useEffect, useState } from "react";
import {
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  Icon,
  Input,
  VStack,
} from "native-base";

import { getAllRestaurants } from "./../../services/restaurants";

import ItemListRestaurant from "../../components/ItemListRestaurant";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const RestaurantListScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants()
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <HStack justifyContent="center" my={2}>
        <Heading>Liste de vos restaurants</Heading>
      </HStack>
      <HStack justifyContent="space-evenly">
        <VStack>
          <Heading>20</Heading>
          <Heading>restaurants</Heading>
        </VStack>
        <VStack>
          <Heading>15</Heading>
          <Heading>villes</Heading>
        </VStack>
      </HStack>
      <FlatList
        data={restaurants}
        key={(item, index) => index}
        renderItem={(item) => {
          return <ItemListRestaurant restos={item} />;
        }}
      />
    </>
  );
};

export default RestaurantListScreen;
