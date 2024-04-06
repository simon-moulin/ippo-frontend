import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Checkbox,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { CategoryDTO, CreateHabitDTO } from "../services/ApiModels";
import { GetHabitCategories } from "../services/ApiService";

type HabitCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (prop: CreateHabitDTO) => void;
};
const HabitCreateModal = ({
  isOpen,
  onClose,
  onCreate,
}: HabitCreateModalProps) => {
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("DAILY");
  const [habitOccurrence, setHabitOccurrence] = useState(1);
  const [habitVisibility, setHabitVisibility] = useState(false);
  const [habitCategory, setHabitCategory] = useState("Sport");

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: GetHabitCategories,
  });

  const handleCreate = () => {
    onCreate({
      name: habitName,
      frequency: habitFrequency,
      occurency: habitOccurrence,
      categoryName: habitCategory,
      visibility: habitVisibility,
    });
    setHabitName("");
    setHabitFrequency("DAILY");
    setHabitOccurrence(1);
    setHabitVisibility(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Créer un nouvel habit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Nom de l'habit</FormLabel>
              <Input
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fréquence</FormLabel>
              <Select
                value={habitFrequency}
                onChange={(e) => setHabitFrequency(e.target.value)}
              >
                <option value="DAILY">Quotidiennement</option>
                <option value="WEEKLY">Hebdomadairement</option>
                <option value="MONTHLY">Mensuellement</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Occurrence</FormLabel>
              <Input
                type="number"
                min={1}
                value={habitOccurrence}
                onChange={(e) => setHabitOccurrence(parseInt(e.target.value))}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Catégorie</FormLabel>
              <Select
                value={habitCategory}
                onChange={(e) => setHabitCategory(e.target.value)}
              >
                {data?.map((category: CategoryDTO) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Visibilité</FormLabel>
              <Checkbox
                isChecked={habitVisibility}
                onChange={(e) => setHabitVisibility(e.target.checked)}
              >
                Public
              </Checkbox>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Créer
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HabitCreateModal;
