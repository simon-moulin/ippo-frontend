import { useState, useEffect } from "react";
import {
  Container,
  VStack,
  Text,
  Avatar,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GetUserProfil } from "../services/ApiService";
import { AccountDTO } from "../services/ApiModels";

const ProfilePage = () => {
  const { id } = useParams();
  const [data, setUserProfile] = useState<AccountDTO>();

  useEffect(() => {
    GetUserProfil(parseInt(id!)).then((data) => {
      setUserProfile(data);
    });
  }, [id]);

  if (!data) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Container maxW="container.md">
        <VStack spacing={8}>
          <Avatar size="2xl" name={data?.username} src={data?.imageUrl} />
          <Text fontSize="2xl">
            {data?.username}
            {data?.isPremium && (
              <Badge ml={2} colorScheme="green" height="20px">
                Premium
              </Badge>
            )}
          </Text>

          <Text fontSize="lg" color="gray.500">
            {data?.email}
          </Text>
          <Stack direction="row" spacing={4}>
            <Text fontWeight="semibold">{data?.habitCount} Habitudes</Text>
            <Text fontWeight="semibold">
              {data?.numberOfFollowers} Followers
            </Text>
            <Text fontWeight="semibold">
              {data?.numberOfFollowings} Suivi(e)s{" "}
            </Text>
          </Stack>
        </VStack>
      </Container>
    </>
  );
};

export default ProfilePage;
