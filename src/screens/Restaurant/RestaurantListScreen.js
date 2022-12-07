import { React, useEffect, useState } from "react";
import { Box, Button, Center, Container, FlatList, Heading, HStack, NativeBaseProvider, Radio, Row, Text, VStack } from "native-base";

import {getAllRestaurants} from './../../services/restaurants';
import { theme } from './../../utils/theme.js';
import { divide } from "react-native-reanimated";
import ItemListRestaurant from "../../components/ItemListRestaurant";


const RestaurantListScreen = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {  
        getAllRestaurants()
            .then((res) => {
                // console.log('ce que contien res:', res);
                setRestaurants(res.data);
                // console.log('ce que contien res.data:', res.data);
            })
            .catch((err) => {
                console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
        {/* !loading &&  */}
        <Heading>Liste de vos restaurants</Heading>
        <HStack justifyContent="space-evenly">
            <VStack >
                <Heading>20</Heading>
                <Heading>restaurants</Heading>
            </VStack>
            <VStack>
                <Heading>15</Heading>
                <Heading>villes</Heading>
            </VStack>
        </HStack>

        <FlatList data={restaurants} key={(item, index) => index} renderItem={(item) => {
            return <ItemListRestaurant restos={item} />
        }} />
        </>
        )
          

} 
   

export default RestaurantListScreen;






// import {
//   Box,
//   FlatList,
//   Heading,
//   Avatar,
//   HStack,
//   VStack,
//   Text,
//   Spacer,
//   Center,
//   NativeBaseProvider,
// } from "native-base";

// const Example = () => {
//   const data = [
//     {
//       id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//       fullName: "80000",
//       timeStamp: "Ouvert",
//       recentText: "Amiens centre",
//       timeSlot: "Horaire du jour",
//       avatarUrl:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     },
//     {
//       id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//       fullName: "Sujitha Mathur",
//       timeStamp: "11:11 PM",
//       recentText: "Cheer up, there!",
//       avatarUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
//     },
//     {
//       id: "58694a0f-3da1-471f-bd96-145571e29d72",
//       fullName: "Anci Barroco",
//       timeStamp: "6:22 PM",
//       recentText: "Good Day!",
//       avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
//     },
//     {
//       id: "68694a0f-3da1-431f-bd56-142371e29d72",
//       fullName: "Aniket Kumar",
//       timeStamp: "8:56 PM",
//       recentText: "All the best",
//       avatarUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
//     },
//     {
//       id: "28694a0f-3da1-471f-bd96-142456e29d72",
//       fullName: "Kiara",
//       timeStamp: "12:47 PM",
//       recentText: "I will call today.",
//       avatarUrl:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
//     },
//   ];
//   return (
//     <Box>
//       <Heading fontSize="xl" p="4" pb="3">
//         Inbox
//       </Heading>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => (
//           <Box
//             borderBottomWidth="1"
//             _dark={{
//               borderColor: "muted.50",
//             }}
//             borderColor="muted.800"
//             pl={["0", "4"]}
//             pr={["0", "5"]}
//             py="2"
//           >
//             <HStack space={[2, 3]} justifyContent="space-between">
//               <Avatar
//                 size="48px"
//                 source={{
//                   uri: item.avatarUrl,
//                 }}
//               />
//               <VStack>
//                 <Text
//                   _dark={{
//                     color: "warmGray.50",
//                   }}
//                   color="coolGray.800"
//                   bold
//                 >
//                   {item.fullName}
//                 </Text>
//                 <Text
//                   color="coolGray.600"
//                   _dark={{
//                     color: "warmGray.200",
//                   }}
//                 >
//                   {item.recentText}
//                 </Text>
//               </VStack>
//               <Spacer />
//               <Text
//                 fontSize="xs"
//                 _dark={{
//                   color: "warmGray.50",
//                 }}
//                 color="coolGray.800"
//                 alignSelf="flex-start"
//               >
//                 {item.timeStamp},
//               </Text>

//               <Text
//                 fontSize="xs"
//                 _dark={{
//                   color: "warmGray.50",
//                 }}
//                 color="coolGray.800"
//                 alignSelf="flex-start"
//               >
//                 {item.timeSlot}
//               </Text>
//             </HStack>
//           </Box>
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </Box>
//   );
// };


// import { Container, Text, Heading, Center, NativeBaseProvider, HStack } from "native-base";
// import { VStack } from "native-base";

// function Example() {
//   return <Center>
//       <Container>
//         <Heading size="lg">
//           Liste de vos restaurants
//         </Heading>
//         {/* <Text mt="3" fontWeight="medium">
//           NativeBase is a simple, modular and accessible component library that
//           gives you building blocks to build you React applications.
//         </Text> */}
//       </Container>
//       <HStack space={3} justifyContent="center">
//       <Center h="40" w="20" bg="primary.300" rounded="md" shadow={3} />
//       <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3} />
//       <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} />
//     </HStack>;
//     <VStack space={4} alignItems="center">
//       <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} />
//       <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
//       <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
//     </VStack>;
//     </Center>;
// }
// export default Example;

// export default () => {
//     return (
//       <NativeBaseProvider>
//         <Center flex={1} px="3">
//             <Example />
//         </Center>
//       </NativeBaseProvider>
//     );
// };








// -------------------------


//  /**
//      * Return the ingredients of the current bowl as a formatted text. 
//      * @param   {array}  ingArr Array of the bowl's ingredients
//      * @returns {string} ingText If the Ingredient array is empty, return error msg.
//      * Else return all ing. in a formatted text.
//      */
    // const IngList = ({ingArr}) => {
    //   var ingText = '';
    //   if (ingArr.length > 0)
    //   {
    //     ingArr.forEach((ing, index) => {
    //       ingText += (index !== ingArr.length) ? `${ing} •` : ing;
    //     });
    //   }
    //   return <Text>{ingText}</Text>;
    // }
    
    // const renderItem = ({ item }) => {
    //   return (
    //     <Pressable
    //     //   onPress={navToBowl(item._id)}
    //     //   mb="3"
    //       >
  
    //       <HStack>
            
    //         <Image source={item.image}/>
    //         <VStack>
    //           {/* <HStack>
    //             <Text fontFamily="mauikea" fontSize="md" >{item.name}</Text>
    //             <Text fontFamily="body" fontSize="md" >{item.price}</Text>
    //           </HStack> */}
              
    //           {/* <IngList ingArr={item.ingredients}/> */}
    //           {/* <Text fontSize="sm"maxW="100" >{item.description}</Text> */}
    //         </VStack>
  
    //       </HStack>  
    //     </Pressable>
    //   )
    // }
  
    // const EmptyList = (
    //   <Text>Aucun bowl n'a été trouvé</Text>
    // )
    
  // ItemSeparatorComponent
  // onRefresh
  // bg="primary.dark_grey"
    // return (
    //   <NativeBaseProvider theme={theme}>
  
  
        {/* <Box bg='colors.primary.dark_grey' safeArea >
          <FlatList 
            data={restaurants}
            renderItem={renderItem}
            ListEmptyComponent={EmptyList}
            ListHeaderComponent={<Box>Header</Box>}
            />
        </Box> */}
{/*   
        <Box flex={1}>
          <Text textAlign="center" >Accueil</Text>
   */}
          {/* <Button
            title="Bowl"
            // onPress={navToBowl}
            /> */}
  
          {/* <Button
            title="Reservation"
            onPress={() => navigation.navigate('Reservation')}
            />
  
          <Button
            title="Review"
            onPress={() => navigation.navigate('Review')}
          /> */}
        {/* </Box>
      </NativeBaseProvider>
    ); */}




//     return (
//             <Container>
//                 <Row>
                   
//                     <Text>Date de création</Text>
//                     <Text>Montant estimé</Text>
//                     <Text>Financement envisagé</Text>
//                     <Text>Ville d'implantation</Text>
                                
//                 </Row>
//             </Container>
//     );
// };