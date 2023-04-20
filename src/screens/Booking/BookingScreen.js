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
import DropDownItem from 'react-native-drop-down-item';
import { theme } from '../../utils/theme.js';
import { HStack, VStack, FlatList, Text, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 

function BookingScreen() {
   const [reservations, setReservations] = useState([]),
        [cleaning, setCleaning] = useState(false),
        [rotate, setRotate] = useState(false),
        [fullDate, setFullDate] = useState(''),
        [refreshData, setRefreshData] = useState(false),
        [isLoaded, setIsLoaded] = useState(false),
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

          if (itemTime <= nowTime)
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
          res.data.forEach((reservation)=>{
              getRestaurantDetail(reservation.restaurantID).then((res)=>{
                reservation.city = res.data.city;
              }).catch((err)=>{
                reservation.city = 'Ville introuvable';
              }).finally(()=>{
                setReservations(res.data)
              })
          })

       }).catch((err)=>{
          setReservations([])
          errorHandler('TOAST', err)
          console.log(err)
          // if (err?.response?.status !== 404) errorHandler('TOAST', err)
       }).finally(()=>{
          setIsLoaded(true)
       })
    }
    /*else
    {
       getAllReservations(filterDate).then((res)=>{
          if (cleaning) return;
          dataContent(res)
          setReservations(res.data)
       }).catch((err)=>{
          setReservations([])
          switch (err?.response?.status)
          {
          case 404:
             break
          case 403:
             delete err?.response?.data?.message ;
             delete err?.message ;
             errorHandler('TOAST', err)
             break
          default:
             errorHandler('TOAST', err)
          }

       }).finally(()=>{
          setIsLoaded(true)
       })
    }*/

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

  const setReservationForm = () => {
    console.log(user)
  }

  return (
    <VStack>
      <HStack
        justifyContent="flex-end"
        py={4}
        px={6}
      >
      <MaterialIcons name="refresh" size={30} color="black" onPress={()=>console.log('bip')} />
      </HStack>
      {(isLoaded) 
      ? 
      <FlatList 
          data={reservations}
          renderItem={ ({item}) => <BookingListItem reservation={item} setReservationForm={setReservationForm} /> }
          px={2}
      />      
      : <Spinner />}
    </VStack>
  )
}

export default BookingScreen;