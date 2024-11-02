import { useQuery } from "@tanstack/react-query";
import { GetFeed } from "../../services/ApiService";

export const useFeed = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: GetFeed,
  });

  return { data, isLoading };
};
