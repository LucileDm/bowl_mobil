import React from 'react';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Input, Stack, FormControl, WarningOutlineIcon, ScrollView } from "native-base";
import { register } from "../services/users";

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
    <ScrollView>
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
                console.log('L\'utilisateur à bien été enregistré.')
            }).catch(err => {
                console.log(err)
            })
        }}
        validationSchema={registerSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (

        <View style={{ flex: 1, justifyContent: "center" }}>
            <Stack space={2} w="75%" maxW="300px" mx="auto">


            <FormControl isInvalid={errors.firstName ? true : false}>
                <FormControl.Label >Prénom</FormControl.Label>
                    <Input  variant="underlined" 
                            type="text" 
                            placeholder="Jean"
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstname} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                   {errors.firstName}
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors.lastName ? true : false}>
                <FormControl.Label>Nom</FormControl.Label>
                    <Input  variant="underlined" 
                            type="text" 
                            placeholder="BONHERTA"
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastname} />
                    
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.lastName}
                </FormControl.ErrorMessage>
            </FormControl>



            <FormControl isInvalid={errors.email ? true : false}>
                <FormControl.Label>Adresse email</FormControl.Label>
                    <Input  variant="underlined" 
                            type="email" 
                            placeholder="jbon@herta.fr" 
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.email}
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors.password ? true : false}>
                <FormControl.Label>Mot de passe</FormControl.Label>
                    <Input  variant="underlined" 
                            type="password" 
                            placeholder="********"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password} />   
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.password}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.passwordConfirm ? true : false}>
                <FormControl.Label>Confirmation de mot de passe</FormControl.Label>
                    <Input  variant="underlined" 
                            type="password" 
                            placeholder="********"
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm} />  
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.passwordConfirm}
                </FormControl.ErrorMessage>
            </FormControl>

                <Button onPress={handleSubmit} title="Enregistrer" />
            </Stack>

        </View>
      )}
    </Formik>
    </ScrollView>
  );

export default RegisterScreen;