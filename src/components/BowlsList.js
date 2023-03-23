import React from 'react'
import GreenTitle from '../components/GreenTitle.js';

import { VStack,
        FlatList, 
        Text }
  from 'native-base';

import BowlListItem from './BowlListItem.js';

const BowlsList = ({bowls, title, subTitle}) => {

    const EmptyList = () => {
        return <Text paddingX={30}>Tous les bowls se sont enfuient de nos cuisines... Veuillez nous excusez le temps que nous partons à leur recherche.</Text>
    }

    const RenderList = ({list}) => {
        if (list.length <= 0)
        {
            return <EmptyList />
        }
        else 
        {
            return (
            <FlatList 
                data={list}
                renderItem={ ({item}) => <BowlListItem bowl={item} /> }
                listEmptyComponent={EmptyList}
            />)
        }
    }
  
    return (
        <VStack space={8}>
            <GreenTitle title={title} subTitle={subTitle}/>
            <RenderList list={bowls}/>
        </VStack>
    )
}

export default BowlsList