export type SECRET = {
  _id: string;
  userId: string;
  projectId?: string;
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
  projectId?: string;
};

export type UPDATE_SECRET = {
  _id: string;
  name: string;
  value: string;
  favourite: boolean;
};

export type UPDATE_SECRET_FAVOURITE = {
  _id: string;
  favourite: boolean;
};

export type DELETE_SECRET = {
  _id: string;
};
