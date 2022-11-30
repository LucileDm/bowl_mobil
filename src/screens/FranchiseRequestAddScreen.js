import React from 'react';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input, Stack, FormControl, WarningOutlineIcon, Checkbox, ScrollView } from "native-base";

import { addFranchiseRequest } from '../services/franchiseRequest';


const addFranchiseSchema = yup.object({
    phone: yup.string().required('Ce champ est obligatoire'),
    city: yup.string().required('Ce champ est obligatoire'),
    estimatedAmount: yup.number().required('Ce champ est obligatoire'),
    hopedFinancing: yup.number().required('Ce champ est obligatoire'),
    shopLocation: yup.string().required('Ce champ est obligatoire'),
    foodServiceExperience: yup.number().required('Ce champ est obligatoire'),
    conditionOfUse: yup.bool().oneOf([true], 'Veuillez accepter les CGU').required(),
    user_id: yup.string(),
});

export const FranchiseRequestAddScreen = props => (
    <ScrollView>
        <Formik
            initialValues={{ 
                phone: '',
                city: '',
                estimatedAmount: '',
                hopedFinancing: '',
                shopLocation: '',
                foodServiceExperience: '',
                conditionOfUse: false,
                status: 'PENDING',
                // user_id: userID,
                user_id: 'idAModifier',

            }}
        
            onSubmit={ values => {
                addFranchiseRequest(values).then(()=>{
                    console.log('La demande de franchise à bien été envoyée.')
                }).catch(err => {
                    console.log(err)
                })
            }}
            validationSchema={addFranchiseSchema}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Stack space={2} w="75%" maxW="300px" mx="auto">


                <FormControl isInvalid={errors.phone ? true : false}>
                    <FormControl.Label >Téléphone*</FormControl.Label>
                        <Input  variant="underlined" 
                                type="text" 
                                placeholder="Ex: 0612345678"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone} />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.phone}
                    </FormControl.ErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.city ? true : false}>
                    <FormControl.Label>Ville d'implantation*</FormControl.Label>
                        <Input  variant="underlined" 
                                type="text" 
                                placeholder="Ex: Paris"
                                onChangeText={handleChange('city')}
                                onBlur={handleBlur('city')}
                                value={values.city} />
                        
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.city}
                    </FormControl.ErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.estimatedAmount ? true : false}>
                    <FormControl.Label>Montant estimé de l'investissement *</FormControl.Label>
                        <Input  variant="underlined" 
                                type="number"
                                placeholder="Ex: 400000" 
                                onChangeText={handleChange('estimatedAmount')}
                                onBlur={handleBlur('estimatedAmount')}
                                value={values.estimatedAmount} />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.estimatedAmount}
                    </FormControl.ErrorMessage>
                </FormControl>


                <FormControl isInvalid={errors.hopedFinancing ? true : false}>
                    <FormControl.Label>Financement envisagé *</FormControl.Label>
                        <Input  variant="underlined" 
                                type="number"
                                placeholder="Ex: 200000"
                                onChangeText={handleChange('hopedFinancing')}
                                onBlur={handleBlur('hopedFinancing')}
                                value={values.hopedFinancing} />   
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.hopedFinancing}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.shopLocation ? true : false}>
                    <FormControl.Label>Ville d'implantation</FormControl.Label>
                        <Input  variant="underlined" 
                                type="text" 
                                placeholder="Ex: Lyon"
                                onChangeText={handleChange('shopLocation')}
                                onBlur={handleBlur('shopLocation')}
                                value={values.shopLocation} />  
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.shopLocation}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.foodServiceExperience ? true : false}>
                    <FormControl.Label>Expérience dans la restauration *</FormControl.Label>
                        <Input  variant="underlined" 
                                type="number" 
                                placeholder="Ex: 3"
                                onChangeText={handleChange('foodServiceExperience')}
                                onBlur={handleBlur('foodServiceExperience')}
                                value={values.foodServiceExperience} />  
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.foodServiceExperience}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.conditionOfUse ? true : false}>
                    <FormControl.Label>J'ai lu et j'accepte les conditions générales d'utilisation *</FormControl.Label>
                        <Checkbox   accessibilityLabel="J'ai lu et j'accepte les conditions générales d'utilisation"
                                    onChangeText={handleChange('conditionOfUse')}
                                    onBlur={handleBlur('conditionOfUse')}
                                    value={values.conditionOfUse} />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.conditionOfUse}
                    </FormControl.ErrorMessage>
                </FormControl>

                {/* <FormControl isInvalid={errors.conditionOfUse ? true : false}>
                    <FormControl.Label>J'ai lu et j'accepte les conditions générales d'utilisation *</FormControl.Label>
                        <Input  variant="underlined" 
                                type="checkbox" 
                                onChangeText={handleChange('conditionOfUse')}
                                onBlur={handleBlur('conditionOfUse')}
                                value={values.conditionOfUse} />  
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.conditionOfUse}
                    </FormControl.ErrorMessage>
                </FormControl> */}

                <FormControl isInvalid={errors.status ? true : false}>
                        <Input  variant="underlined" 
                                type="hidden" 
                                onChangeText={handleChange('status')}
                                onBlur={handleBlur('status')}
                                value={values.status} />  
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.status}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.user_id ? true : false}>
                        <Input  variant="underlined" 
                                type="hidden" 
                                onChangeText={handleChange('user_id')}
                                onBlur={handleBlur('user_id')}
                                value={values.user_id} />  
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.user_id}
                    </FormControl.ErrorMessage>
                </FormControl>


                    <Button onPress={handleSubmit} title="Enregistrer" />
                </Stack>

            </View>
        )}
        </Formik>
    </ScrollView>
  );

export default FranchiseRequestAddScreen;