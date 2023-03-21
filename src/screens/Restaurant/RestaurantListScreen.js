import { React, useEffect, useState } from "react";
import { FlatList, Heading, HStack, VStack } from "native-base";

import { getDistance } from 'geolib';
import * as Location from 'expo-location';

import { getAllRestaurants } from "../../services/restaurants";

import ItemListRestaurant from "../../components/ItemListRestaurant";

const RestaurantListScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }
      let gotLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation(gotLocation);
      console.log(currentLocation);
    })
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
          <Heading>lat: {currentLocation.latitude} lon: {currentLocation.longitude}</Heading>
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
