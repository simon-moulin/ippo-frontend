import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Button,
  Box,
  Text,
  Flex,
  ModalOverlay,
  CircularProgress,
  Avatar,
} from "@chakra-ui/react";

import { UserDTO } from "../services/ApiModels";
import { useNavigate } from "react-router-dom";
import { useFollow } from "../entities/Follow";

type FollowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "followers" | "following";
};

export function FollowModal({ isOpen, onClose, type }: FollowModalProps) {
  const navigate = useNavigate();

  const { data, isLoading, mutation } = useFollow(type);

  const onButtonClick = async (userId: number) => {
    mutation(userId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent mt="15%">
        <ModalHeader>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <CircularProgress isIndeterminate size="30px" />
          ) : (
            data?.map((user: UserDTO) => {
              return (
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mb="5px"
                  key={user.id}
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb="5px"
                    key={user.id}
                    cursor="pointer"
                    onClick={() => {
                      navigate(`/profil/${user.id}`);
                    }}
                  >
                    <Avatar
                      borderRadius="full"
                      boxSize="40px"
                      mr="10px"
                      name={user.username}
                      src={user.imageUrl}
                    />
                    <Box>
                      <Text key={user.id} fontWeight="medium">
                        {user.username}
                      </Text>
                    </Box>
                  </Flex>
                  <Button
                    size="sm"
                    color="red"
                    outline="true"
                    onClick={() => {
                      onButtonClick(user.id);
                    }}
                  >
                    {type === "followers" ? "Delete" : "Unfollow"}
                  </Button>
                </Flex>
              );
            })
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
