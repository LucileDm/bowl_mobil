import React from 'react'
import GreenTitle from '../components/GreenTitle.js';
import { useFonts } from 'expo-font';

import { VStack,
        FlatList, 
        Text }
  from 'native-base';

import BowlListItem from './BowlListItem.js';

const BowlsList = ({bowls, title, subTitle}) => {

    // get custom fonts
    const [fonts] = useFonts({
        'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
        'ibm': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
    })

    // 
    const emptyList = () => {
        return <Text>Aucun bowl n'a été trouvé</Text>;
    }
  
    return (
        <VStack space="12">
            <GreenTitle title={title} subTitle={subTitle}/>

            <FlatList 
                nestedScrollEnabled={false}
                data={bowls}
                renderItem={ ({item}) => <BowlListItem bowl={item} /> }
                listEmptyComponent={emptyList}
                // ListHeaderComponent={GreenTitle}
            />
        </VStack>
    )
}

export default BowlsList