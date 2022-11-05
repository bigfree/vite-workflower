import produce from "immer";
import create from "zustand";
import {persist} from "zustand/middleware";
import {appStorePersisConfig} from "../configs/persist.config";

export type AppStoreState = {
    edgeMode: boolean;
    openActions: boolean;
    toggleEdgeMode: () => void;
    toggleOpenActions?: () => void;
    setOpenActions: (isOpen: boolean) => void;
}

/**
 * App store
 */
const useAppStore = create<AppStoreState>()(persist((set, get) => ({
    edgeMode: false,
    openActions: false,
    toggleEdgeMode: () => {
        set(produce((draft: AppStoreState) => {
            draft.edgeMode = !get().edgeMode;
        }));
    },
    setOpenActions: (isOpen: boolean) => {
        set(produce((draft: AppStoreState) => {
            draft.openActions = isOpen;
        }))
    }
}), appStorePersisConfig));

export default useAppStore;