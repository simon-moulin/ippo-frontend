import { useEffect, useState } from "react";
import { GetFeed } from "../services/ApiService";
import { ValidationDTO } from "../services/ApiModels";

import { Flex } from "@chakra-ui/react";

import { MenuBar } from "../component/MenuBar";
import { ValidationCard } from "../component/ValidationCard";

export function FeedPage() {
  const [feed, setFeed] = useState<ValidationDTO[]>([]);

  useEffect(() => {
    GetFeed().then((res) => {
      setFeed(res);
    });
  }, []);
  return (
    <>
      <MenuBar />
      <Flex minH="100vh" alignItems="center" flexDirection="column">
        {feed.map((el) => {
          return <ValidationCard el={el} key={el.id}></ValidationCard>;
        })}
      </Flex>
    </>
  );
}
