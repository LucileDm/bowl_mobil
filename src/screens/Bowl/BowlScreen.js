import { useState, useEffect } from 'react';
import { getOneMeal } from '../../services/bowls.js';
import { getOneIngredient } from '../../services/ingredients.js';
import { useFonts, isLoaded } from 'expo-font';

import { NativeBaseProvider, Text, Box } from 'native-base';
import { theme } from '../../utils/theme.js';
import BowlsList from '../../components/BowlsList.js';

function Bowl({ route }) {
  const {bowlId} = route.params;  

  const [bowl, setBowl] = useState([]),
        ingredients = [],
        ingredientsID = '';

  useEffect( ()=>{  
    getOneMeal(bowlId).then((res) => {
      
      // get every ingredients of the bowl
      res.data.forEach((bowl) => {

        ingredientsID = bowl.ingredients;
        getOneIngredient(ingredientsID).then((res) => {
          ingredients.push(res.data);
        }).catch((err) => {
          console.log('CATCH : GET ING' + err);
        })
      })

      res.data.ingredients = ingredients;  
      // bowl.ingredients = ['Carotte', 'Riz', 'Tofu', 'Oignon'];

      setBowl(res.data);
      
    }).catch((err) => {
      console.log('CATCH : GET ONE BOWL', err);
    });
  }, [bowlId, ingredients, ingredientsID] )

  return (
      <Box flex={1} >
        <Text>Page détail de {bowl.name}</Text>
      </Box>
  );
}

export default Bowl;