import { Flex } from "@chakra-ui/react";

import { ValidationCard } from "../component/ValidationCard";
import { SkeletonCard } from "../component/SkeletonCard";
import { useFeed } from "../entities/Feed";

export function FeedPage() {
  const { data, isLoading } = useFeed();

  return (
    <>
      <Flex minH="100vh" alignItems="center" flexDirection="column">
        {!isLoading &&
          data?.map((el) => {
            return <ValidationCard el={el} key={el.id}></ValidationCard>;
          })}
        {isLoading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </Flex>
    </>
  );
}
