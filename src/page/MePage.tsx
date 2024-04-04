import { useState } from "react";
import { GetMe, ManageSubPage, SubscribePage } from "../services/ApiService";
import {
  Card,
  Text,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Modal,
  useDisclosure,
  Badge,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import { FollowModal } from "../component/FollowModal";

import { useQuery } from "@tanstack/react-query";

export function MePage() {
  const [modalType, setModalType] = useState<"following" | "followers">(
    "following"
  );

  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: GetMe,
  });

  const modalDisclosure = useDisclosure();

  return (
    <>
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Card w="30%">
          <CardHeader>My infos</CardHeader>
          <CardBody>
            {isLoading ? (
              <CircularProgress isIndeterminate size="30px" />
            ) : (
              <>
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  mb="10px"
                  src={data?.imageUrl}
                  alt={data?.username}
                />
                <Text>
                  Username : {data?.username}{" "}
                  {data?.isPremium && (
                    <Badge colorScheme="green">Premium</Badge>
                  )}
                </Text>

                <Text>Habits : {data?.habitCount}</Text>
                <Text>Email : {data?.email}</Text>
                <Text
                  onClick={() => {
                    setModalType("followers");
                    modalDisclosure.onOpen();
                  }}
                >
                  Followers : {data?.followers?.length}
                </Text>
                <Text
                  onClick={() => {
                    setModalType("following");
                    modalDisclosure.onOpen();
                  }}
                >
                  Following : {data?.followings?.length}
                </Text>
                <Text>Created :</Text>
                {data?.isPremium && (
                  <Button
                    size="sm"
                    onClick={async () => {
                      window.open(await ManageSubPage());
                    }}
                  >
                    {" "}
                    Gérer mon abonnement
                  </Button>
                )}
                {!data?.isPremium && (
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={async () => {
                      window.open(await SubscribePage());
                    }}
                  >
                    M'abonner
                  </Button>
                )}
              </>
            )}
          </CardBody>
        </Card>
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
      </Flex>
    </>
  );
}
