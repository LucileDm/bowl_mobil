import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Icon,
  Radio,
  Checkbox,
  Box,
  Text,
  IconButton,
  Button,
} from "native-base";
import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const ItemListRestaurant = (props) => {
  const data = props.restos.item;
  const [day, setDay] = useState(false);
  const [openHour, setOpenHour] = useState(null);
  const [closeHour, setCloseHour] = useState(null);
  const [openOrClose, setOpenOrClose] = useState(null);
  const navigation = useNavigation();

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

    const nowHour = dayjs().get("hour");
    const nowMinute = dayjs().get("minute");
    const nowSecond = dayjs().get("second");

    // Heure actuelle (heure + minute)
    const hour = nowHour + "-" + nowMinute;

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
          data.thursdayOpeningTime,
          data.thursdayClosingTime
        );

        setOpenOrClose(thursdayTimeSlot);
        setOpenHour(data.thursdayOpeningTime);
        setCloseHour(data.thursdayClosingTime);
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
    <Box flexDirection="row" justifyContent="space-between">
      <Box w="20%">
        <Checkbox
          borderRadius="xl"
          value={data._id}
          accessibilityLabel="Une checkbox ressemblant à un radio"
        />
      </Box>
      <Box w="30%">
        <Text>Code postal</Text>
        <Text>{data?.city}</Text>
      </Box>
      <Box w="30%">
        <Text>{openOrClose}</Text>
        <Text>Horaire du jour</Text>
        <Text>
          {openHour} - {closeHour}
        </Text>
      </Box>
      <Box w={24} alignItems="center" justifyContent="center">
        <IconButton
          size={24}
          _icon={{
            as: Ionicons,
            name: "arrow-forward",
          }}
          onPress={() => {
            navigation.navigate("RestaurantDetail", {
              restaurant: data,
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default ItemListRestaurant;
