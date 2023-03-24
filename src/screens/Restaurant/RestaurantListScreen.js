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
  const [sortedRestaurants, setSortedRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Accès à la localisation refusée');
        return;
      }
      Location.watchPositionAsync();
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
    getAllRestaurants()
      .then((res) => {
        setRestaurants(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  useEffect(() => {
    if (currentLocation && restaurants.length > 0) {
      const sorted = [...restaurants].sort((a, b) => {
        const distanceA = getDistance(
          { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
          { latitude: a.latitude, longitude: a.longitude }
        );
        const distanceB = getDistance(
          { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
          { latitude: b.latitude, longitude: b.longitude }
        );
        return distanceA - distanceB;
      });
      setSortedRestaurants(sorted);
    }
  }, [currentLocation, restaurants]);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Accès à la localisation refusée');
  //       return;
  //     }
  //     Location.watchPositionAsync();
  //     let location = await Location.getCurrentPositionAsync({});
  //     setCurrentLocation(location);
  //   })();
  //   getAllRestaurants()
  //     .then((res) => {
  //       setRestaurants(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //     if (currentLocation && restaurants.length > 0) {
  //       const sorted = [...restaurants].sort((a, b) => {
  //         const distanceA = getDistance(
  //           { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
  //           { latitude: a.latitude, longitude: a.longitude }
  //         );
  //         const distanceB = getDistance(
  //           { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
  //           { latitude: b.latitude, longitude: b.longitude }
  //         );
  //         return distanceA - distanceB;
  //       });
  //       setSortedRestaurants(sorted);
  //     }
  // }, [sortedRestaurants, currentLocation]);

  return (
    <>
      <HStack justifyContent="center" my={2}>
        <Heading>Liste de vos restaurants</Heading>
      </HStack>
      <HStack justifyContent="space-evenly">
        <VStack>
          <Heading></Heading>
          <Heading>20</Heading>
          <Heading>restaurants</Heading>
        </VStack>
        <VStack>
          <Heading>15</Heading>
          <Heading>villes</Heading>
        </VStack>
      </HStack>

      <FlatList
        data={sortedRestaurants}
        key={(item, index) => index}
        renderItem={(item) => {
          return <ItemListRestaurant restos={item} />;
        }}
      />
    </>
  );
};

export default RestaurantListScreen;
