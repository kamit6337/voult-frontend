import { getReq } from "@/config/api";
import type { USER } from "@/types/user";
import { queryOptions } from "@tanstack/react-query";

export const getUserMeQuery = (enabled = false) =>
  queryOptions({
    queryKey: ["user", "me"],
    queryFn: () => getReq<USER>("/users/me"),
    staleTime: Infinity,
    enabled,
    retry: false,
  });
