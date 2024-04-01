import { Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MenuBar } from "../component/MenuBar";

export default function ProfilePage() {
  const params = useParams();
  return (
    <>
      <MenuBar />
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Text>Profile page {params.id}</Text>
      </Flex>
    </>
  );
}
