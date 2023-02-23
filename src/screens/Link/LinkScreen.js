import { React } from "react";
import { Box, Heading, Image, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

const LinkScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Image
        source={{
          uri: "https://bowllywood.onrender.com/images/menuBgdecoupe.png",
        }}
        size="2xl"
        resizeMode="cover"
        position="absolute"
        alignSelf="flex-end"
        alt="Quartier d'image d'un bowl"
      />

      <Box mt={40}>
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
    </ScrollView>
  );
};

export default LinkScreen;
