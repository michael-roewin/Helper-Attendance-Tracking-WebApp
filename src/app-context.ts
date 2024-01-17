import { createContext } from "react";
import { AppState } from "./interfaces/app-state";

export const AppContext = createContext<{ appState: AppState | undefined, setAppState: React.Dispatch<React.SetStateAction<AppState>> } | undefined>(undefined);