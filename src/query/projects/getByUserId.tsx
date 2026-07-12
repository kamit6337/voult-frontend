import { getReq } from "@/config/api";
import type { PROJECT } from "@/types/project";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getProjectsByUserIdQuery = () =>
  queryOptions({
    queryKey: ["user", "projects"],
    queryFn: () => getReq<PROJECT[]>("/projects"),
    staleTime: Infinity,
  });

export const useGetProjectsByUserId = () => {
  const query = useQuery(getProjectsByUserIdQuery());
  return query;
};
