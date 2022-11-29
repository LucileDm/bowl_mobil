import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function Register() {
  return (
    <View style={styles.container}>
        <Text>Créer un compte</Text>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7B05B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;