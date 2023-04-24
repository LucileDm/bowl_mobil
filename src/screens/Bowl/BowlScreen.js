import { useState, useEffect } from 'react';
import { getOneStock } from '../../services/stocks.js';
import { ScrollView, HStack, VStack, Pressable, Text, Image, Spinner } from 'native-base';
import { theme } from '../../utils/theme.js';
import { errorHandler } from '../../utils/errorHandler';

function Bowl({ route }) {
  const {bowl} = route.params;

  const [imgError, setImgError] = useState(false),
        [isLoaded, setIsLoaded] = useState(false),
        [defaultImage, setDefaultImage] = useState('https://i.imgur.com/jxxojTq.png'),
        [allergenes, setAllergenes] = useState([]);

  useEffect(()=>{
    let cleaning = false;

      let fetchIngredients = async () => {
        if (cleaning) return;
        let ingredientsName = [];
        for (const ingredientID of bowl.ingredients) {
           try
           {
              const currIngredient = await getOneStock(ingredientID);
              ingredientsName.push(currIngredient?.data?.name ??  '')
           }
           catch(err)
           {
              console.log(err)
              // nothing to inform
           }
        }
        bowl.ingredientsName = ingredientsName;
        setIsLoaded(true)
      }

      fetchIngredients();
    return ()=>{
      cleaning = true
    }
  }, [])

  const DefaultImageComponent = () => {
    return (
      <Image 
        source={{uri : defaultImage }}
        alt='Bowllywood default image'
        referrerPolicy="no-referrer"
        style={{ width: '100%', height: 350 }}
        resizeMode="cover"
        size="xl" />)
  }

  return (
  <ScrollView>
    <VStack space={5} pb={9}>
      {(!imgError)
       ? <Image
          source={{uri : bowl?.image}}
          alt={bowl?.name}
          onError={(event) => {
             let err = {
                code: '',
                message: "L'image du bowl n'a pas pu être récupérée."
             }
             errorHandler('TOAST', err)
             setImgError(true)
          }}
          referrerPolicy="no-referrer"
          style={{ width: '100%', height: 350 }}
          resizeMode="cover"
          />
       : <DefaultImageComponent /> }
     
      <VStack space={5}>

        <HStack justifyContent="space-evenly" alignItems="flex-end">
          <Text fontSize="4xl" fontFamily="mauikea" fontWeight="bold">{bowl?.name}</Text>

          <VStack alignItems="center">
            <Text fontSize="2xl">{bowl?.ingredients.length ?? '0'}</Text>
            <Text fontSize="md">ingredients</Text>
          </VStack>
        </HStack>

        <Text px={5}>{bowl?.description}</Text>

        <VStack px={8}>
          <Text fontSize="2xl" fontWeight="bold">Ingredients</Text>
          {
            (isLoaded)
            ? (bowl?.ingredientsName?.length > 0 )
              ? bowl?.ingredientsName.map((ingredient, index) => <Text key={'ing_'+index} fontSize="md" mb={1}>{ingredient}</Text>)
              : <Text>Tous les ingrédients se sont enfuits de la recette... Notre équipe est partie à leur recherche. Excusez-nous pour la gène occcasionée.</Text>
            : <Spinner />
          }
        </VStack>

        <VStack px={8}>
          <Text fontSize="2xl" fontWeight="bold">Allergènes</Text>
          {(allergenes?.length > 0 )
            ? allergenes.map((allergene, index) => <Text key={'ing_'+index} fontSize="md" mb={1}>{allergene}</Text>)
            : <Text>Aucun allergène renseignée pour cette recette ! Vous pourrez profiter tranquillement.</Text>}
        </VStack>
      </VStack>
      
    </VStack>

  </ScrollView>
  )
}

export default Bowl;