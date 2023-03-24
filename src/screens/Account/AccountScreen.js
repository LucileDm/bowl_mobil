import { useContext, useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  Center,
  StatusBar,
  HStack,
  VStack,
  Spinner,
} from "native-base";
import { getUserProfile } from "../../services/users";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

function AccountScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    getUserProfile(user.data.token)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navToEditForm = (_id) => {
    navigation.navigate("Modifier mon compte", { userID: userInfo._id });
  };

  return !userInfo ? (
    <Spinner />
  ) : (
    <>
      <StatusBar bg={"#FFFFFF"} barStyle={"light-content"} />
      <VStack alignItems={"center"}>
        <Text fontSize={"2xl"}>{userInfo.firstName}</Text>
      </VStack>
      <Center flex={1}>
        <VStack alignItems={"center"}>
          <HStack marginBottom={"5"}>
            <Button onPress={() => navToEditForm(userInfo._id)}>
              Modifier mon compte
            </Button>
          </HStack>
          <HStack>
            <Button onPress={() => setUser(null)}>Déconnexion</Button>
          </HStack>
        </VStack>
      </Center>
    </>
  );
}

export default AccountScreen;
