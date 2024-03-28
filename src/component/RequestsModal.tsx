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
import { useEffect, useState } from "react";
import { UserDTO } from "../services/ApiModels";
import { AcceptFollowRequest, GetRequests } from "../services/ApiService";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RequestsModal({ isOpen, onClose }: ModalProps) {
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    setLoading(true);
    GetRequests().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  const onAcceptFollow = async (userId: number) => {
    await AcceptFollowRequest(userId);
    setUsers(users.filter((el) => el.id != userId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent mt="15%">
        <ModalHeader>Follow requests</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <CircularProgress isIndeterminate size="30px" />
          ) : (
            users.map((user: UserDTO) => {
              return (
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mb="5px"
                  key={user.id}
                >
                  <Flex alignItems="center">
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
                      onAcceptFollow(user.id);
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
