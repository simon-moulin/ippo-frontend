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
  InputGroup,
  Input,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserDTO } from "../services/ApiModels";
import {
  DeleteFollowing,
  GetRequests,
  SearchUsers,
  SendFollowRequest,
} from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    setLoading(true);
    GetRequests().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  const searchUsers = async (name: string) => {
    setSearchTerm(name);
    setLoading(true);
    const newUsers = await SearchUsers(name);
    setUsers(newUsers);
    setLoading(false);
  };

  const unfollow = async (userId: number) => {
    await DeleteFollowing(userId);
    const newUsers = await SearchUsers(searchTerm);
    setUsers(newUsers);
  };

  const follow = async (userId: number) => {
    await SendFollowRequest(userId);
    const newUsers = await SearchUsers(searchTerm);
    setUsers(newUsers);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent mt="15%">
        <ModalHeader>Find users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup mb="10px">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => searchUsers(e.target.value)}
            />
            {/* You can customize the search button as needed */}
            <InputRightElement>
              <Button>
                <Icon as={FaSearch} color="gray.500" />
              </Button>
            </InputRightElement>
          </InputGroup>
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

                  {user.status == "requested" && (
                    <Button
                      colorScheme="telegram"
                      variant="outline"
                      size="sm"
                      onClick={() => unfollow(user.id)}
                    >
                      Cancel request
                    </Button>
                  )}
                  {user.status == "following" && (
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={() => unfollow(user.id)}
                    >
                      Unfollow
                    </Button>
                  )}
                  {user.status == "not_following" && (
                    <Button
                      colorScheme="telegram"
                      size="sm"
                      onClick={() => follow(user.id)}
                    >
                      Follow
                    </Button>
                  )}
                </Flex>
              );
            })
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
