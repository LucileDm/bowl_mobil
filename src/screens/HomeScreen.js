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
import { getSaltedBowls, getSweetBowls } from '../services/bowls.js';
import { useFonts } from 'expo-font';

import { ScrollView, Text, VStack } from 'native-base';

import BowlsList from '../components/BowlsList.js';
import ReservBanner from '../components/ReservBanner.js';
import ReviewSlide from '../components/ReviewSlide.js';
import DailyMenu from '../components/DailyMenu.js';
import SelectedRestau from '../components/SelectedRestau.js';

function Home({ navigation }) {
  const [saltedBowls, setSaltedBowls] = useState([]);
  const [sweetBowls, setSweetBowls] = useState([]);
  const [ingredients, setIngredients] = useState();
    
  useEffect( () => {
    
    // get salted bowls
    getSaltedBowls().then((res) => {
      
      // only 4 bowls
      const gottenBowls = res.data.slice(0, 4);
      
      // get ingredients of the bowl
      gottenBowls.forEach((bowl) => {
        bowl.ingredients = ['Carotte', 'Riz', 'Tofu', 'Oignon'];
        // getIngredients(bowl)
      }) 

      setSaltedBowls(gottenBowls);

    }).catch((err) => {
      console.log('CATCH : GET SALTED BOWLS ', err)
    });

    // get sweet bowls
    getSweetBowls().then((res) => {
      
      // only 4 bowls
      const gottenBowls = res.data.slice(0, 4);
      
      // get ingredients of the bowls
      gottenBowls.forEach((bowl) => {
        bowl.ingredients = ["Liste", "de tous", "les ingrédients", "ici", "mauris", "blandit", "aliquet"]; 
        // getIngredients(bowl)
      }) 

      setSweetBowls(gottenBowls);
    }).catch((err) => {
      console.log('CATCH : GET SWEET BOWLS ', err)
    });

  }, [])

  const getIngredients = (bowl) => {
    /*
      const ingredientsID = bowl.ingredients;
      getIngredients(ingredientsID).then((res) => {
        
        setIngredients(gottenBowls);
        bowl.ingredients = ingredients;
        
      }).catch((err) => {
        
        console.log('CATCH : GET ING' + err.toJSON());
        bowl.ingredients = [];
      })
    */
  }

  // get custom fonts
  const [fonts] = useFonts({
    'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
    'ibm': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
  })

  const subTitleSalted = ( <Text> Pour un peu de<Text italic> ow ! </Text>dans votre vie </Text>)

  return (
    <ScrollView>
      <VStack
        space={16}
        backgroundColor="#fff"
        pt={16}
        pb={24}
        >

        <SelectedRestau />
        <ReservBanner />
        <ReviewSlide />

        {/* lien vers Toute la liste depuis titre ou btn */}
        {/* voir pk rien quand pas de data */}
        {/* chargement apparent */}
        <BowlsList bowls={saltedBowls} title="Nos pokés salés" subTitle={subTitleSalted}/>
        <BowlsList bowls={sweetBowls} title="Nos pokés dessert" subTitle="Phrase d’accroche pour dessert"/>

        {/* infos menu du jour en dur */}
        <DailyMenu />
      
      </VStack>
    </ScrollView>
  );
}

export default Home;