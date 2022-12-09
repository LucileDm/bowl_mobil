/*
    Reviews vide lors des premiers lancements engendre erreurs.
    401 non authentifié/non autorisé pour récupérer détails d'un user. 
*/

import { useEffect, useState } from 'react'
import { Box, Divider, HStack, Text, useTheme, VStack } from 'native-base'
import { getAllReview } from '../services/reviews'
// import { getUserDetails } from '../services/users'

import { Ionicons } from "@expo/vector-icons"
import StarRating from 'react-native-star-rating-widget'

const ReviewSlide = () => {
    const [reviews, setReviews] = useState([])
    const [rate, setRate] = useState([])
    const { colors } = useTheme();
    
    useEffect( () => {
        // mieux à faire : get les 3 4 premiers avec les meilleurs notes + description.
        getAllReview().then((res)=>{
            const gottenReviews = res.data.slice(0, 5);

            /*gottenReviews.forEach((review) => {
                getUserDetails(review.userID).then((userRes)=>{
                    review.userName = userRes.data.name;
                }).catch((err)=>{
                    console.log('GET USER DETAIL ', err)
                });
                delete review.userID;
            })*/
            
            setReviews(gottenReviews);
        }).catch((err)=>{
            console.log('GET REVIEWS ', err)
        })
    }, [])
    
    const CustomDivider = () => {
        return <Divider 
            orientation="horizontal"
            thickness={6}
            alignSelf="center"
            width="93%"
            bg={colors.primary.pale_green}
        />;
    }

    if (reviews.length > 0) {
        
        const firstReview = reviews[0];  

        return (
            <Box px={6}>
                <CustomDivider />
                <Text fontSize="2xl" mb={9} mt={4} bold>Avis Vérifiés</Text>
                <HStack
                    alignItems="center"
                    justifyContent="center"
                    mb={4}>

                    <Ionicons 
                        name='caret-back-outline'
                        size={20}
                        onPress={()=>{console.log('back')}} />
                    
                    <VStack px={4}>
                        <StarRating 
                            rating={firstReview.mark} 
                            // onChange={()=>{console.log('star')}} 
                            color={colors.secondary.star}
                            starSize={20} />
                        
                        <Text fontSize="md" bold>{firstReview.userName ?? "Pseudo introuvable"}</Text>
                        <Text>{firstReview.comment}</Text>
                    </VStack>

                    <Ionicons name='caret-forward-outline' size={20} onPress={()=>{console.log('forward')}}/>
                    
                </HStack>
                <CustomDivider />                
            </Box>
        )
    }
}

export default ReviewSlide