import React from 'react';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Input, Stack, FormControl, WarningOutlineIcon } from "native-base";
import { register } from "../services/users";

// const validationSchema plutot ??
const registerSchema = yup.object({
    firstName: yup.string().required('Ce champ est obligatoire'),
    lastName: yup.string().required('Ce champ est obligatoire'),
    email: yup
        .string('Ce champ est obligatoire')
        .email('La saisie est invalide.')
        .required('Ce champ est obligatoire'),
    password: yup.string().required('Ce champ est obligatoire'),
    passwordConfirm: yup
        .string()
        .required('Ce champ est obligatoire')
        .oneOf(
            [yup.ref('password'), null],
            'Les mots de passes ne correspondent pas.'
        ),
});

export const RegisterScreen = props => (
    <Formik
        // pas sur de a ligne ci dessous
        validationSchema={registerSchema}
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
                console.log('L\'utilisateur à bien été enregistré.')
            }).catch(err => {
                console.log(err)
            })
        }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (

        <View style={{ flex: 1, justifyContent: "center" }}>
            <Stack space={2} w="75%" maxW="300px" mx="auto">


            <FormControl isInvalid={errors}>
                <FormControl.Label >Prénom</FormControl.Label>
                    <Input  variant="underlined" 
                            type="text" 
                            placeholder="Jean"
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstname} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something is wrong.
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors}>
                <FormControl.Label>Nom</FormControl.Label>
                    <Input  variant="underlined" 
                            type="text" 
                            placeholder="BONHERTA"
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastname} />
                    
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something is wrong.
                </FormControl.ErrorMessage>
            </FormControl>



            <FormControl isInvalid={errors}>
                <FormControl.Label>Adresse email</FormControl.Label>
                    <Input  variant="underlined" 
                            type="email" 
                            placeholder="jbon@herta.fr" 
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something is wrong.
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors}>
                <FormControl.Label>Mot de passe</FormControl.Label>
                    <Input  variant="underlined" 
                            type="password" 
                            placeholder="********"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password} />   
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something is wrong.
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors}>
                <FormControl.Label>Confirmation de mot de passe</FormControl.Label>
                    <Input  variant="underlined" 
                            type="password" 
                            placeholder="********"
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm} />  
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something is wrong.
                </FormControl.ErrorMessage>
            </FormControl>


                <Button onPress={handleSubmit} title="Enregistrer" />
            </Stack>

        </View>
      )}
    </Formik>
  );

export default RegisterScreen;