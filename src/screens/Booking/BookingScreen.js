import { Button, Text, Box } from 'native-base'

function BookingScreen({ navigation }) {
  return (
    <Box flex={1}>
      <Text textAlign="center">Réservations</Text>
      <Button onPress={() => navigation.navigate("Ajouter une réservation")}>Ajouter une réservation</Button>
      <Button onPress={() => navigation.navigate("Liste des réservations")}>Liste des réservations</Button>
    </Box>
  );
}

export default BookingScreen;
