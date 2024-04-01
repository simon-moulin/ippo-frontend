import {
  Badge,
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
import { SearchModal } from "./SearchModal";

import { FaSearch, FaHome, FaSignOutAlt } from "react-icons/fa"; // Importation de l'icône de recherche
import { FaAddressBook, FaUser, FaRepeat } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { GetRequests } from "../services/ApiService";

export function MenuBar() {
  const navigation = useNavigate();
  const requestsDisclosure = useDisclosure();
  const searchDisclosure = useDisclosure();
  const [nbRequests, setNbRequests] = useState(0);
  const logout = () => {
    localStorage.removeItem("token");
    navigation("/");
  };

  const onCloseRequest = () => {
    GetRequests().then((res) => {
      setNbRequests(res.length);
    });
    requestsDisclosure.onClose();
  };

  useEffect(() => {
    GetRequests().then((res) => {
      setNbRequests(res.length);
    });
  }, []);

  return (
    <>
      <Card w="20%" h="90vh" position="fixed" m="3vh">
        <CardHeader>
          <Heading>Menu</Heading>
        </CardHeader>
        <CardBody>
          <Button
            leftIcon={<FaHome />}
            w="95%"
            variant="outline"
            mb="10px"
            onClick={() => {
              navigation("/feed");
            }}
          >
            Feed
          </Button>
          <Button w="95%" variant="outline" mb="10px" leftIcon={<FaRepeat />}>
            Habits
          </Button>
          <Button
            leftIcon={<FaSearch />}
            w="95%"
            variant="outline"
            mb="10px"
            onClick={() => {
              searchDisclosure.onOpen();
            }}
          >
            Search
          </Button>
          <Button
            leftIcon={<FaAddressBook />}
            rightIcon={
              nbRequests > 0 ? (
                <Badge backgroundColor="#ff5F5F" color="white" size="sm">
                  {nbRequests}
                </Badge>
              ) : (
                <></>
              )
            }
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
            leftIcon={<FaUser />}
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
          <Button
            w="95%"
            colorScheme="red"
            variant="solid"
            onClick={logout}
            leftIcon={<FaSignOutAlt />}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>

      <RequestsModal
        isOpen={requestsDisclosure.isOpen}
        onClose={onCloseRequest}
      ></RequestsModal>
      <SearchModal
        isOpen={searchDisclosure.isOpen}
        onClose={searchDisclosure.onClose}
      ></SearchModal>
    </>
  );
}
