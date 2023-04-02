import { extendTheme } from 'native-base';

const Theme = extendTheme({
    colors: {
        primary: {
            dark_grey  : '#3D3D3D', // texte
            off_white  : '#F2F2F2', // Fond blanc du site
            pale_green : '#DAFBE2', // Navbar/Footer
            green      : '#A3F5B8', // Interactions utilisateur
        },
        secondary: {
            shadow_grey: '#DEDEDE',
            pale_grey  : '#C7C7C7', // Gris
            dark_green : '#91D5A3',
            star       : '#EABF63', // rating stars color
        }
    },
    fontConfig: {
        mauikea: require('../../assets/fonts/mauikea/mauikea.ttf')
    }
    /*fonts: {
        mauikea: Test(), // marche pas
        ibm: 'IBM Plex Sans' // idem
    }*/
});

export default Theme;
    /*
    fontConfig: {
        'ibm': 
        {
            200: {
            normal: "Roboto-Light",
            italic: "Roboto-LightItalic",
            },
            400: {
            normal: "Roboto-Regular",
            italic: "Roboto-Italic",
            },
            700: {
            normal: "Roboto-Medium",
            italic: "Roboto-MediumItalic",
            },
        },
    },
    */