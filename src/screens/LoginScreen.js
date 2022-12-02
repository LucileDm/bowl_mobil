import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import { Input, Stack } from "native-base";
import { login } from "../services/users";
import {AuthContext} from './../contexts/AuthContext';


export const LoginScreen = props => {
    
    const {setUser} = useContext(AuthContext);
    return(
    
    <Formik
        initialValues={{ 
            email: '',
            password: '',
        }}
      
        onSubmit={ values => {
            console.log(values)
            login(values).then((data)=>{
                console.log(data)
                setUser(data)
            }).catch(err => {
                console.log(err)
            })
        }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Stack space={2} w="75%" maxW="300px" mx="auto">

                <Input  variant="underlined" 
                        type="email" 
                        placeholder="Email" 
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email} />

                <Input  variant="underlined" 
                        type="password" 
                        placeholder="Mot de passe"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password} />

                <Button onPress={handleSubmit} title="Connexion" />
            </Stack>

        </View>
      )}
    </Formik>
  )};

export default LoginScreen;