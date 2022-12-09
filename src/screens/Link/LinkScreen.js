import { React } from "react";
import { Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

const LinkScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Box>
        <Heading my={4} onPress={() => navigation.navigate("ReviewStack")}>
          Avis de votre restaurant
        </Heading>
        <Heading my={4}>Déposer un avis</Heading>
        <Heading my={4}>Compte fidélité</Heading>
        <Heading
          my={4}
          onPress={() => navigation.navigate("RestaurantListStack")}
        >
          Sélectionner un restaurant
        </Heading>
      </Box>
    </>
  );
};

export default LinkScreen;
