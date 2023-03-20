import { useFonts } from 'expo-font';
import { theme } from '../../utils/theme.js';
import { StyleSheet, Image, ImageBackground, Dimensions } from 'react-native'
import { Text, 
		 Box, 
		 VStack, 
		 Center, 
		 Link, 
		 useTheme } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

function MaintenanceScreen() {

	const {colors} = useTheme()
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			position: 'relative',
		},
		bgImage: {
			borderWidth: 1,
			position: 'absolute',
			width: 270,
			height: 320,
			resizeMode: 'cover',
			repeat: false,
			bottom: -50,
			right: -20,
		}
	})

	// fontFamily="mauikea"
	const imgSource = {uri: "https://bowllywood-8llo.onrender.com/images/saltedBg.png"};

	return (

		<Box style={styles.container} >

			<Image source={imgSource} style={styles.bgImage} />

			<VStack
				alignItems="center"
				justifyContent="center"
				space={10}
				style={{height: '80%'}}
				px={5} >

				<Text fontSize="3xl" bold color={colors.primary.dark_grey} >Page en maintenance</Text>
				<Text fontSize="md" textAlign="justify" >Cette page a mangé quelque chose et a fait une indigestion... Notre équipe s'efforce de l'osculter, et lui donne un bol de riz avec une pincée de créativité. Elle devra patienter un peu pour vous être à votre service !</Text>

				<Link href="/Home" alignItems="center" >
					<Ionicons name="home-sharp" size={25} color="#3D3D3D" />
					<Text fontSize="xl" ml={2} borderBottomWidth={1} >Retouner à la page d'accueil</Text> 
				</Link>
			</VStack>
		</Box>
	)
}

export default MaintenanceScreen;