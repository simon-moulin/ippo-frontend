import {
  Badge,
  Box,
  Divider,
  VStack,
  Text,
  IconButton,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { HabitDTO } from "../services/ApiModels";
import { FaTrash } from "react-icons/fa6";
import { HabitSkeleton } from "./HabitSkeleton";

type HabitListProps = {
  habits: HabitDTO[] | undefined;
  onDelete: (id: number) => void;
};

export function HabitList({ habits, onDelete }: HabitListProps) {
  const mapFrequency = (frequency: "WEEKLY" | "DAILY" | "MONTHLY") => {
    switch (frequency) {
      case "DAILY":
        return "jour";
      case "WEEKLY":
        return "semaine";
      case "MONTHLY":
        return "mois";
      default:
        return "";
    }
  };
  return (
    <VStack align="stretch" spacing={4} width="50%">
      {!habits && (
        <>
          <HabitSkeleton />
          <HabitSkeleton />
          <HabitSkeleton />
        </>
      )}
      {habits?.map((habit) => (
        <Box
          key={habit.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          position="relative"
        >
          <Text fontSize="xl">{habit.name}</Text>
          <Divider my={2} />
          <HStack justifyContent="space-between">
            <Text>
              <Badge colorScheme="green" mr={2}>
                {habit.frequency}
              </Badge>
              {habit.occurency} fois par {mapFrequency(habit.frequency)}
            </Text>

            <Tooltip label="Supprimer" placement="top">
              <IconButton
                aria-label="Supprimer"
                icon={<FaTrash />}
                colorScheme="red"
                size="sm"
                onClick={() => onDelete(habit.id)}
              />
            </Tooltip>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
