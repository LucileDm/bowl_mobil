import React, { useContext } from "react";
import { View } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import {
  Button,
  Input,
  Stack,
  FormControl,
  WarningOutlineIcon,
  NativeBaseProvider,
  Box,
  Text,
} from "native-base";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { login } from "../../services/users";
import { AuthContext } from "../../contexts/AuthContext";
import CustomButton from "../../components/CustomButton";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Une adresse mail est requise pour se connecter!")
    .email("Ce n'est pas une adresse email valide!"),
  password: yup
    .string()
    .required("Un mot de passe est obligatoire pour se connecter!")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  return (
    <Formik
      initialValues={{
        email: '', // "jean@paule.fr",
        password: '', // "test123!",
      }}
      onSubmit={(values) => {
        login(values)
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
      validationSchema={loginSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Stack space={2} w="75%" maxW="300px" mx="auto">
            <FormControl isInvalid={errors.email ? true : false}>
              <FormControl.Label>Adresse email</FormControl.Label>
              <Input
                variant="underlined"
                type="email"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password ? true : false}>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                variant="underlined"
                type="password"
                placeholder="Mot de passe"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>

            <CustomButton type="submit" onPress={handleSubmit}>
              Connexion
            </CustomButton>
            <CustomButton onPress={() => navigation.navigate("Register")}>
              S'inscrire
            </CustomButton>
          </Stack>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
