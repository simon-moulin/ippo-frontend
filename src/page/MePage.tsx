import { useEffect, useState } from "react";
import { AccountDTO } from "../services/ApiModels";
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
} from "@chakra-ui/react";
import { MenuBar } from "../component/MenuBar";
import { FollowModal } from "../component/FollowModal";

export function MePage() {
  const [user, setUser] = useState<AccountDTO>();
  const [modalType, setModalType] = useState<"following" | "followers">(
    "following"
  );

  const modalDisclosure = useDisclosure();
  useEffect(() => {
    GetMe().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <>
      <MenuBar />
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Card w="30%">
          <CardHeader>My infos</CardHeader>
          <CardBody>
            <Image
              borderRadius="full"
              boxSize="40px"
              mb="10px"
              src={user?.imageUrl}
              alt={user?.username}
            />
            <Text>
              Username : {user?.username}{" "}
              {user?.isPremium && <Badge colorScheme="green">Premium</Badge>}
            </Text>

            <Text>Habits : {user?.habitCount}</Text>
            <Text>Email : {user?.email}</Text>
            <Text
              onClick={() => {
                setModalType("followers");
                modalDisclosure.onOpen();
              }}
            >
              Followers : {user?.followers?.length}
            </Text>
            <Text
              onClick={() => {
                setModalType("following");
                modalDisclosure.onOpen();
              }}
            >
              Following : {user?.followings?.length}
            </Text>
            <Text>Created :</Text>
            {user?.isPremium && (
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
            {!user?.isPremium && (
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
