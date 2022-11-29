import React from 'react';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import { Input, Stack } from "native-base";
import { register } from "../services/users";

export const RegisterScreen = props => (
    <Formik
        initialValues={{ 
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '' 
        }}
      
        onSubmit={ values => {
            delete values.passwordConfirm;
            register(values).then(()=>{
                console.log('Création succes')
            }).catch(err => {
                console.log(err)
            })
        }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Stack space={2} w="75%" maxW="300px" mx="auto">
                
                <Input  variant="underlined" 
                        type="text" 
                        placeholder="Prénom"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstname} />

                <Input  variant="underlined" 
                        type="text" 
                        placeholder="Nom"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastname} />

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

                <Input  variant="underlined" 
                        type="password" 
                        placeholder="Confirmation du mot de passe"
                        onChangeText={handleChange('passwordConfirm')}
                        onBlur={handleBlur('passwordConfirm')}
                        value={values.passwordConfirm} />

                <Button onPress={handleSubmit} title="Enregistrer" />
            </Stack>

        </View>
      )}
    </Formik>
  );

export default RegisterScreen;