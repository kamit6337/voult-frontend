export type PROJECT = {
  _id: string;
  name: string;
  favourite: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CREATE_PROJECT = {
  name: string;
  favourite: boolean;
};

export type UPDATE_PROJECT = {
  _id: string;
  name: string;
  favourite: boolean;
};

export type UPDATE_PROJECT_FAVOURITE = {
  _id: string;
  favourite: boolean;
};

export type DELETE_PROJECT = {
  _id: string;
};
