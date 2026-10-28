import { getReq } from "@/config/api";
import type { SECRET } from "@/types/secret";
import { queryOptions } from "@tanstack/react-query";

export const getSecretsByUserIdQuery = () =>
  queryOptions({
    queryKey: ["user", "secrets", "none"],
    queryFn: () => getReq<SECRET[]>("/secrets"),
    staleTime: Infinity,
  });

export const getSecretsByProjectId = (projectId: string | null) =>
  queryOptions({
    queryKey: ["user", "secrets", projectId],
    queryFn: () => getReq<SECRET[]>("/secrets/project", { id: projectId }),
    staleTime: Infinity,
    enabled: !!projectId,
  });
