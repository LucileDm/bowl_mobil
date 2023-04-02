import Toast from 'react-native-toast-message';
import {Alert} from 'react-native'

export function errorHandler(errType, errorCatched, navigation, subjectName) {
	let errTitle, errMessage;
	let errCode = errorCatched?.response?.status ?? errorCatched.code,
		catchedMsg = errorCatched?.response?.data?.message ?? undefined;

	if (typeof navigation === 'string' && !subjectName) 
	{
		subjectName = navigation;
		navigation = null;
	} 

	// define error message to display
	const get_default_message = (errCode, subjectName) => {
		let returnMsg = '' ;

		// define message
		switch (errCode)
		{
			case 400:
				returnMsg = `Impossible de traiter la requête. Veuillez vérifier les informations fournies.`
				break;
				case 404:
				subjectName = (typeof subjectName !== 'string') ? 'élément' : subjectName ;
				returnMsg = `Aucun.e ${subjectName} n'a été trouvé.e lors de la recherche.`
				break;
			case 401:
				returnMsg = `Vous devez être connecté pour accéder à cette page. Vous n'avez pas les droits ou avez été déconnecté.`
				break;
			case 403:
				returnMsg = `Vous n'avez pas les droits pour accéder à ces informations.`
				break;
			case 'ERR_NETWORK':
				let networkErr = 'Une erreur réseau est survenue, êtes-vous encore connecté à internet ?'
				returnMsg = (subjectName && subjectName !== 'élément') ? `${subjectName} : ${networkErr}` : networkErr;
				break;
			default:
				// [EVOLUTION] : send the error to the service for analysis.
				returnMsg = `Une erreur technique est survenue. Veuillez recommencer plus tard.`
				break;
		}
		return returnMsg;
	}
	
	if (catchedMsg && errCode != 'ERR_NETWORK') {
		errMessage = catchedMsg
	} else {
		errMessage = get_default_message(errCode, subjectName)
	}
	errTitle =`Erreur ${errCode}`

	// return object or redirect to page
	switch (errType)
	{
		case 'REDIRECT':
			navigation.replace(
				'Erreur',
				{
					screen: 'Error',
					params: { code: errCode, message: errMessage }
				}
			)
			break;
		case 'POPUP':
			Alert.alert(
				errTitle,
				errMessage,
				[{
					text: 'Ok pour moi !',
					onPress: () => close(),
				}]
			)
			break;
		case 'TOAST':
			Toast.show({
				type: "error",
				position: 'bottom',
				text1: errTitle,
				text2: errMessage,
				autoHide: true,
				bottomOffset: 90,
				keyboardOffset: 10,
			  })
			break;
		default:
			return false;
	}
}