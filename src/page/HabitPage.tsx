import { FaPlus } from "react-icons/fa";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HabitList } from "../component/HabitList";
import HabitCreateModal from "../component/HabitCreateModal";
import { CreateHabitDTO } from "../services/ApiModels";
import { useHabit } from "../entities/Habit";

export function HabitPage() {
  const { data, createHabit, deleteHabit } = useHabit();

  const handleCreateHabit = (newHabit: CreateHabitDTO) => {
    createHabit(newHabit);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" alignItems="center" flexDirection="column" pt="8">
      <Container maxW="container.md" mt={8}>
        <VStack spacing={8}>
          <HabitList
            habits={data}
            onDelete={(habitId: number) => deleteHabit(habitId)}
          />
          <Box position="fixed" bottom="4" right="4">
            <Tooltip label="Ajouter un nouvel habit" placement="top">
              <IconButton
                aria-label="Ajouter un nouvel habit"
                icon={<FaPlus />}
                size="lg"
                onClick={onOpen}
              />
            </Tooltip>
          </Box>
        </VStack>
        <HabitCreateModal
          isOpen={isOpen}
          onClose={onClose}
          onCreate={handleCreateHabit}
        />
      </Container>
    </Flex>
  );
}
