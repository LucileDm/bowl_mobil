/*
    get user details (pour prendre l'id du restau chois)
    get one restaurant
    remplasser traitement des horaires avec fn dédiée
*/

import { useNavigation } from "@react-navigation/native"
import { Box, HStack, useTheme, Link, Text, VStack } from "native-base"
import { useEffect, useState } from "react"
import GreenTitle from "./GreenTitle"
// import { getAllRestaurants } from "../services/"
// import { getUserDetails } from "../services/users.js"

const SelectedRestau = () => {
    
    const [restaurant, setRestaurant] = useState(null)
    // const [userDetails, setUserDetails] = useState([])
    
    useEffect(() => {
        setRestaurant(gottenRestau);
    }, [gottenRestau])

    // en attendant de récupérer infos
    const gottenRestau = {
        name: "Amiens Centre",
        adress: "44 rue des trois Cailloux",
        postalCode: "80000",
        city: "Amiens",
        openingTime: '14h',
        closingTime: '16h'
    }

    const { colors } = useTheme();
    const navigation = useNavigation();
    const subTitle = ( <Link onPress={()=>{navigation.navigate('RestaurantList')}} >Choisir un autre lieu</Link>)
    
    if (restaurant) {

        const currHour = new Date().getHours();
        const isClosed = (currHour < restaurant.openingTime || currHour >= restaurant.closingTime) ? true : false;
        const currSchedule = (!isClosed) ? `${restaurant.openingTime} – ${restaurant.closingTime}` : null ;

        return (
        <VStack space={6} >

            <GreenTitle 
                title="Restaurant sélectionné"
                subTitle={subTitle}
                titleSize="lg"
                />

            <HStack
                justifyContent="space-evenly"
                px={3}
            >
                <VStack>
                    <Text fontSize="md">{restaurant.name}</Text>
                    <Text fontSize="md">{restaurant.adress}</Text>
                    <Text fontSize="md">{restaurant.postalCode} {restaurant.city}</Text>
                </VStack>

                <VStack>
                    {/* <Text>Horaire du jour</Text> */}
                    <Text fontSize="md" color={(isClosed) ? '#ff0000' : '#91D5A3' } >{(!isClosed) ? 'Ouvert' : 'Fermé'}</Text>
                    <Text fontSize="xl">{currSchedule}</Text>
                </VStack>

            </HStack>

            <Box alignSelf="flex-end" px={4} py={2} bgColor={colors.primary.pale_green}>
                <Text onPress={()=>{navigation.navigate('Restaurant')}} lineHeight="sm" bold>Informations détaillées du {'\n'} restaurant</Text>
            </Box>
            
        </VStack>
        )
    }
}

export default SelectedRestau