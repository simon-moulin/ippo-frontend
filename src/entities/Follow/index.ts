import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteFollower,
  DeleteFollowing,
  GetFollowers,
  GetFollowings,
} from "../../services/ApiService";

export const useFollow = (type: "followers" | "following") => {
  const queryClient = useQueryClient();

  const followers = useQuery({
    queryKey: ["followers"],
    queryFn: GetFollowers,
  });

  const following = useQuery({
    queryKey: ["followings"],
    queryFn: GetFollowings,
  });

  const followersMutation = useMutation({
    mutationFn: DeleteFollower,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const followingsMutation = useMutation({
    mutationFn: DeleteFollowing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followings"] });

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return {
    isLoading: type === "followers" ? followers.isLoading : following.isLoading,
    data: type === "followers" ? followers.data : following.data,
    mutation:
      type === "followers"
        ? followersMutation.mutate
        : followingsMutation.mutate,
  };
};
