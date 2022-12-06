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

import { Text } from 'native-base';
import { ScrollView } from 'react-native';

import BowlsList from '../components/BowlsList.js';

function Home({ navigation }) {
  const [saltedBowls, setSaltedBowls] = useState([]);
  const [sweetBowls, setSweetBowls] = useState([]);
  const [ingredients, setIngredients] = useState();
    
  useEffect( () => {
    
    // get salted bowls
    getSaltedBowls().then((res) => {
      
      // only 4 bowls
      const gotBowls = res.data.slice(0, 4);
      
      // get ingredients of the bowl
      gotBowls.forEach((bowl) => {
        bowl.ingredients = ['Carotte', 'Riz', 'Tofu', 'Oignon'];
        // getIngredients(bowl)
      }) 

      setSaltedBowls(gotBowls);

    }).catch((err) => {
      console.log('CATCH : GET SALTED BOWLS ', err)
    });

    // get sweet bowls
    getSweetBowls().then((res) => {
      
      // only 4 bowls
      const gotBowls = res.data.slice(0, 4);
      
      // get ingredients of the bowls
      gotBowls.forEach((bowl) => {
        bowl.ingredients = ["Liste", "de tous", "les ingrédients", "ici", "mauris", "blandit", "aliquet"]; 
        // getIngredients(bowl)
      }) 

      setSweetBowls(gotBowls);
    }).catch((err) => {
      console.log('CATCH : GET SWEET BOWLS ', err)
    });

  }, [])

  const getIngredients = (bowl) => {
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
  }

  // get custom fonts
  const [fonts] = useFonts({
    'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
    'ibm': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
  })

  const subTitleSalted = ( <Text> Pour un peu de<Text italic> ow ! </Text>dans votre vie </Text>)

  return (
    <ScrollView>

      {/* Selection restaurant 

        Connexion BDD Restaurants
      
        HStack . alignCenter relatif
          box green absolute
          Icon
          VStack
            Text titre
            Text sous titre

        HStack ctrn space evenly
          Text adresse
          VStack horaire
            Text horaire
            Text heure

        BoxFlex align self right 
          Text lien
      */}

      {/* envie de réserver 
      
        VStack alignItem end
          Text envie de déguster
          Text réserver
          Btn align self right
      
      */}

      {/* avis
      
        Connexion BDD Review
      
        Box border top & bottom
          Text titre
          Slide réact
            Component Stars
            Text nom
            Text description
      */}

      <BowlsList bowls={saltedBowls} title="Nos pokés salés" subTitle={subTitleSalted}/>
      <BowlsList bowls={sweetBowls} title="Nos pokés dessert" subTitle="Phrase d’accroche pour dessert"/>
      
      {/* menu du jour 
      
        HStack justifuContent Center, space 5
          Image
          VStack
            Text titre
            Text description Text prix

        X2 VStack alignItem center, justifyContent Center
          Text titre 
          Text ingredients 
      
      */}

    </ScrollView>
  );
}

// onPress={() => navigation.navigate('Reservation')}
// onPress={() => navigation.navigate('Review')}

export default Home;