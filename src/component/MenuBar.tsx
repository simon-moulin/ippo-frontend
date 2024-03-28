import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import { RequestsModal } from "./RequestsModal";

import { useNavigate } from "react-router-dom";

export function MenuBar() {
  const navigation = useNavigate();
  const requestsDisclosure = useDisclosure();
  const logout = () => {
    localStorage.removeItem("token");
    navigation("/");
  };

  return (
    <>
      <Card w="20%" h="90vh" position="fixed" m="3vh">
        <CardHeader>
          <Heading>Menu</Heading>
        </CardHeader>
        <CardBody>
          <Button
            w="95%"
            variant="outline"
            mb="10px"
            onClick={() => {
              navigation("/feed");
            }}
          >
            Feed
          </Button>
          <Button w="95%" variant="outline" mb="10px">
            Habits
          </Button>
          <Button
            w="95%"
            variant="outline"
            mb="10px"
            onClick={() => {
              requestsDisclosure.onOpen();
            }}
          >
            Request
          </Button>
          <Button
            w="95%"
            variant="outline"
            mb="10px"
            onClick={() => {
              navigation("/me");
            }}
          >
            My account
          </Button>
        </CardBody>
        <CardFooter>
          <Button w="95%" colorScheme="red" variant="solid" onClick={logout}>
            Logout
          </Button>
        </CardFooter>
      </Card>

      <RequestsModal
        isOpen={requestsDisclosure.isOpen}
        onClose={requestsDisclosure.onClose}
      ></RequestsModal>
    </>
  );
}
