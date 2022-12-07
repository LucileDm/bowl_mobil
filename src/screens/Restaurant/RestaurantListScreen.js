import { React, useEffect, useState } from "react";
import { FlatList, Heading, HStack, VStack } from "native-base";

import { getAllRestaurants } from "./../../services/restaurants";

import ItemListRestaurant from "../../components/ItemListRestaurant";

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
      <Heading>Liste de vos restaurants</Heading>
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
