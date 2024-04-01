import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Image,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import JapaneseBackground from "../assets/japanese_background.png";
import MockupHabits from "../assets/ippo_mockup_habits.png";
import MockupFriends from "../assets/ippo_mockup_friends.png";

import { Login } from "../component/Login";
import { SignUp } from "../component/SignUp";
import { useEffect } from "react";

export function HomePage() {
  const nagivate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      nagivate("/feed");
    }
  });

  const loginDisclosure = useDisclosure();
  const signupDisclosure = useDisclosure();

  return (
    <>
      <Flex
        minH="100vh"
        flexDirection={{ base: "column", md: "row" }}
        overflowY={{ base: "scroll", md: "hidden" }}
      >
        {/* Partie gauche avec section de texte centrée */}
        <Text
          fontSize="3xl"
          fontWeight="bold"
          position="absolute"
          top="4"
          left="4"
        >
          Ippo
        </Text>
        <Box flex="1" bgColor="white" p="4">
          <Flex h="100%" alignItems="center" justifyContent="center">
            <Box textAlign="center">
              <Heading as="h1" fontSize="5xl">
                一日一歩 <br />
                One day <br />
                One step
              </Heading>
              <Text fontSize="3xl">
                Unlock your potential <br />
                together through daily habits, <br />
                inspired by 一日一歩.
              </Text>
              <Button onClick={loginDisclosure.onOpen} m="24px">
                Login
              </Button>
              <Button onClick={signupDisclosure.onOpen}>SignUp</Button>
              <Modal
                isOpen={loginDisclosure.isOpen}
                onClose={loginDisclosure.onClose}
                size="lg"
              >
                <Login
                  isOpen={loginDisclosure.isOpen}
                  onClose={loginDisclosure.onClose}
                ></Login>
              </Modal>
              <Modal
                isOpen={signupDisclosure.isOpen}
                onClose={signupDisclosure.onClose}
                size="lg"
              >
                <SignUp
                  isOpen={signupDisclosure.isOpen}
                  onClose={signupDisclosure.onClose}
                ></SignUp>
              </Modal>
            </Box>
          </Flex>
        </Box>

        {/* Partie droite avec image en arrière-plan */}
        <Box
          flex="1"
          backgroundImage={JapaneseBackground}
          backgroundSize="cover"
        >
          <Flex
            h="100%"
            alignItems="center"
            justifyContent="flex-start"
            marginLeft="-100px"
          >
            <Box textAlign="center">
              {/* Première image centrée verticalement à gauche */}
              <Image src={MockupHabits} alt="Image 1" height="80vh" mr="2" />
            </Box>
            <Box marginLeft="7%">
              {/* Deuxième image centrée verticalement à gauche */}
              <Image src={MockupFriends} alt="Image 2" height="80vh" />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
