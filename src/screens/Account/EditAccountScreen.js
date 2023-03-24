import { useContext, useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Text,
  Box,
  Input,
  Stack,
  Spinner,
  FormControl,
  WarningOutlineIcon,
  Button,
  Pressable,
} from "native-base";
import { theme } from "../../utils/theme.js";
import * as yup from "yup";
import { Formik } from "formik";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserProfile, editUserProfile } from "../../services/users";
import { useNavigation } from "@react-navigation/core";
import { CustomButton } from "../../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const editSchema = yup.object({
  email: yup.string().email("La saisie est invalide"),
  password: yup.string(),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    ),
});

function EditScreen({ route }) {
  const { userID } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const [securePass, setSecurePass] = useState(true);
  const handleClick = () => setSecurePass(!securePass);
  useEffect(() => {
    getUserProfile(user.data.token)
      .then((res) => {
        setUserInfo(res.data);
        console.log(userInfo.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return !userInfo ? (
    <Spinner />
  ) : (
    <Formik
      initialValues={{
        email: `${userInfo.email}`,
        password: "",
        passwordConfirm: "",
      }}
      onSubmit={(values) => {
        delete values.passwordConfirm;
      }}
      validationSchema={editSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <Box flex={1} justifyContent="center">
          <Stack space={2} w="75%" maxW="300px" mx="auto">
            <FormControl isInvalid={errors.email ? true : false}>
              <Input
                variant="underlined"
                type="email"
                placeholder="jbon@herta.fr"
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
              <Input
                variant="underlined"
                type={!securePass ? "text" : "password"}
                placeholder="Test123!"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                InputRightElement={
                  <Ionicons
                    size="20"
                    onPress={handleClick}
                    name={securePass ? "eye" : "eye-off"}
                  />
                }
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.passwordConfirm ? true : false}>
              <Input
                variant="underlined"
                type="password"
                placeholder="Test123!"
                onChangeText={handleChange("passwordConfirm")}
                onBlur={handleBlur("passwordConfirm")}
                value={values.passwordConfirm}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.passwordConfirm}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button onPress={handleSubmit}>Enregistrer</Button>
          </Stack>
        </Box>
      )}
    </Formik>
  );
}

export default EditScreen;
