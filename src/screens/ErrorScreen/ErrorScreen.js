import { useLocation } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native'
import { Text, 
		 Box, 
		 VStack,
		 Link, 
		 useTheme } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

function ErrorScreen({errCode='', errText}) {
	const imgSource = {uri: "https://bowllywood-8llo.onrender.com/images/sweetBg.png"},
		  location = useLocation(),
		  {code, message} = location?.state;

	const {colors} = useTheme()
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			position: 'relative',
		},
		bgImage: {
			borderWidth: 1,
			position: 'absolute',
			resizeMode: 'contain',
			width: 260,
			height: 140,
			repeat: false,
			bottom: 0,
			right: 0,
		}
	})

	if (!errText) errText = message ?? 'Une erreur inconnue est survenue. Veuillez recommencer ou retourner à la page d\'accueil.';
	if (code) errCode = code;

	// fontFamily="mauikea"
	return (
		<Box style={styles.container} >

			<Image style={styles.bgImage} source={imgSource} />

			<VStack
				alignItems="center"
				justifyContent="center"
				space={10}
				style={{height: '80%'}}
				px={5} >

				<Text fontSize="4xl" bold color={colors.primary.dark_grey} >Erreur {errCode}</Text>
				<Text fontSize="lg" textAlign="center" >Pas de bowl ! {errText}</Text>

				<Link href="/" alignItems="center" >
					<Ionicons name="home-sharp" size={25} color="#3D3D3D" />
					<Text fontSize="2xl" ml={2} borderBottomWidth={1} >Retouner à la page d'accueil</Text> 
				</Link>
			</VStack>
		</Box>
	)
}

export default ErrorScreen;