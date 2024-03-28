import {
  Button,
  Center,
  CircularProgress,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { AxiosError } from "axios";
import { SignUpApi } from "../services/ApiService";
import { ErrorResponse } from "../services/ApiModels";

type SignUpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SignUp({ isOpen, onClose }: SignUpProps) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    if (username.length < 5) {
      setErrorMessage("Username must be at least 5 character");
      setShowError(true);
    } else if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrorMessage("Email is not valid");
      setShowError(true);
    } else if (password.length < 8) {
      setErrorMessage("Password must be at least 8 character");
      setShowError(true);
    } else if (password != confirmPassword) {
      setErrorMessage("Passwords doesn't matches");
      setShowError(true);
    } else {
      setErrorMessage("");
      setShowError(false);
      setLoading(true);
      try {
        const signupResponse = await SignUpApi({
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        });
        localStorage.setItem("token", signupResponse.token);
        localStorage.setItem("user", JSON.stringify(signupResponse.data));
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
      <ModalContent mt="10%">
        <ModalHeader>SignUp</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Email"
            size="lg"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            marginBottom={5}
          />
          <Input
            placeholder="Username"
            size="lg"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            marginBottom={5}
          />
          <InputGroup size="lg" marginBottom={5}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup size="lg" marginBottom={5}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              placeholder="Confirm password"
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
              onClick={register}
            >
              {loading ? (
                <CircularProgress isIndeterminate size="30px" />
              ) : (
                "SignUp"
              )}
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
