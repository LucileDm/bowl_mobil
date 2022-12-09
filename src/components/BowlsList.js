import React from 'react'
import GreenTitle from '../components/GreenTitle.js';

import { VStack,
        FlatList, 
        Text }
  from 'native-base';

import BowlListItem from './BowlListItem.js';

const BowlsList = ({bowls, title, subTitle}) => {

    const EmptyList = () => {
        return <Text>Aucun bowl n'a été trouvé</Text>;
    }
  
    return (
        <VStack space="12">
            <GreenTitle title={title} subTitle={subTitle}/>

            <FlatList 
                data={bowls}
                renderItem={ ({item}) => <BowlListItem bowl={item} /> }
                listEmptyComponent={EmptyList}
            />
        </VStack>
    )
}

export default BowlsList