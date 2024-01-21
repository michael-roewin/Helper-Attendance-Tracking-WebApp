import { User } from "./user";

export interface AppState {
  user?: User | undefined;
  userLoaded?: boolean;
  notification?: {
    message: string;
    description: string;
    duration: number;
    icon:  React.ReactNode
  } | undefined;
}