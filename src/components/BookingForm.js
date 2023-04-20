// routine
import { useState, useEffect, useContext } from 'react';
import { createReservation, getReservationByDay, editReservation } from '../services/reservations';
import { getRestaurantDetail } from '../services/restaurants';
import { getUserProfile } from '../services/users';
// data
import * as yup from "yup";
import { useFormik } from 'formik';
import { AuthContext } from "../contexts/AuthContext";
import moment from 'moment';
import dayjs from 'dayjs';
// front
import { View, FormControl, Button, Flex, HStack, VStack, Text, Input } from 'native-base';
import { errorHandler } from '../utils/errorHandler';
import jwt_decode from "jwt-decode";
import CustomButton from "./CustomButton";
import DatePicker from 'react-native-modern-datepicker';

// regex for format : 2023-03-05T18:40
const regex = new RegExp(/^([0-9]{4})-([0-9]{2})-([0-9]{2})[T]([0-9]{2})[:]([0-9]{2})/gm);

const validationSchema = yup.object({
    reservName: yup
        .string()
        .required('Ce champ est obligatoire'),

    reservPhone: yup
        .string()
        .nullable(true),

    resDate: yup
        .string(),
        // .required('Ce champ est obligatoire'),

    resTime: yup
        .string(),
        // .required('Ce champ est obligatoire'),

    seatNr: yup
        .number(),
        // .moreThan(0, 'Renseignez au moins une place.')
        // .lessThan(16, 'Veuillez appeler le restauraut pour réserver plus de 15 places.')
        // .required('Ce champ est obligatoire'),

    status: yup
        .string()
        .required('Une erreur est survenue durant la vérification des informations saisies.')
        .matches('^(KEPT)$|^(CLS)$|^(CLD)$', 'Saisie incorrecte.')
        .default('KEPT')
})

const BookingForm = ({reservationValues=null, setRefreshData, setShowModal, token}) => {
    const [ reservation, setReservation ] = useState({}),
          [ cleaning, setCleaning ] = useState(false),
          [ isLoaded, setIsLoaded ] = useState(false),
          // current restaurant
          [ restaurantID, setRestaurantID ] = useState(''),
          [ restauCapacity, setRestauCapacity ] = useState(''),
          [ schedule, setSchedule ] = useState(),
          // consumer
          [ consumerName, setConsumerName ] = useState(),
          // date time
          [ disabledHours, setDisabledHours ] = useState([]),
          [ overBookedHalf, setOverBookedHalf ] = useState([]),
          [ dayOverBooked, setDayOverBooked ] = useState(false),
          [ resDate, setResDate ] = useState(''),
          [ resTime, setResTime ] = useState(''),
          [ time, setTime ] = useState({ hour: moment().hour(), minute: moment().minute() });;

    // get user token
    const { user } = useContext(AuthContext);
    const currentToken = user?.data?.token,
        userInfos = jwt_decode(currentToken),
        userRole = userInfos?.roleID ?? '',
        userID = userInfos?.id;

    let editMode = false,
        reservationID = '';
    if (reservationValues) {
        editMode = true;
        reservationID = reservationValues?._id;
    }

    const onSubmit = (values) => {

        debugger
        // format date & time
        values.reservDate = `${values.resDate}T${values.resTime}:00.000Z`
        delete values.resDate;
        delete values.resTime;

        /*if (!isConsumer) {
            delete values.consumerID;
        }*/

        if (editMode) {
            editReservation(reservationID, values, token).then((res) => {
                setRefreshData(true)
            }).catch((err) => {
                errorHandler('TOAST', err)
            }).finally(()=>{
                setShowModal(false)
            })
        } else {
            createReservation(values, token).then((res) => {
                setRefreshData(true)
            }).catch((err) => {
                errorHandler('TOAST', err)
            }).finally(()=>{
                setShowModal(false)
            })
        }
    }

    const setTimeSchedule = (selectedDate, time) => {
        const splited = time.split(':', 2), // HH:mm(:ss)
              currHour = parseInt(splited[0]),
              currMins = parseInt(splited[1]);

        let newDate = new Date(selectedDate.setHours(currHour,currMins,0,0))
        return newDate;
    }

    const getHourFromString = (stringHour) => parseInt(stringHour.slice(0,2));

    const getDateObject = (date) => {
        let correctDate = date.replace('.000Z', '');
        return new Date(correctDate)
    }

    const disabledTime = (current, type) => {
        const disabledMinutes = (current) => {
            if (current > 0) {
                let bookedMins = []
                overBookedHalf.forEach((currHalf)=>{
                    let currBookedHour = currHalf.getHours();
                    if (currBookedHour === current && !disabledHours.includes(currBookedHour))
                    {
                        bookedMins.push(currHalf.getMinutes())
                    }
                })
                return bookedMins;
            }
        }

        return {
            disabledHours: () => disabledHours,
            disabledMinutes: disabledMinutes,
        }
    }

    // formik desclaration
    const { values, errors, handleChange, setFieldValue,  handleSubmit } =
    useFormik(
    {
        enableReinitialize: true,
        initialValues: {
            consumerID: reservation.consumerID ?? userID ?? '',
            reservName: reservation.reservName ?? consumerName ?? '',
            reservPhone: reservation.reservPhone ?? '',
            resDate: resDate ?? '',
            resTime: resTime ?? '11:00',
            seatNr: reservation.seatNr ?? 1,
            status: reservation.status ?? 'KEPT',
            restaurantID: reservation.restaurantID ?? '',
            type: reservation.type ?? 'INDOOR'
        },
        validationSchema,
        onSubmit
    });

    // format reservation informations
    useEffect(()=>{
        setCleaning(false)

        const token = currentToken;

        // user favorite restaurant ID
        getUserProfile(token).then((res)=>{
            if (cleaning) return;
            setRestaurantID(res.data.favouriteRestaurant_id);
        }).catch((err)=>{
            errorHandler('TOAST', err)
        })

        // get 
        if (editMode && reservationID !== '')
        {
            // default date & time
            let dateTime = reservationValues.reservDate;
            if (regex.test(dateTime)) {
                const [date, time] = dateTime.split('T', 2)
                setResDate(date)
                setResTime(time.slice(0, 5))
            }
            setReservation(reservationValues);
        }
        else 
        {
            // default date like dd/MM/yyyy
            let nowDate = new Date();
            let date = nowDate.toLocaleDateString('en-CA');
            setResDate(date);
        }

        return () =>{
            setCleaning(true);
        }

    }, [currentToken, editMode, reservationID])

    // get current restaurant infos
    useEffect(()=>{         
        let cancel = false;
        // get restaurant informations
        if (restaurantID)
        {
            getRestaurantDetail(restaurantID).then((res)=>{
                if (cancel) return;
                // i got every restaurants
                if (res?.data?.length > 1) {throw new Error(404)}
                // get schedule of current restaurant : archive 
                const scheduleObj = {
                    open : '11:00:00',
                    close : '23:00:00'
                }
                setRestauCapacity(40) //res?.data?.capacity
                setSchedule(scheduleObj)
                // setConsumerRestau(`${res.data.city} – ${res.data.address}`)
            }).catch((err)=>{
                console.error('RESTAURANT : ', err)
            })
        }
        return () => { 
            cancel = true;
        }
    }, [restaurantID])

    // get reservations disponibilities
    useEffect(()=>{         
        let cancel = false,
            bookedHalf = [],
            bookedHour = [],
            lastBookedHour;

        const token = currentToken;
        if (values.resDate && schedule && restauCapacity)
        {
            // store hours that exceed the schedule
            const selectedDate = new Date(values.resDate),
                  openHour = getHourFromString(schedule.open),
                  closeHour = getHourFromString(schedule.close),
                  hoursBeforeOpen = Array.from({ length: openHour }).map( (_, index) => index ),
                  hoursAfterClose = Array.from({ length: 24 }).map((_, index) => index).filter((hour) => hour > (closeHour-2));

            bookedHour.push(...hoursAfterClose)
            bookedHour.push(...hoursBeforeOpen)

            // get enabled hours by day
            getReservationByDay(values.resDate, 'KEPT', token).then((res)=>{
                if (cancel) return;
                const reservOfDay = res.data,
                      openedTime = setTimeSchedule(selectedDate, schedule.open),
                      closedTime = setTimeSchedule(selectedDate, schedule.close);

                // calculate the over booked hours 
                let currHalf = openedTime;
                do {
                    let minHour = moment(currHalf).subtract(2, 'h').toDate(),
                        maxHour = moment(currHalf).add(2, 'h').toDate(),
                        reservedBefore = 0,
                        reservedAfter = 0;

                    // eslint-disable-next-line
                    reservOfDay.forEach((checkedReservation)=>{
                        let checkedResID = checkedReservation._id;
                        if (editMode && (checkedResID === reservation._id))
                        {
                            return
                        }

                        const reservationTime = getDateObject(checkedReservation.reservDate),
                              currHalfTime =  new Date(currHalf);

                        // check si la réservation se trouve après l'heure minimum, et si se termine avant l'heure courante
                        if (reservationTime > minHour && reservationTime < currHalfTime) {
                            reservedBefore += checkedReservation.seatNr;
                        }

                        // check si la réservation commence vers l'heure courante
                        if (reservationTime >= currHalfTime && reservationTime < maxHour) {
                            reservedAfter += checkedReservation.seatNr;
                        }
                    })
        
                    const leftBefore = restauCapacity - reservedBefore,
                          leftAfter = restauCapacity - reservedAfter,
                          leftDuring = restauCapacity - (reservedAfter + reservedBefore);


                    if (leftDuring < values.seatNr || leftBefore < values.seatNr || leftAfter < values.seatNr)
                    {
                        bookedHalf.push(currHalf);
                    }

                    currHalf = moment(currHalf).add(30, 'm').toDate();
                } while (currHalf < closedTime)

                // store over booked hour HH: and half-hour HH:mm
                setOverBookedHalf(bookedHalf)
                bookedHalf.forEach((currDate)=>{
                    let currBookedHour = currDate.getHours();
                    if (currBookedHour === lastBookedHour)
                    {
                        bookedHour.push(currBookedHour)
                    }
                    lastBookedHour = currDate.getHours();
                })

                // if every hour are booked, disable the selection
                if (bookedHour.lentgh >= 24) {
                    setDayOverBooked(true)
                } else {
                    setDayOverBooked(false)
                }

                const userChoice = getHourFromString(values.resTime);
                if (userChoice && bookedHour.includes(userChoice))
                {
                    setFieldValue('resTime', '');
                    const err = {message: `Pas de bowl ! Aucune place n'est disponible pour ${values.seatNr} places à l'heure choisie. Veuillez en sélectionner une à nouveau.`}
                    errorHandler('TOAST', err)
                }

            }).catch((err)=>{
                setOverBookedHalf([])

                // console.error('GET SEATS : ', err)
                if (err?.response?.status !== 404) {
                    delete err?.response?.message;
                    err.message="Nous ne pouvons pas vérifier la disponibilité du restaurant pour la journée sélectionnée. Veuillez recommencer plus tard.";
                    errorHandler('TOAST', err)
                    setDayOverBooked(true) // disable time selection
                }

            })
        }

        setDisabledHours(bookedHour)

        return () => { 
            cancel = true;
        }
    }, [])
    // }, [values.resDate, values.resTime, values.seatNr, setFieldValue, restauCapacity, schedule, reservation, editMode])

    return ( 
    <VStack py={2} px={1} space={7} >
        <FormControl isInvalid={errors.reservName ? true : false}>
            <FormControl.Label style={{ marginBottom: 5 }} >Nom de famille</FormControl.Label>
            <Input
                type="text"
                placeholder="Nom de famille"
                variant="underlined"
                onChangeText={handleChange('reservName')}
                value={values.reservName}
            />
            <FormControl.ErrorMessage>{errors.reservName}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.reservPhone ? true : false}>
            <FormControl.Label style={{ marginBottom: 5 }}>Numéro de téléphone</FormControl.Label>
            <Input
                type="text"
                placeholder="Numéro de téléphone"
                variant="underlined"
                onChangeText={handleChange('reservPhone')}
                value={values.reservPhone}
            />
            <FormControl.ErrorMessage>{errors.reservPhone}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.seatNr ? true : false}>
            <FormControl.Label style={{ marginBottom: 5 }}>Nombre de personnes</FormControl.Label>
            <Input
                variant="underlined"
                type="text"
                keyboardType="numeric"
                placeholder="Nombre de personnes"
                defaultValue={values.seatNr}
                onChangeText={(value)=>{
                    let targetVal = value;
                    if (targetVal < 1) {
                        targetVal = 0;
                    }
                    else if (targetVal > 15) {
                        targetVal = 16;
                    }
                    setFieldValue('seatNr', targetVal)
                }}
                // onChangeText={handleChange('seatNr')}
                value={values.seatNr}
            />
            <FormControl.ErrorMessage>{errors.seatNr}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.resTime ? true : false}>
            <FormControl.Label style={{ marginBottom: 5, paddingBottom: 5 }}>Heure de la réservation</FormControl.Label>
            <DatePicker
                options={{
                    textHeaderColor: "#91D5A3",
                    mainColor: "#91D5A3",
                }}
                style={{width: '100%', marginTop: 20, padding: 0}}
                mode="time"
                selected={values.resTime}
                defaultValue={values.resTime}
                minuteInterval={30}
                onTimeChange={(time) => {console.log(time); handleChange('resTime')} }
            />
            <FormControl.ErrorMessage>{errors.resTime}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.resDate ? true : false}>
            <FormControl.Label style={{ marginBottom: 5 }}>Date de la réservation</FormControl.Label>
            <DatePicker
                options={{
                    textHeaderColor: "#91D5A3",
                    mainColor: "#91D5A3",
                }}
                style={{width: '100%', marginTop: 20, padding: 0}}
                mode="datepicker"
                selected={values.resDate}
                minimumDate={dayjs().format('YYYY-MM-DD')}
                onDateChange={(date) => {console.log(date); handleChange('resDate'); } }
            />
            <FormControl.ErrorMessage>{errors.resDate}</FormControl.ErrorMessage>
        </FormControl>

        <HStack /*mt={5}*/ justifyContent="flex-end">
            <CustomButton type="submit" onPress={()=>{console.log('submit'); handleSubmit(values)}}>Réserver</CustomButton>
        </HStack>

    </VStack>
    )
}

export default BookingForm;