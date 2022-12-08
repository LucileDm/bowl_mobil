import { useContext, useEffect, useState } from "react";
import {
  Text,
  Box,
  Button,
  Center,
  StatusBar,
  HStack,
  VStack,
} from "native-base";
import { getUserProfile } from "../../services/users";
import { AuthContext } from "../../contexts/AuthContext";
import jwtDecode from "jwt-decode";

function AccountScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  console.log('hello', user, 'im here');
  useEffect(() => {
    getUserProfile(user.token)
      .then((res) => {
        console.log(res.data)
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <StatusBar bg={"#FFFFFF"} barStyle={"light-content"} />
      <Box justifyContent={"center"} safeAreaTop bg={"#FFFFFF"} />
      <HStack
        bg={"#FFFFFF"}
        px={"1"}
        py={"3"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        maxW={"100%"}
      >
        <HStack alignItems={"center"}>
          <Text color={"black"} fontSize={"20"} fontWeight={"bold"}>
            Gestion du compte
          </Text>
        </HStack>
      </HStack>
      <Center flex={1}>
        <VStack alignItems={"center"}>
          <Text>{user.firstName}</Text>
          <HStack marginBottom={"5"}>
            <Button>Modifier mon compte</Button>
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
