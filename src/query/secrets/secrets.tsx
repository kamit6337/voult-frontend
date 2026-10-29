import { getReq } from "@/config/api";
import type { CURSOR, CURSOR_RESPONSE } from "@/types/global";
import type { SECRET } from "@/types/secret";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const getSecretsByUserIdQuery = () =>
  infiniteQueryOptions({
    queryKey: ["user", "secrets", "none"],
    initialPageParam: null as CURSOR | null,
    queryFn: ({ pageParam }) => {
      return getReq<CURSOR_RESPONSE<SECRET>>("/secrets", { cursor: pageParam });
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    staleTime: Infinity,
  });

export type GetSecretsByUserIdQueryCache = {
  pages: CURSOR_RESPONSE<SECRET>[];
  pageParams: (null | CURSOR)[];
};

export const getSecretsByProjectId = (projectId: string | null) =>
  queryOptions({
    queryKey: ["user", "secrets", projectId],
    queryFn: () => getReq<SECRET[]>("/secrets/project", { id: projectId }),
    staleTime: Infinity,
    enabled: !!projectId,
  });
