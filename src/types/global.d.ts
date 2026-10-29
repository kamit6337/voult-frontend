export type CURSOR_RESPONSE<T> = {
  data: T[];
  nextCursor: CURSOR | null;
  hasNextPage: boolean;
};

type CURSOR = {
  _id: string;
  createdAt: string;
};
