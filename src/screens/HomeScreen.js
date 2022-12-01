import { useState, useEffect } from 'react';
import { getSaltedBowls } from '../services/bowls.js';

import { NativeBaseProvider, Text, Box, FlatList, Pressable } from 'native-base';
import { Button } from 'react-native';
import { theme } from '../utils/theme.js';

function Home({ navigation }) {

  const [bowls, setBowls] = useState([]);
  
  useEffect(()=>{  
    getSaltedBowls().then((res) => {
      setBowls(res.data);
    }).catch((err) => {
      console.log(err);
    });
  })

  const renderItem = ({ bowl }) => (
    <Pressable>
      <Box>{bowl.name}</Box>
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
          title="Bowl"
          onPress={() => navigation.navigate('Bowl')}
          />

        <Button
          title="Reservation"
          onPress={() => navigation.navigate('Reservation')}
          />

        <Button
          title="Review"
          onPress={() => navigation.navigate('Review')}
        />
      </Box>
    </NativeBaseProvider>
  );
}

export default Home;