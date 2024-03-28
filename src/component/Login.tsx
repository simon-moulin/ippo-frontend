import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  Text,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  CircularProgress,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { AxiosError } from "axios";
import { LoginApi } from "../services/ApiService";
import { ErrorResponse } from "../services/ApiModels";

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Login({ isOpen, onClose }: LoginProps) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (username.length < 5) {
      setErrorMessage("Username must be at least 5 character");
      setShowError(true);
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 character");
      setShowError(true);
    } else {
      setErrorMessage("");
      setShowError(false);
      setLoading(true);
      try {
        const loginResponse = await LoginApi({
          username: username,
          password: password,
        });
        localStorage.setItem("token", loginResponse.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.data));
        navigate("/feed");
      } catch (e) {
        setErrorMessage(
          ((e as AxiosError).response?.data as ErrorResponse)?.message
        );
        setShowError(true);
      }

      setLoading(false);
    }
  };

  const handleClick = () => setShow(!show);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent mt="15%">
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Username"
            size="lg"
            marginBottom={5}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <InputGroup size="lg">
            <Input
              isRequired
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {showError && <Text color="red"> {errorMessage} </Text>}
        </ModalBody>

        <ModalFooter>
          <Center w="100%">
            <Button
              colorScheme="gray"
              size="lg"
              variant="solid"
              onClick={login}
            >
              {loading ? (
                <CircularProgress isIndeterminate size="30px" />
              ) : (
                "Login"
              )}
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
