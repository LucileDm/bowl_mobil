import React from 'react'
import GreenTitle from '../components/GreenTitle.js';

import { VStack,
        SectionList, 
        Text,
        View }
  from 'native-base';

import BowlListItem from './BowlListItem.js';

const BowlsList = ({bowls, title, subTitle}) => {

    const EmptyList = () => {
        return <Text paddingX={30}>Tous les bowls se sont enfuient de nos cuisines... Veuillez nous excusez le temps que nous partons à leur recherche.</Text>
    }

    return (
        <View style={{ flex: 1 }}>
            <GreenTitle title={title} subTitle={subTitle}/>
            {
            (bowls?.length <= 0)
                ? <EmptyList />
                : bowls.map((bowl)=>(
                    <BowlListItem key={bowl._id} bowl={bowl} />
                ))            
            }
        </View>
    )
}

export default BowlsList