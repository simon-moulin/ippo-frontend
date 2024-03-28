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
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserDTO } from "../services/ApiModels";
import {
  DeleteFollower,
  DeleteFollowing,
  GetFollowers,
  GetFollowings,
} from "../services/ApiService";

type LoginProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "followers" | "following";
};

export function FollowModal({ isOpen, onClose, type }: LoginProps) {
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    setLoading(true);
    if (type == "followers") {
      GetFollowers().then((res) => {
        setUsers(res);
        setLoading(false);
      });
    } else {
      GetFollowings().then((res) => {
        setUsers(res);
        setLoading(false);
      });
    }
  }, []);

  const onButtonClick = async (userId: number) => {
    if (type == "followers") {
      await DeleteFollower(userId);
    }
    if (type == "following") {
      await DeleteFollowing(userId);
    }

    setUsers(users.filter((el) => el.id != userId));
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
                  <Flex mb="5px" key={user.id}>
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
