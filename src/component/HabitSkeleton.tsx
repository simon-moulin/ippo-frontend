import {
  Divider,
  Text,
  Box,
  HStack,
  Tooltip,
  IconButton,
  SkeletonText,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa6";

export function HabitSkeleton() {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} position="relative">
      <SkeletonText noOfLines={1} skeletonHeight="4" width="50%"></SkeletonText>
      <Divider my={2} />
      <HStack justifyContent="space-between">
        <Text>
          <SkeletonText
            noOfLines={1}
            width="150px"
            skeletonHeight="3"
          ></SkeletonText>
        </Text>

        <Tooltip label="Supprimer" placement="top">
          <IconButton
            aria-label="Supprimer"
            icon={<FaTrash />}
            colorScheme="red"
            size="sm"
          />
        </Tooltip>
      </HStack>
    </Box>
  );
}
