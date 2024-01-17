import { User } from "./user";

export interface AppState {
  user?: User | undefined;
  userLoaded?: boolean;
}