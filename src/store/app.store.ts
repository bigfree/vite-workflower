import produce from "immer";
import create from "zustand";
import {persist} from "zustand/middleware";
import {appStorePersisConfig} from "../configs/persist.config";

export type AppStoreState = {
    edgeMode: boolean;
    toggleEdgeMode: () => void;
}

const useAppStore = create<AppStoreState>()(persist((set, get) => ({
    edgeMode: false,
    toggleEdgeMode: () => {
        set(produce((draft: AppStoreState) => {
            draft.edgeMode = !get().edgeMode;
        }));
    }
}), appStorePersisConfig));

export default useAppStore;