import { useState, useEffect } from 'react';
import { getSaltedBowls } from '../services/bowls.js';
import { NativeBaseProvider, Text, Box, FlatList, Pressable, Button } from 'native-base';
import { theme } from '../utils/theme.js';

function Home({ navigation }) {

  const [bowls, setBowls] = useState([]);
  
  useEffect(()=>{  
    getSaltedBowls().then((res) => {
      setBowls(res.data);
    }).catch((err) => {
      console.log(err.toJSON());
    });
  },[])

  const renderItem = ({ item }) => (
    <Pressable>
      <Box>{item.name}</Box>
    </Pressable>
  );

  const EmptyList = (
    <Text>Aucun bowl n'a été trouvé</Text>
  )
  
// ItemSeparatorComponent
// onRefresh
// bg="primary.dark_grey"
  return (
    <NativeBaseProvider theme={theme}>

      <Box bg='colors.primary.dark_grey' safeArea >
        <FlatList 
          data={bowls}
          renderItem={renderItem}
          ListEmptyComponent={EmptyList}
          ListHeaderComponent={<Box>Header</Box>}
          />
      </Box>

      <Box flex={1}>
        <Text textAlign="center" >Accueil</Text>

        <Button
          onPress={() => navigation.navigate('Bowl')}>Bowl</Button>

        <Button
          onPress={() => navigation.navigate('Ajouter une réservation')}>Réserver mes places!</Button>

        <Button
          onPress={() => navigation.navigate('Review')}>Avis</Button>
      </Box>
    </NativeBaseProvider>
  );
}

export default Home;