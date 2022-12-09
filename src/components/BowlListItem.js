import React from 'react'
import { useFonts } from 'expo-font';

import {
    HStack, 
    VStack,
    Pressable, 
    Text,
    Image }
  from 'native-base';
import { useNavigation } from '@react-navigation/native';

const BowlListItem = ({bowl}) => {

    const navigation = useNavigation();
    
    // get custom fonts
    const [fonts] = useFonts({
        'mauikea': require('../../assets/fonts/mauikea/mauikea.otf'),
        'ibm': require('../../assets/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf')
    })

    /**
     * Return the ingredients of the current bowl as a formatted text. 
     * @param   {array}  ingArr Array of the bowl's ingredients
     * @returns {string} ingText If the Ingredient array is empty, return error msg.
     * Else return all ing. in a formatted text.
     */
    const IngList = ({ingArr}) => {
        var ingText = '';
        if (ingArr.length > 0)
        {
            ingArr.forEach((ing, index) => {
            ingText += (index !== ingArr.length) ? `${ing} • ` : ing;
            });
        }
        return <Text>{ingText}</Text>;
    }

    const navToBowl = (currentId) => {
        navigation.navigate('Bowl', {bowlId: currentId})
    }

    // style={{fontFamily: "ibm" }}
    return ( 
        <Pressable
            onPress={ () => navToBowl(bowl._id) }
            mb="12">

            <HStack>

                <Image
                source={{ uri: `https://bowllywood.onrender.com/images/menu/${bowl.image}` }}
                resizeMode="cover"
                size="xl"
                alt={`Image du bowl ${bowl.name}`}/>

                <VStack 
                justifyContent="center"
                space={2}
                flex={1}
                pl="6"
                pr="2">

                <HStack justifyContent="space-between" >
                    <Text style={{fontFamily: "mauikea"}} fontSize="xl" >{bowl.name}</Text>
                    <Text fontSize="xl" bold >{bowl.price} €</Text>
                </HStack>
                
                <IngList ingArr={bowl.ingredients} />
                <Text fontSize="xs"  >{bowl.description}...</Text>
                
                </VStack>

            </HStack>

        </Pressable>
    )
}

export default BowlListItem