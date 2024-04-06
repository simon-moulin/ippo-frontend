import { GetHabits, CreateHabit, DeleteHabit } from "../services/ApiService";
// import { ValidationDTO } from "../services/ApiModels";

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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HabitList } from "../component/HabitList";
import HabitCreateModal from "../component/HabitCreateModal";
import { CreateHabitDTO } from "../services/ApiModels";

export function HabitPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["habits"],
    queryFn: GetHabits,
  });

  const createHabitMutation = useMutation({
    mutationFn: CreateHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const deleteHabitMutation = useMutation({
    mutationFn: DeleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const handleCreateHabit = (newHabit: CreateHabitDTO) => {
    console.log(newHabit);
    createHabitMutation.mutate(newHabit);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" alignItems="center" flexDirection="column" pt="8">
      <Container maxW="container.md" mt={8}>
        <VStack spacing={8}>
          <HabitList
            habits={data}
            onDelete={(habitId: number) => deleteHabitMutation.mutate(habitId)}
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
