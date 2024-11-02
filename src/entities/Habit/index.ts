import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateHabit, DeleteHabit, GetHabits } from "../../services/ApiService";

export const useHabit = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
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

  return {
    data,
    isLoading,
    createHabit: createHabitMutation.mutate,
    deleteHabit: deleteHabitMutation.mutate,
  };
};
