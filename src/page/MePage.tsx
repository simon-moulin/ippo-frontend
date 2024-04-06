import { useState } from "react";
import { GetMe, ManageSubPage, SubscribePage } from "../services/ApiService";
import {
  Text,
  Modal,
  useDisclosure,
  Badge,
  Container,
  VStack,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { FollowModal } from "../component/FollowModal";

import { useQuery } from "@tanstack/react-query";

export function MePage() {
  const [modalType, setModalType] = useState<"following" | "followers">(
    "following"
  );

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: GetMe,
  });

  const modalDisclosure = useDisclosure();

  return (
    <>
      <Container maxW="container.md">
        <VStack spacing={8}>
          <Avatar size="2xl" name={data?.username} src={data?.imageUrl} />
          <Text fontSize="2xl" fontWeight="bold">
            {data?.username}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {data?.email}
          </Text>
          <Stack direction="row" spacing={4}>
            {data?.isPremium && <Badge colorScheme="green">Premium</Badge>}
            <Text fontWeight="semibold">{data?.habitCount} Habitudes</Text>
            <Text
              fontWeight="semibold"
              cursor="pointer"
              onClick={() => {
                setModalType("followers");
                modalDisclosure.onOpen();
              }}
            >
              {data?.numberOfFollowers} Followers
            </Text>
            <Text
              fontWeight="semibold"
              cursor="pointer"
              onClick={() => {
                setModalType("following");
                modalDisclosure.onOpen();
              }}
            >
              {data?.numberOfFollowings} Suivi(e)s{" "}
            </Text>
          </Stack>
        </VStack>
      </Container>

      <Modal
        isOpen={modalDisclosure.isOpen}
        onClose={modalDisclosure.onClose}
        size="lg"
      >
        <FollowModal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
          type={modalType}
        ></FollowModal>
      </Modal>
    </>
  );
}
