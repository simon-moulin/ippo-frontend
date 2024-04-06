import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

export function SkeletonCard() {
  return (
    <Card w="50%" m="3vh">
      <CardHeader>
        <Heading size="md">
          <Flex>
            <SkeletonCircle size="10" />
            <Box fontSize="md">
              <SkeletonText
                width="100px"
                ml={3}
                mt={2}
                noOfLines={1}
                spacing="2"
                skeletonHeight="2"
              />{" "}
              <SkeletonText
                width="100px"
                ml={3}
                mt={2}
                noOfLines={1}
                spacing="2"
                skeletonHeight="1"
              />
            </Box>
          </Flex>
        </Heading>
      </CardHeader>
      <CardBody>
        <SkeletonText noOfLines={2} spacing="4" skeletonHeight="2" />
      </CardBody>
      <CardFooter>
        <SkeletonText
          width="20px"
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
        />
      </CardFooter>
    </Card>
  );
}
