import { useState, useEffect } from 'react';
import { getSaltedBowls, getSweetBowls } from '../../services/bowls.js';
import { getOneStock } from '../../services/stocks.js';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, VStack, View, Spinner } from 'native-base';
import { errorHandler } from '../../utils/errorHandler.js';

import BowlsList from '../../components/BowlsList.js';
import ReservBanner from '../../components/ReservBanner.js';
import ReviewSlide from '../../components/ReviewSlide.js';
import DailyMenu from '../../components/DailyMenu.js';
import SelectedRestau from '../../components/SelectedRestau.js';

function Home() {
  
  const [cleaning, setCleaning] = useState(false),
        [saltedBowls, setSaltedBowls] = useState([]),
        [sweetBowls, setSweetBowls] = useState([]),
        [saltedLoaded, setSaltedLoaded] = useState(false),
        [sweetLoaded, setSweetLoaded] = useState(false);

	const navigate = useNavigation();

  useEffect( () => {
    setCleaning(false)

    // get salted bowls
    getSaltedBowls().then((res) => {
      if (cleaning) return;
      setSaltedBowls(res.data)
      setSaltedLoaded(true)
    }).catch((err) => {
      setSaltedLoaded(true)
    })

    // get sweet bowls
    getSweetBowls().then((res) => {
      if (cleaning) return;
      setSweetBowls(res.data)
      setSweetLoaded(true)
    }).catch((err) => {
      setSweetLoaded(true)
    })

    return ()=>{
      setCleaning(true)
    }
  }, [])

  const subTitleSalted = ( <Text> Pour un peu de<Text italic> ow ! </Text>dans votre vie </Text>)

  return (
  <View style={{ flex: 1 }}>
    <ScrollView>
      <VStack
        space={16}
        backgroundColor="#fff"
        pt={16}
        pb={24}
        maxH="100%">

        <SelectedRestau />
        <ReservBanner />
        <ReviewSlide />

        {/* lien vers Toute la liste depuis titre ou btn */}
        {
          (saltedLoaded)
          ? <BowlsList bowls={saltedBowls} title="Nos pokés salés" subTitle={subTitleSalted}/>
          : <Spinner />
        }
        {
          (sweetLoaded)
          ? <BowlsList bowls={sweetBowls} title="Nos pokés dessert" subTitle="Phrase d’accroche pour dessert"/>
          : <Spinner />
        }

        {/* infos menu du jour en dur */}
        <DailyMenu />
      
      </VStack>
    </ScrollView>
  </View>
  )
}

export default Home;