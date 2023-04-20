import {HStack, VStack, Pressable, Text, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const BowlListItem = ({bowl}) => {

    const navigation = useNavigation();

    const navToBowl = (currentId) => {
        navigation.navigate('Bowl', {bowl: bowl})
    }

    return ( 
        <Pressable
            onPress={ () => navToBowl(bowl._id) }
            mb="12">

            <HStack>

                <Image
                source={
                    (bowl?.image) 
                    ? { uri: `https://bowllywood-8llo.onrender.com/images/menu/${bowl?.image}` }
                    : './assets/bowlicon_grey.png'
                }
                resizeMode="cover"
                size="xl"
                alt={bowl?.name}/>

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