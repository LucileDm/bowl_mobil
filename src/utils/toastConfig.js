import {ErrorToast} from 'react-native-toast-message';

const toastConfig = {
    error: (props) => (
    <ErrorToast
        {...props}
        text1Style={{
            fontWeight: '400',
            fontSize: 17
        }}
        text2Style={{
            fontSize: 16
        }}
        text1NumberOfLines={20}
        text2NumberOfLines={20}
        style={{
            width: '90%',
            height: '100%',
            paddingVertical: 5,
            borderLeftColor: '#ff0000'
        }}
      />
    ),
  };
  
export default toastConfig;