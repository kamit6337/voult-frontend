import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { SECRET } from "@/types/secret";

type InitialState = {
  deletedSecretIds: Set<string>;
  deletedProjectSecretIds: Set<string>;
  updatedSecrets: Map<string, SECRET>;
};

const initialState: InitialState = {
  deletedSecretIds: new Set(),
  deletedProjectSecretIds: new Set(),
  updatedSecrets: new Map(),
};

const secretSlice = createSlice({
  name: "secretSlice",
  initialState,
  reducers: {
    addToDeletedSecretIds: (state, { payload }: { payload: string[] }) => {
      const newSet = new Set([...state.deletedSecretIds, ...payload]);
      state.deletedSecretIds = newSet;
      return state;
    },
    addForSecretsProjectNull: (state, { payload }: { payload: string[] }) => {
      const newSet = new Set([...state.deletedProjectSecretIds, ...payload]);
      state.deletedProjectSecretIds = newSet;
      return state;
    },
    addToUpdatedSecrets: (state, { payload }: { payload: SECRET }) => {
      state.updatedSecrets.set(payload._id, payload);
      return state;
    },
  },
});

export const {
  addToDeletedSecretIds,
  addForSecretsProjectNull,
  addToUpdatedSecrets,
} = secretSlice.actions;

export const secretReducer = secretSlice.reducer;

export const secretInitialState = (state: RootState) => state.secret;
