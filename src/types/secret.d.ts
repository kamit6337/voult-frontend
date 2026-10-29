export type SECRET = {
  _id: string;
  userId: string;
  projectId: string | null;
  name: string;
  value: string;
  favourite: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CREATE_SECRET = {
  name: string;
  value: string;
  favourite: boolean;
  projectId: string | null;
};

export type UPDATE_SECRET = {
  _id: string;
  name: string;
  value: string;
  favourite: boolean;
  projectId: string | null;
};

export type UPDATE_SECRET_VARIABLE = {
  secret: SECRET;
  obj: UPDATE_SECRET;
};

export type UPDATE_SECRET_FAVOURITE = {
  _id: string;
  favourite: boolean;
};
