import { getReq } from "@/config/api";
import type { SECRET } from "@/types/secret";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getSecretsByUserIdQuery = () =>
  queryOptions({
    queryKey: ["user", "secrets"],
    queryFn: () => getReq<SECRET[]>("/secrets"),
    staleTime: Infinity,
  });

export const useGetSecretsByUserId = () => {
  const query = useQuery(getSecretsByUserIdQuery());

  return query;
};
