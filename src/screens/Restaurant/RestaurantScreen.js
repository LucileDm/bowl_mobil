import { useRoute } from "@react-navigation/native";
import { Text, Box, Heading, HStack } from "native-base";
import { useEffect, useState } from "react";

import { getRestaurantDetail } from "./../../services/restaurants";

function RestaurantScreen() {
  const route = useRoute();
  const restaurantID = route.params.restaurantID;

  const [detailRestaurant, setDetailRestaurant] = useState([]);

  useEffect(() => {
    getRestaurantDetail(restaurantID)
      .then((res) => {
        setDetailRestaurant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(detailRestaurant);
  return (
    <Box flex={1}>
      <Heading alignSelf="center" mt={4} size="md">
        Bowllywood {detailRestaurant.city} {detailRestaurant.district}
      </Heading>
      <Box my={4} ml={4}>
        <Text>
          Bowllywood {detailRestaurant.city} {detailRestaurant.district}
        </Text>
        {/* Ne pas oublier de changer la type en address */}
        <Text>{detailRestaurant.adress}</Text>
        <Text>
          {detailRestaurant.zipcode} {detailRestaurant.city}
        </Text>
      </Box>
      <Box my={4} ml={4}>
        <Heading size="sm">{detailRestaurant.phone}</Heading>
        <Text>{detailRestaurant.email} email</Text>
      </Box>
      <Box my={4} ml={4}>
        <Heading size="sm">Horaires</Heading>
        <Text>Actuellement - </Text>
      </Box>
      <Box ml={4}>
        <HStack>
          <Text>Lundi</Text>
          <Text>
            {" "}
            de {detailRestaurant.mondayOpeningTime} à{" "}
            {detailRestaurant.mondayClosingTime}
          </Text>
        </HStack>
        <HStack>
          <Text>Mardi</Text>
          <Text>
            {" "}
            de {detailRestaurant.tuesdayOpeningTime} à{" "}
            {detailRestaurant.tuesdayClosingTime}
          </Text>
        </HStack>
        <HStack>
          <Text>Mercredi</Text>
          <Text>
            {" "}
            de {detailRestaurant.wednesdayOpeningTime} à{" "}
            {detailRestaurant.wednesdayClosingTime}
          </Text>
        </HStack>
        <HStack>
          <Text>Jeudi</Text>
          <Text>
            {" "}
            de {detailRestaurant.thursdayOpeningTime} à{" "}
            {detailRestaurant.thursdayClosingTime}
          </Text>
        </HStack>
        <HStack>
          <Text>Vendredi</Text>
          <Text>
            {" "}
            de {detailRestaurant.fridayOpeningTime} à{" "}
            {detailRestaurant.fridayClosingTime}
          </Text>
        </HStack>
        <HStack>
          <Text>Samedi</Text>
          <Text>
            {" "}
            de {detailRestaurant.saturdayOpeningTime} à{" "}
            {detailRestaurant.saturdayClosingTime}
          </Text>
        </HStack>
        <HStack>
          <Text>Dimanche</Text>
          <Text>
            {" "}
            de {detailRestaurant.sundayOpeningTime} à{" "}
            {detailRestaurant.sundayClosingTime}
          </Text>
        </HStack>
      </Box>
      {/* <Text>restaurantID: {JSON.stringify(restaurantID)}</Text> */}
    </Box>
  );
}

export default RestaurantScreen;
