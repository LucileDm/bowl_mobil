// utils
import { useState, useEffect, useContext } from 'react';
import { errorHandler } from '../../utils/errorHandler';
// data
import { getUserReservations, createReservation, getAllReservations, editReservation, cancelReservation } from '../../services/reservations';
import { getRestaurantDetail } from '../../services/restaurants';
import { AuthContext } from "../../contexts/AuthContext";
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
// front
import BookingListItem from '../../components/BookingListItem';
import BookingForm from '../../components/BookingForm';
import { theme } from '../../utils/theme.js';
import { Modal, HStack, View, VStack, FlatList, Text, Spinner } from 'native-base';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

function BookingScreen() {
   const [reservations, setReservations] = useState([]),
        [reservationValues, setReservationValues] = useState(null),
        [cleaning, setCleaning] = useState(false),
        [pressed, setPressed] = useState(false),
        [fullDate, setFullDate] = useState(''),
        [refreshData, setRefreshData] = useState(false),
        [isLoaded, setIsLoaded] = useState(false),
        [showModal, setShowModal] = useState(false),
        [isConsumer, setIsConsumer] = useState(false);

  // get user token
  const { user } = useContext(AuthContext);
  const currentToken = user?.data?.token,
        userInfos = jwt_decode(currentToken),
        userRole = userInfos?.roleID ?? '';

  useEffect(()=>{
    setCleaning(false)
    // sort table and define time informations
    const dataContent = (res) => {
       // place items depending of the date
       // descendent mode
       res.data.sort((first, second)=>{
          return (first.reservDate < second.reservDate) ? 1 : -1;
       })

       res.data.forEach((item)=>{

          let reservDate = new Date(item.reservDate)
          let itemTime = reservDate.getTime(),
              nowTime = new Date().getTime();

          if (item.status !== 'CLD' && itemTime <= nowTime)
          {
            item.status = 'CLS';
          }

          let dateObj = item.reservDate;
          if (dateObj.includes('Z')) {
             dateObj = dateObj.split('Z')[0];
          }
          item.resDate = getFullDate(dateObj);
          item.resTime = getFullTime(dateObj);
       })
    }

    // get data depending on the user role
    if (userRole === 'ROLE_USER')
    {
       setIsConsumer(true);

       let token = currentToken;
       getUserReservations(token).then((res)=>{
          if (cleaning) return;

          dataContent(res)

          let reservationArr = [];
          let fetchCityName = async () => {
            for (const reservation of res.data) {
               try
               {
                  let restaurant = await getRestaurantDetail(reservation.restaurantID);
                  reservation.city = restaurant?.data?.city;
                  reservationArr.push(reservation)
               }
               catch(err)
               {
                  reservation.city = 'Ville introuvable';
               }
            }
            setReservations(reservationArr)
            setPressed(false)
            setIsLoaded(true)
         }

        fetchCityName()

       }).catch((err)=>{
          setReservations([])
          setIsLoaded(true)
          if (err?.response?.status !== 404) errorHandler('TOAST', err)
       })
    }

    return () => { 
        setCleaning(true);
    }
  }, [refreshData, userRole])


  const getFullDate = (dateObj) => {
    if (typeof dateObj !== 'object' || !(dateObj instanceof Date)) {
      dateObj = new Date(dateObj);
    }

    return dateObj.toLocaleDateString("fr-FR", 
    {
      year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
  }

  const getFullTime = (dateObj) => {
    if (typeof dateObj !== 'object' || !(dateObj instanceof Date)) {
      dateObj = new Date(dateObj);
    }

    let minutes = dateObj.getMinutes();
    return `${dateObj.getHours()}h${ (minutes !== 0) ? minutes : ''}`;
  }

  const setReservationForm = (reservationID='') => {
    if (reservationID) {
      let reservationTable = reservations;
      let reservationFiltered = reservationTable.filter((item)=> item._id === reservationID)[0];
      setReservationValues(reservationFiltered)
    }
    setShowModal(true)
  }
  return (
    <VStack>

      <Modal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}>

        <Modal.Content maxWidth="800px">
          <Modal.CloseButton />
          <Modal.Body>
            <BookingForm 
              reservationValues={reservationValues} 
              setRefreshData={setRefreshData} 
              setShowModal={setShowModal} 
              token={currentToken} />
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <VStack
        justifyContent='center'
        alignItems='center'
        mb={3} 
        py={6} >
        <Feather name="plus" size={50} color="black" color="#3c3c3c" onPress={()=>setShowModal(true)} />
        <Text style={{ textAlign : 'center'}} >Ajouter une réservation</Text>
      </VStack>

      <HStack
        justifyContent="flex-end"
        py={4}
        px={6}>
        <MaterialIcons name="refresh" size={30} color={(!pressed) ? '#3c3c3c' : '#aaa'}  onPress={() => {setPressed(true); setRefreshData(!refreshData) }} />
      </HStack>
      {(isLoaded) 
      ? (reservations?.length > 0) 
        ? <FlatList
            data={reservations}
            renderItem={ ({item}) => <BookingListItem reservation={item} setReservationForm={setReservationForm} setRefreshData={setRefreshData} refreshData={refreshData} /> }
            px={2} />
        : <Text px={5} fontSize="lg" style={{ textAlign : 'center'}}>Vous n'avez pas fait de réservations.</Text>
      : <Spinner />}
    </VStack>
  )
}

export default BookingScreen;