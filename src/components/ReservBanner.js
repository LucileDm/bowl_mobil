import { StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {vh} from 'react-native-viewport-units';
import { VStack, Box, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const styles = StyleSheet.create({
  container: {
    height: 60*vh,
    justifyContent: 'flex-end',
  }
})

const ReservBanner = () => {

  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={{uri: "https://bowllywood.onrender.com/images/reservBnrMobil.jpg"}}
      resizeMode="cover">
        
      <Box 
        style={styles.container}
        position="relative"        >

        <LinearGradient
          colors={['transparent', 'rgba(242,242,242,1)']}
          position= 'absolute'
          width= "100%"
          height= "100%"/>

        <VStack 
          py={9}
          px={8}
          space={2}>

          <Text
            fontSize="md"
            letterSpacing={.8}
            bold>Envie de déguster ?</Text>

          <Text
            fontSize="2xl"
            lineHeight="sm"
            width="80%"
            bold>Réservez dès maintenant dans votre restaurant préféré</Text>
          
          <Box alignSelf="flex-end" mt={5}>
            <CustomButton 
              bsType="secondary"
              onPress={()=> () => navigation.navigate('Reservation')}
            >Réserver mes places !</CustomButton>
          </Box>

        </VStack>

      </Box>
    </ImageBackground>
  )
}

export default ReservBanner