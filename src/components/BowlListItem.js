import { useState, useEffect } from 'react';
import { HStack, VStack, Pressable, Text, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const BowlListItem = ({bowl}) => {
    const [imgError, setImgError] = useState(false),
          [defaultImage, setDefaultImage] = useState('https://i.imgur.com/jxxojTq.png');

    const navigation = useNavigation();

    const navToBowl = (currentId) => {
        navigation.navigate('Bowl', {bowl: bowl})
    }

    useEffect(()=>{}, [])

    const DefaultImageComponent = () => {
        return (
          <Image 
            source={{uri : defaultImage }}
            alt='Bowllywood default image'
            referrerPolicy="no-referrer"
            resizeMode="cover"
            size="xl" />)
      }

    return ( 
        <Pressable
            onPress={ () => navToBowl(bowl._id) }
            mb="12"
            pr={2}>

            <HStack>

                {(!imgError)
                ? <Image
                    source={{uri : bowl?.image}}
                    alt={bowl?.name}
                    onError={() => {setImgError(true)}}
                    referrerPolicy="no-referrer"
                    resizeMode="cover"
                    size="xl"/>
                : <DefaultImageComponent />}
                
                <VStack 
                    justifyContent="center"
                    space={2}
                    flex={1}
                    pl="6"
                    pr="2">

                    <HStack justifyContent="space-between" >
                        <Text style={{fontFamily: "mauikea"}} fontSize="xl" >{bowl?.name}</Text>
                        <Text fontSize="xl" bold >{bowl?.price}</Text>
                    </HStack>
                    
                    <Text fontSize="xs">{bowl?.description}...</Text>
                
                </VStack>

            </HStack>

        </Pressable>
    )
}

export default BowlListItem