/*
  debug native
  Route API pour get les ingrédients
  Upload d'image
  Page de maintenance
  renommer Bowl (ou pas)
  gestion d'erreur
*/

import { useState, useEffect } from 'react';
import { getSaltedBowls } from '../services/bowls.js';
// import { getIngredients } from '../services/ingredients.js';
import { useFonts, isLoaded } from 'expo-font';

import { NativeBaseProvider, HStack, VStack, Box, FlatList, Pressable, Text } from 'native-base';
import { Button, Image } from 'react-native';
import { theme } from '../utils/theme.js';

function Home({ navigation }) {

  // get custom fonts
  if (!isLoaded('mauikea') || !isLoaded('body'))
  {
    useFonts({
      'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
      'body': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
    })
  }

  const [bowls, setBowls] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(()=>{  
    getSaltedBowls().then((res) => {
      setBowls(res.data);
      
      // get every ingredients of the bowl
      // bowls.forEach((bowl) => {
        // const ingredientsID = bowl.ingredients;
        // getIngredients(ingredientsID).then((res) => {
          
        //   setIngredients(res.data);
        //   bowl.ingredients = ingredients;
          
        // }).catch((err) => {
          
        //   console.log('CATCH : GET ING' + err.toJSON());
        //   bowl.ingredients = [];
        // })
      // })

    }).catch((err) => {
      console.log('CATCH : GET SALTED BOWLS');
      console.log(err.toJSON());
    });
  })

  /**
   * Return the ingredients of the current bowl as a formatted text. 
   * @param   {array}  ingArr Array of the bowl's ingredients
   * @returns {string} ingText If the Ingredient array is empty, return error msg.
   * Else return all ing. in a formatted text.
   */
  const IngList = ({ingArr}) => {
    var ingText = '';
    if (ingArr.length > 0)
    {
      ingArr.forEach((ing, index) => {
        ingText += (index !== ingArr.length) ? `${ing} •` : ing;
      });
    }
    return <Text>{ingText}</Text>;
  }
  
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={navToBowl(item._id)}
        mb="3">

        <HStack>
          
          <Image source={item.image}/>
          <VStack>
            <HStack>
              <Text fontFamily="mauikea" fontSize="md" >{item.name}</Text>
              <Text fontFamily="body" fontSize="md" >{item.price}</Text>
            </HStack>
            
            {/* <IngList ingArr={item.ingredients}/> */}
            <Text fontSize="sm"maxW="100" >{item.description}</Text>
          </VStack>

        </HStack>  
      </Pressable>
    )
  }

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
          onPress={navToBowl}
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