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
import {
  DeleteFollower,
  DeleteFollowing,
  GetFollowers,
  GetFollowings,
} from "../services/ApiService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDTO } from "../services/ApiModels";
import { useNavigate } from "react-router-dom";

type FollowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "followers" | "following";
};

export function FollowModal({ isOpen, onClose, type }: FollowModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const followersQuery = useQuery({
    queryKey: ["followers"],
    queryFn: GetFollowers,
  });

  const followingQuery = useQuery({
    queryKey: ["followings"],
    queryFn: GetFollowings,
  });

  const followersMutation = useMutation({
    mutationFn: DeleteFollower,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const followingsMutation = useMutation({
    mutationFn: DeleteFollowing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followings"] });

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const onButtonClick = async (userId: number) => {
    if (type == "followers") {
      followersMutation.mutate(userId);
    }
    if (type == "following") {
      followingsMutation.mutate(userId);
    }
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
          {(
            type == "followers"
              ? followersQuery.isLoading
              : followingQuery.isLoading
          ) ? (
            <CircularProgress isIndeterminate size="30px" />
          ) : (
            (type == "followers"
              ? followersQuery.data
              : followingQuery.data
            )?.map((user: UserDTO) => {
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
