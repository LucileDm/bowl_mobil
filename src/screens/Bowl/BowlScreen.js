import { useState, useEffect } from 'react';
import { getOneMeal } from '../services/bowls.js';
// import { getIngredients } from '../services/ingredients.js';
import { useFonts, isLoaded } from 'expo-font';

import { NativeBaseProvider, Text, Box } from 'native-base';
import { theme } from '../../utils/theme.js';
import BowlsList from '../../components/BowlsList.js';

function Bowl({ route }) {
  const {bowlId} = route.params;  

  const [bowl, setBowl] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  
  useEffect( ()=>{  
    getOneMeal(bowlId).then((res) => {
      
      setBowl(res.data);

      // get every ingredients of the bowl
      // bowl.forEach((bowl) => {
        // const ingredientsID = bowl.ingredients;
        // getIngredients(ingredientsID).then((res) => {
          
        //   setIngredients(res.data);
        //   bowl.ingredients = ingredients;
          
        // }).catch((err) => {
          
        //   console.log('CATCH : GET ING' + err.toJSON());
        //   bowl.ingredients = [];
        // })
      // })

      // bowl.ingredients = ingredients;
      bowl.ingredients = ['Carotte', 'Riz', 'Tofu', 'Oignon'];
      
    }).catch((err) => {
      console.log('CATCH : GET ONE BOWL', err);
    });
  }, [bowlId] )

  return (
      <Box flex={1} >
        <Text  >Page détail de {bowl.name}</Text>
      </Box>
  );
}

export default Bowl;