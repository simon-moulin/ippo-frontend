import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Box,
  Button,
  Text,
  Flex,
  ModalOverlay,
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDTO } from "../services/ApiModels";
import { AcceptFollowRequest, GetRequests } from "../services/ApiService";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RequestsModal({ isOpen, onClose }: ModalProps) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: GetRequests,
  });

  const mutation = useMutation({
    mutationFn: AcceptFollowRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent mt="15%">
        <ModalHeader>Follow requests</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <CircularProgress isIndeterminate size="30px" />
          ) : (
            data.map((user: UserDTO) => {
              return (
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mb="5px"
                  key={user.id}
                >
                  <Flex
                    alignItems="center"
                    onClick={() => {
                      navigate(`/profil/${user.id}`);
                    }}
                  >
                    <Image
                      borderRadius="full"
                      boxSize="40px"
                      mr="10px"
                      src={user.imageUrl}
                      alt={user.username}
                    />
                    <Box>
                      <Text key={user.id}>{user.username}</Text>
                    </Box>
                  </Flex>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      mutation.mutate(user.id);
                    }}
                  >
                    Accept
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
