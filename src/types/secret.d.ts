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
