import { useFonts } from 'expo-font';
import { theme } from '../../utils/theme.js';
import { StyleSheet, Image, Dimensions } from 'react-native'
import { Text, 
		 Box, 
		 VStack, 
		 Center, 
		 Link, 
		 useTheme } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

function ErrorScreen() {

	const {colors} = useTheme()
	const styles = StyleSheet.create({
		container: {
			height: 0.7 * Dimensions.get('screen').height,
		},
		debug: {
			borderWidth: 1,
		},
		bgImage: {
			position: 'absolute',
			width: '50%',
			height: '50%',
			bottom: 0,
			right: 0
		}
	})

	// fontFamily="mauikea"
	const imgSource = {uri: "https://bowllywood-8llo.onrender.com/images/sweetBg.png"};

	return (

		<VStack
			alignItems="center"
			justifyContent="center"
			space={10}
			style={styles.container}
			px={5} >

			<Image style={styles.bgImage} source={imgSource} />

			<Text fontSize="3xl" bold color={colors.primary.dark_grey} >Page en maintenance</Text>
			<Text fontSize="md" textAlign="justify" >Cette page a mangé quelque chose et a fait une indigestion... Notre équipe s'efforce de l'osculter, et lui donne un bol de riz avec une pincée de créativité. Elle devra patienter un peu pour vous être à votre service !</Text>

			<Link href="/" alignItems="center" >
				<Ionicons name="home-sharp" size={25} color="#3D3D3D" />
				<Text fontSize="xl" ml={2} borderBottomWidth={1} >Retouner à la page d'accueil</Text> 
			</Link>
		</VStack>
	)
}

export default ErrorScreen;