import { useRoute } from "@react-navigation/native";
import { Text, Box, Heading, HStack } from "native-base";
import { useEffect, useState } from "react";

import { getRestaurantDetail } from "./../../services/restaurants";

import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

function RestaurantScreen() {
  const route = useRoute();

  const data = route.params.restaurant;

  const [detailRestaurant, setDetailRestaurant] = useState([]);

  const [openHour, setOpenHour] = useState(null);
  const [closeHour, setCloseHour] = useState(null);

  const [openOrClose, setOpenOrClose] = useState(null);

  const isRestaurantOpen = (todayOpeningTime, todayClosingTime) => {
    // Heure d'ouverture
    const tempoOpenTime = todayOpeningTime.replace("h", ":00");
    const splitTodayOpenTime = tempoOpenTime.split("");
    let todayOpeningDateTime = "";

    if (splitTodayOpenTime[splitTodayOpenTime.length - 1] === ":") {
      todayOpeningDateTime =
        dayjs().format("YYYY-MM-DD") + "T" + tempoOpenTime + "00:00";
    } else {
      todayOpeningDateTime =
        dayjs().format("YYYY-MM-DD") + "T" + tempoOpenTime + ":00";
    }
    // Heure de fermeture
    const tempoCloseTime = todayClosingTime.replace("h", ":00");

    const splitTodayCloseTime = tempoCloseTime.split("");
    let todayClosingDateTime = "";

    if (splitTodayCloseTime[splitTodayCloseTime.length - 1] === ":") {
      todayClosingDateTime =
        dayjs().format("YYYY-MM-DD") + "T" + tempoCloseTime + "00:00";
    } else {
      todayClosingDateTime =
        dayjs().format("YYYY-MM-DD") + "T" + tempoCloseTime + ":00";
    }

    // Vérification des horaires
    const todayDateTimeStamp = dayjs().format("YYYY-MM-DDTHH:mm:ss");

    let restaurantState = "";

    if (
      dayjs(todayDateTimeStamp).isBetween(
        todayOpeningDateTime,
        todayClosingDateTime
      )
    ) {
      restaurantState = "Ouvert";
    } else {
      restaurantState = "Fermé";
    }

    return restaurantState;
  };

  useEffect(() => {
    const today = dayjs().get("day");

    getRestaurantDetail(data._id)
      .then((res) => {
        setDetailRestaurant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    switch (today) {
      case 1:
        const mondayTimeSlot = isRestaurantOpen(
          data.mondayOpeningTime,
          data.mondayClosingTime
        );

        setOpenOrClose(mondayTimeSlot);
        setOpenHour(data.mondayOpeningTime);
        setCloseHour(data.mondayClosingTime);
        break;
      case 2:
        const tuesdayTimeSlot = isRestaurantOpen(
          data.tuesdayOpeningTime,
          data.tuesdayClosingTime
        );

        setOpenOrClose(tuesdayTimeSlot);
        setOpenHour(data.tuesdayOpeningTime);
        setCloseHour(data.tuesdayClosingTime);
        break;
      case 3:
        const wednesdayTimeSlot = isRestaurantOpen(
          data.wednesdayOpeningTime,
          data.wednesdayClosingTime
        );

        setOpenOrClose(wednesdayTimeSlot);
        setOpenHour(data.wednesdayOpeningTime);
        setCloseHour(data.wednesdayClosingTime);
        break;
      case 4:
        const thursdayTimeSlot = isRestaurantOpen(
          detailRestaurant.thursdayOpeningTime,
          detailRestaurant.thursdayClosingTime
        );

        setOpenOrClose(thursdayTimeSlot);
        setOpenHour(detailRestaurant.thursdayOpeningTime);
        setCloseHour(detailRestaurant.thursdayClosingTime);
        break;
      case 5:
        const fridayTimeSlot = isRestaurantOpen(
          data.fridayOpeningTime,
          data.fridayClosingTime
        );

        setOpenOrClose(fridayTimeSlot);
        setOpenHour(data.fridayOpeningTime);
        setCloseHour(data.fridayClosingTime);
        break;
      case 6:
        const saturdayTimeSlot = isRestaurantOpen(
          data.saturdayOpeningTime,
          data.saturdayClosingTime
        );

        setOpenOrClose(saturdayTimeSlot);
        setOpenHour(data.saturdayOpeningTime);
        setCloseHour(data.saturdayClosingTime);
        break;
      case 7:
        const sundayTimeSlot = isRestaurantOpen(
          data.sundayOpeningTime,
          data.sundayClosingTime
        );

        setOpenOrClose(sundayTimeSlot);
        setOpenHour(data.sundayOpeningTime);
        setCloseHour(data.sundayClosingTime);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Box flex={1}>
      <Heading alignSelf="center" mt={4} size="md">
        Bowllywood {detailRestaurant.city} {detailRestaurant.district}
      </Heading>
      <Box my={4} ml={4}>
        <Text>
          Bowllywood {detailRestaurant.city} {detailRestaurant.district}
        </Text>
        <Text>{detailRestaurant.address}</Text>
        <Text>
          {detailRestaurant.zipcode} {detailRestaurant.city}
        </Text>
      </Box>
      <Box my={4} ml={4}>
        <Heading size="sm">{detailRestaurant.phone}</Heading>
        <Text>{detailRestaurant.email}</Text>
      </Box>
      <Box my={4} ml={4}>
        <Heading size="sm">Horaires</Heading>
        <Text>
          Actuellement -{" "}
          {openOrClose == "Ouvert" ? (
            <Text color="emerald.400">{openOrClose}</Text>
          ) : (
            <Text color="red.400">Fermé</Text>
          )}
        </Text>
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
    </Box>
  );
}

export default RestaurantScreen;
