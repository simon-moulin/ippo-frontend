import { GetFeed } from "../services/ApiService";
// import { ValidationDTO } from "../services/ApiModels";

import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { ValidationCard } from "../component/ValidationCard";

export function FeedPage() {
  const { data } = useQuery({
    queryKey: ["feed"],
    queryFn: GetFeed,
  });

  return (
    <>
      <Flex minH="100vh" alignItems="center" flexDirection="column">
        {data?.map((el) => {
          return <ValidationCard el={el} key={el.id}></ValidationCard>;
        })}
      </Flex>
    </>
  );
}
