/*
  exemple des routes sur les pages de tests
  Route API pour get les ingrédients
  Upload d'image
  Page de maintenance
  renommer Bowl (ou pas)
  gestion d'erreur
  dossier de projet
*/

import { useState, useEffect } from 'react';
import { getSaltedBowls } from '../services/bowls.js';
import { useFonts } from 'expo-font';

import { NativeBaseProvider, 
        HStack, 
        VStack, 
        Box, 
        FlatList, 
        Pressable, 
        Text,
        Image }
      from 'native-base';

import { ScrollView, Button } from 'react-native';

import theme from '../utils/theme.js';
import GreenTitle from '../components/GreenTitle.js';

function Home({ navigation }) {
  const [bowls, setBowls] = useState([]);
  const [img, setImg] = useState();
  const [ingredients, setIngredients] = useState();
    
  useEffect( () => {
    getSaltedBowls().then((res) => {
      
      // only 4 bowls
      const gotBowls = res.data.slice(0, 4);
      
      // get every ingredients of the bowl
      gotBowls.forEach((bowl) => {
        bowl.ingredients = ['Carotte', 'Riz', 'Tofu', 'Oignon'];

        /*
        const ingredientsID = bowl.ingredients;
        getIngredients(ingredientsID).then((res) => {
          
          setIngredients(gotBowls);
          bowl.ingredients = ingredients;
          
        }).catch((err) => {
          
          console.log('CATCH : GET ING' + err.toJSON());
          bowl.ingredients = [];
        })
        */

      }) 

      setBowls(gotBowls);

    }).catch((err) => {
      console.log('CATCH : GET SALTED BOWLS ', err)
    });
  }, [])

  // get custom fonts
  const [fonts] = useFonts({
    'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
    'ibm': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
  })

  /** For FlatList
   * Generate the component for the current row of the bowl's lists.
   * @param {object} item Current bowl of the FlatList
   * @returns Component : the current row of the list
   */
  const renderItem = ({ item }) => {
    return ( 
      <Pressable
        onPress={ () => navToBowl(item._id) }
        mb="12">

        <HStack>

          <Image
            source={{ uri: `https://bowllywood.onrender.com/images/menu/${item.image}` }}
            resizeMode="cover"
            size="xl"
            alt={`Image du bowl ${item.name}`}/>

          <VStack 
            justifyContent="center"
            space={2}
            flex={1}
            pl="6"
            pr="2">

            <HStack justifyContent="space-between" >
              <Text style={{fontFamily: "mauikea"}} fontSize="xl" >{item.name}</Text>
              <Text style={{fontFamily: "ibm" }} fontSize="xl" bold >{item.price} €</Text>
            </HStack>
            
            <IngList ingArr={item.ingredients}/>
            <Text fontSize="xs"  >{item.description}...</Text>
         
          </VStack>

        </HStack>

      </Pressable>
    )
  }

  /** For FlatList
   * Return the Text to diplay if the bowl list is empty
   * @returns Component : the text
   */
  const emptyList = () => {
    return <Text>Aucun bowl n'a été trouvé</Text>;
  }

  /** For FlatList
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
        ingText += (index !== ingArr.length) ? `${ing} • ` : ing;
      });
    }
    return <Text>{ingText}</Text>;
  }

  const navToBowl = (currentId) => {
    navigation.navigate('Bowl', {bowlId: currentId})
  }
  
  const subTitleText = ( <Text> Pour un peu de<Text italic> ow ! </Text>dans votre vie </Text>)

  return (
    <NativeBaseProvider theme={theme}>

      <ScrollView>

        <VStack space="12">
          <GreenTitle title="Nos pokés salés" subTitle={subTitleText}/>

          <FlatList 
            data={bowls}
            renderItem={renderItem}
            listEmptyComponent={emptyList}
            // ListHeaderComponent={GreenTitle}
            />
        </VStack>

        <Box>
          <Button
            title="Reservation"
            onPress={() => navigation.navigate('Reservation')}
            />

          <Button
            title="Review"
            onPress={() => navigation.navigate('Review')}
          />
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default Home;