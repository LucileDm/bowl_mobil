import { useState, useEffect } from 'react';
import { Button, Flex, HStack, VStack, Text } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons'; 

const BookingListItem = ({reservation, setReservationForm }) => {
    const [ status, setStatus ] = useState(''),
          [ cleaning, setCleaning ] = useState(false),
          [ statusColor, setStatusColor ] = useState('');
    // récup setReservationForm


    const cancelReservationBtn = (id) => {
        if (isEditable)
        {
            cancelReservation(id).then((res) => {
                formatStatus(res.data.status);
                setIsEditable(false)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const formatStatus = (statusCode) => {
        switch (statusCode) {
            // kept
            case 'KEPT':
                setStatusColor('#36B92B');
                setStatus('Maintenu');
                break;
            // cancelled
            case 'CLD':
                setStatusColor('#E34927');
                setStatus('Annulé');
                break;
            // closed
            case 'CLS':
                setStatusColor('#F9B100');
                setStatus('Terminé');
                break;
            default:
                setStatusColor('')
                setStatus('Indéfini');
        }
    }

    useEffect(()=>{
        setCleaning(false)

        if (!cleaning) {
            formatStatus(reservation.status);
        }

        return () =>{
            setCleaning(true);
        }

    }, [reservation])

    // setReservationForm
    return ( 
    <HStack
        pt={5}
        pb={2}
        borderBottomWidth=".9" 
        borderBottomColor="#3D3D3D"
        justifyContent="space-between"
    >

        <VStack
        justifyContent="center"
        space={1}
        borderWith={1}
        borderColor="red"
        flex={1}
        pl="6"
        pr="2">

            <Text fontSize="xs">{reservation?.seatsNr} personnes</Text>
            <Text fontSize="lg">{reservation?.city}</Text>
        </VStack>

        <VStack
        justifyContent="flex-start"
        space={1}
        borderWith={1}
        borderColor="red"
        flex={1}
        pl="6"
        pr="2">

            {(reservation?.status == 'KEPT')
            ? <>
                <Text fontSize="xs">{reservation?.resDate} à {reservation?.resTime}</Text>
                <Text fontSize="lg" style={{color: statusColor}} >{status}</Text>
              </>
            : <HStack flexDirection="row" alignItems="center"  justifyContent="space-evenly">
                <Feather name="edit" size={24} color="black" onPress={setReservationForm} />
                <Button py={2} bgColor="#3c3c3c" onPress={()=>console.log('annuler')}>Annuler</Button>
              </HStack>
            }
        </VStack>


    </HStack>
    )
}

export default BookingListItem;