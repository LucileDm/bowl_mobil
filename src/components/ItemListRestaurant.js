import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Icon, Radio, Checkbox, Box, Text, IconButton } from "native-base";
import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const ItemListRestaurant = (props, { navigation }) => {
  const data = props.restos.item;
  const [day, setDay] = useState(false);
  const [openHour, setOpenHour] = useState(null);
  const [closeHour, setCloseHour] = useState(null);
  const [openOrClose, setOpenOrClose] = useState(null);

  //------

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
      console.log("ouvert");
    } else {
      restaurantState = "Fermé";
      console.log("fermé");
    }

    return restaurantState;
  };

  // -----

  useEffect(() => {
    const today = dayjs().get("day");

    const nowHour = dayjs().get("hour");
    const nowMinute = dayjs().get("minute");
    const nowSecond = dayjs().get("second");

    // Heure actuelle (heure + minute)
    const hour = nowHour + "-" + nowMinute;

    switch (today) {
      case 1:
        isRestaurantOpen(data.mondayOpeningTime, data.mondayClosingTime);

        setOpenOrClose("restaurantState");
        setOpenHour(data.mondayOpeningTime);
        setCloseHour(data.mondayClosingTime);
        break;
      case 2:
        isRestaurantOpen(data.tuesdayOpeningTime, data.tuesdayClosingTime);

        setOpenOrClose("restaurantState");
        setOpenHour(data.tuesdayOpeningTime);
        setCloseHour(data.tuesdayClosingTime);
        break;
      case 3:
        // // Heure d'ouverture
        // const tempoWednesdayOpenTime = data.wednesdayOpeningTime.replace(
        //   "h",
        //   ":00"
        // );

        // const splitWednesdayOpenTime = tempoWednesdayOpenTime.split("");
        // let wednesdayOpeningTime = "";

        // if (splitWednesdayOpenTime[splitWednesdayOpenTime.length - 1] === ":") {
        //   wednesdayOpeningTime =
        //     dayjs().format("YYYY-MM-DD") +
        //     "T" +
        //     tempoWednesdayOpenTime +
        //     "00:00";
        // } else {
        //   wednesdayOpeningTime =
        //     dayjs().format("YYYY-MM-DD") + "T" + tempoWednesdayOpenTime + ":00";
        // }
        // // Heure de fermeture
        // const tempoWednesdayCloseTime = data.wednesdayClosingTime.replace(
        //   "h",
        //   ":00"
        // );

        // const splitWednesdayCloseTime = tempoWednesdayCloseTime.split("");
        // let wednesdayClosingTime = "";

        // if (
        //   splitWednesdayCloseTime[splitWednesdayCloseTime.length - 1] === ":"
        // ) {
        //   wednesdayClosingTime =
        //     dayjs().format("YYYY-MM-DD") +
        //     "T" +
        //     tempoWednesdayCloseTime +
        //     "00:00";
        // } else {
        //   wednesdayClosingTime =
        //     dayjs().format("YYYY-MM-DD") +
        //     "T" +
        //     tempoWednesdayCloseTime +
        //     ":00";
        // }

        // const todayDateTimeStamp = dayjs().format("YYYY-MM-DDTHH:mm:ss");

        // let state = "";

        // if (
        //   dayjs(todayDateTimeStamp).isBetween(
        //     wednesdayOpeningTime,
        //     wednesdayClosingTime
        //   )
        // ) {
        //   state = "ouvert";
        //   console.log("ouvert");
        // } else {
        //   state = "fermé";
        //   console.log("fermé");
        // }
        // console.log(
        //   "Le timestamp d'aujourdhui à l'heure actuelle est :",
        //   todayDateTimeStamp
        // );

        isRestaurantOpen(data.wednesdayOpeningTime, data.wednesdayClosingTime);

        setOpenOrClose("restaurantState");
        setOpenHour(data.wednesdayOpeningTime);
        setCloseHour(data.wednesdayClosingTime);
        break;
      case 4:
        isRestaurantOpen(data.thursdayOpeningTime, data.thursdayClosingTime);

        setOpenOrClose("restaurantState");
        setOpenHour(data.thursdayOpeningTime);
        setCloseHour(data.thursdayClosingTime);
        break;
      case 5:
        isRestaurantOpen(data.fridayOpeningTime, data.fridayClosingTime);

        setOpenOrClose("restaurantState");
        setOpenHour(data.fridayOpeningTime);
        setCloseHour(data.fridayClosingTime);
        break;
      case 6:
        isRestaurantOpen(data.saturdayOpeningTime, data.saturdayClosingTime);

        setOpenOrClose("restaurantState");
        setOpenHour(data.saturdayOpeningTime);
        setCloseHour(data.saturdayClosingTime);
        break;
      case 7:
        isRestaurantOpen(data.sundayOpeningTime, data.sundayClosingTime);

        setOpenOrClose("restaurantState");
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
          onPress={() => navigation.navigate("RestaurantDetail")}
        />
      </Box>
    </Box>
  );
};

export default ItemListRestaurant;
